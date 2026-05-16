import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import { parseStringPromise } from "xml2js";

async function startServer() {
  const app = express();
  const PORT = 3000;

// Simple In-Memory Cache
interface CacheEntry {
  data: any;
  timestamp: number;
}
const steamCache: { [key: string]: CacheEntry } = {};
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Steam API Proxy
app.get("/api/steam", async (req, res) => {
  try {
    const apiKey = process.env.STEAM_API_KEY;
    const vanityId = "prunu5h3ad";
    
    // Check Cache
    const cached = steamCache[vanityId];
    if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
      console.log("Serving Steam data from cache...");
      return res.json(cached.data);
    }

    if (apiKey && apiKey.trim() !== "") {
        // --- METHOD A: Official Steam Web API (Preferred) ---
        console.log("Using Steam Web API with Key...");
        
        // 1. Resolve Vanity URL
        const resolveRes = await axios.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/`, {
          params: { key: apiKey, vanityurl: vanityId }
        });
        
        const steamId = resolveRes.data.response.steamid;
        if (!steamId) {
          return res.status(404).json({ error: "Could not resolve SteamID from vanity URL." });
        }

        // 2. Get Player Summary
        const summaryRes = await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/`, {
          params: { key: apiKey, steamids: steamId }
        });
        const player = summaryRes.data.response.players[0];

        // 3. Get Player Level
        let level = "??";
        try {
          const levelRes = await axios.get(`http://api.steampowered.com/IPlayerService/GetSteamLevel/v0001/`, {
            params: { key: apiKey, steamid: steamId }
          });
          level = String(levelRes.data.response.player_level);
        } catch (e) {
          console.error("Level Fetch Error:", e);
        }
        
        // 4. Get Owned Games
        const gamesRes = await axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/`, {
          params: {
            key: apiKey,
            steamid: steamId,
            format: 'json',
            include_appinfo: 1,
            include_played_free_games: 1
          }
        });

        const stats = {
          avatar: player?.avatarfull || null,
          level: level,
          status: player?.personastate === 1 ? "ONLINE" : "OFFLINE"
        };

        const games = (gamesRes.data.response.games || []).map((g: any) => ({
          name: g.name,
          appid: String(g.appid),
          image: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${g.appid}/header.jpg`,
          hours: (g.playtime_forever / 60).toFixed(1),
          categories: [] 
        }));

        const result = { games, stats };
        steamCache[vanityId] = { data: result, timestamp: Date.now() };

        return res.json(result);

      } else {
        // --- METHOD B: XML Fallback (Legacy/No Key) ---
        console.log("No API Key found, falling back to XML...");
        const gamesUrl = `https://steamcommunity.com/id/${vanityId}/games?tab=all&xml=1`;
        const profileUrl = `https://steamcommunity.com/id/${vanityId}/?xml=1`;
        
        const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' };
        
        const [gamesRes, profileRes] = await Promise.all([
          axios.get(gamesUrl, { headers }),
          axios.get(profileUrl, { headers })
        ]);

        // Validate if response is actually XML
        if (typeof gamesRes.data !== 'string' || !gamesRes.data.includes('<?xml')) {
          return res.json({ 
            error: "Steam library is private or XML API is unavailable. Please provide a STEAM_API_KEY.", 
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
  
        if (!gamesResult.gamesList || !gamesResult.gamesList.games || !gamesResult.gamesList.games[0].game) {
          return res.json({ error: "No games found in XML response", games: [], stats });
        }
  
        const gamesData = gamesResult.gamesList.games[0].game;
        const games = gamesData.map((g: any) => ({
          name: g.name[0],
          appid: g.appID[0],
          image: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${g.appID[0]}/header.jpg`,
          hours: g.hoursOnRecord ? g.hoursOnRecord[0] : "0",
          lastPlayed: g.lastPlayed ? g.lastPlayed[0] : null
        }));
  
        const result = { games, stats };
        steamCache[vanityId] = { data: result, timestamp: Date.now() };
  
        return res.json(result);
      }
    } catch (error: any) {
      console.error("Steam Fetch Error:", error.message);
      res.status(500).json({ error: "Internal Server Error during Steam data fetch." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
