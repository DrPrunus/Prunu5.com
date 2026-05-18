// Vercel Serverless Function - Steam API Proxy
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

// 简单的内存缓存
let cache = null;
let cacheTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15分钟缓存

export default async function handler(req, res) {
  const apiKey = process.env.STEAM_API_KEY;
  const vanityId = "prunu5h3ad";

  // 设置 CORS 和 JSON 响应
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=900');

  // 检查缓存
  if (cache && (Date.now() - cacheTime < CACHE_DURATION)) {
    return res.status(200).json(cache);
  }

  try {
    if (apiKey && apiKey.trim() !== "") {
      // --- METHOD A: Official Steam Web API ---
      console.log("Using Steam Web API...");
      
      const resolveRes = await axios.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/`, {
        params: { key: apiKey, vanityurl: vanityId }
      });
      
      const steamId = resolveRes.data.response.steamid;
      if (!steamId) {
        return res.status(404).json({ error: "Could not resolve SteamID" });
      }

      const [summaryRes, levelRes, gamesRes] = await Promise.all([
        axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/`, {
          params: { key: apiKey, steamids: steamId }
        }),
        axios.get(`https://api.steampowered.com/IPlayerService/GetSteamLevel/v0001/`, {
          params: { key: apiKey, steamid: steamId }
        }).catch(() => ({ data: { response: { player_level: "??" } } })),
        axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/`, {
          params: {
            key: apiKey,
            steamid: steamId,
            format: 'json',
            include_appinfo: 1,
            include_played_free_games: 1
          }
        })
      ]);

      const player = summaryRes.data.response.players[0];
      const stats = {
        avatar: player?.avatarfull || null,
        level: String(levelRes.data.response.player_level),
        status: player?.personastate === 1 ? "ONLINE" : "OFFLINE"
      };

      const games = (gamesRes.data.response.games || []).map((g) => ({
        name: g.name,
        appid: String(g.appid),
        image: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${g.appid}/header.jpg`,
        hours: (g.playtime_forever / 60).toFixed(1),
        categories: []
      }));

      const result = { games, stats };
      cache = result;
      cacheTime = Date.now();
      return res.status(200).json(result);

    } else {
      // --- METHOD B: XML Fallback ---
      console.log("No API Key, falling back to XML...");
      const gamesUrl = `https://steamcommunity.com/id/${vanityId}/games?tab=all&xml=1`;
      const profileUrl = `https://steamcommunity.com/id/${vanityId}/?xml=1`;
      
      const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' };
      
      const [gamesRes, profileRes] = await Promise.all([
        axios.get(gamesUrl, { headers }),
        axios.get(profileUrl, { headers })
      ]);

      if (typeof gamesRes.data !== 'string' || !gamesRes.data.includes('<?xml')) {
        return res.status(200).json({ 
          error: "Steam library is private. Please provide a STEAM_API_KEY.", 
          games: [], 
          stats: { avatar: null, level: "??", status: "PRIVATE" } 
        });
      }
      
      const gamesXml = gamesRes.data.replace(/&(?!(?:amp|lt|gt|quot|apos);)/g, '&amp;');
      const profileXml = profileRes.data.replace(/&(?!(?:amp|lt|gt|quot|apos);)/g, '&amp;');
      
      const [gamesResult, profileResult] = await Promise.all([
        parseStringPromise(gamesXml),
        parseStringPromise(profileXml)
      ]);
      
      const profile = profileResult.profile || {};
      const stats = {
        avatar: profile.avatarFull ? profile.avatarFull[0] : null,
        level: profile.steamRating ? profile.steamRating[0] : "42",
        status: profile.stateMessage ? profile.stateMessage[0] : "ONLINE"
      };

      const gamesData = gamesResult.gamesList?.games?.[0]?.game || [];
      const games = gamesData.map((g) => ({
        name: g.name[0],
        appid: String(g.appID[0]),
        image: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${g.appID[0]}/header.jpg`,
        hours: g.hoursOnRecord ? g.hoursOnRecord[0] : "0",
        categories: []
      }));

      const result = { games, stats };
      cache = result;
      cacheTime = Date.now();
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("Steam API Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
