// Vercel Serverless Function - Steam API Proxy
// 简单的内存缓存，减少 API 调用
let cache = null;
let cacheTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15分钟缓存

export default async function handler(req, res) {
  const apiKey = process.env.STEAM_API_KEY;
  const vanityId = "prunu5h3ad";

  // 返回 JSON，启用缓存头
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=900'); // 15分钟

  if (!apiKey) {
    return res.status(500).json({ error: "STEAM_API_KEY not configured" });
  }

  // 检查缓存
  if (cache && (Date.now() - cacheTime < CACHE_DURATION)) {
    return res.status(200).json(cache);
  }

  try {
    // 1. Resolve Vanity URL
    const resolveRes = await fetch(
      `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${apiKey}&vanityurl=${vanityId}`
    );
    const resolveData = await resolveRes.json();
    const steamId = resolveData.response?.steamid;

    if (!steamId) {
      return res.status(404).json({ error: "Could not resolve SteamID" });
    }

    // 2. Get Player Summary + Steam Level 并行请求
    const [summaryRes, levelRes] = await Promise.all([
      fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`),
      fetch(`https://api.steampowered.com/IPlayerService/GetSteamLevel/v0001/?key=${apiKey}&steamid=${steamId}`)
    ]);

    const summaryData = await summaryRes.json();
    const levelData = await levelRes.json();
    const player = summaryData.response?.players?.[0];
    const level = String(levelData.response?.player_level ?? "??");

    // 3. Get Owned Games
    const gamesRes = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=1&include_played_free_games=1`
    );
    const gamesData = await gamesRes.json();

    const stats = {
      avatar: player?.avatarfull || null,
      level: level,
      status: player?.personastate === 1 ? "ONLINE" : "OFFLINE"
    };

    const games = (gamesData.response?.games || []).map((g) => ({
      name: g.name,
      appid: String(g.appid),
      image: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${g.appid}/header.jpg`,
      hours: (g.playtime_forever / 60).toFixed(1),
      categories: []
    }));

    const result = { games, stats };
    
    // 更新缓存
    cache = result;
    cacheTime = Date.now();

    return res.status(200).json(result);

  } catch (error) {
    console.error("Steam API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
