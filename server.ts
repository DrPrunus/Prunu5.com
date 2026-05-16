import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import { parseStringPromise } from "xml2js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Steam API Proxy
  app.get("/api/steam", async (req, res) => {
    try {
      const vanityId = "prunu5h3ad";
      const gamesUrl = `https://steamcommunity.com/id/${vanityId}/games?tab=all&xml=1`;
      const profileUrl = `https://steamcommunity.com/id/${vanityId}/?xml=1`;
      
      const [gamesRes, profileRes] = await Promise.all([
        axios.get(gamesUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }),
        axios.get(profileUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } })
      ]);
      
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
        // If the profile is private, return empty
        return res.json({ error: "Profile is private or data missing", games: [], stats });
      }

      const gamesData = gamesResult.gamesList.games[0].game;
      const games = gamesData.map((g: any) => ({
        name: g.name[0],
        appid: g.appID[0],
        image: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${g.appID[0]}/header.jpg`,
        hours: g.hoursOnRecord ? g.hoursOnRecord[0] : "0",
        lastPlayed: g.lastPlayed ? g.lastPlayed[0] : null
      }));

      // Sort by hours
      games.sort((a: any, b: any) => {
        const hA = parseFloat(a.hours.replace(/,/g, ''));
        const hB = parseFloat(b.hours.replace(/,/g, ''));
        return hB - hA;
      });

      res.json({ games, stats });
    } catch (error) {
      console.error("Steam Fetch Error:", error);
      res.status(500).json({ error: "Failed" });
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
