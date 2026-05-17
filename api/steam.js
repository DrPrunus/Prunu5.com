// Vercel Serverless Function - Steam API Proxy
export default async function handler(req, res) {
  const apiKey = process.env.STEAM_API_KEY;
  const vanityId = "prunu5h3ad";

  if (!apiKey) {
    return res.status(500).json({ error: "STEAM_API_KEY not configured" });
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

    // 2. Get Player Summary
    const summaryRes = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`
    );
    const summaryData = await summaryRes.json();
    const player = summaryData.response?.players?.[0];

    // 3. Get Steam Level
    let level = "??";
    try {
      const levelRes = await fetch(
        `https://api.steampowered.com/IPlayerService/GetSteamLevel/v0001/?key=${apiKey}&steamid=${steamId}`
      );
      const levelData = await levelRes.json();
      level = String(levelData.response?.player_level ?? "??");
    } catch (e) {
      console.error("Level Fetch Error:", e);
    }

    // 4. Get Owned Games
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

    return res.status(200).json({ games, stats });

  } catch (error) {
    console.error("Steam API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
