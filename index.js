const express = require('express');
const fetch = require('node-fetch');
const path = require('path'); 

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/play', async (req, res) => {
  const songName = req.query.song;

  if (!songName) {
    return res.status(400).json({ error: 'Missing song name' });
  }

  const apiUrl = `https://api.elianabot.xyz/tools/ytmp3.php?music=${encodeURIComponent(songName)}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json(); 
    res.json(data); 

  } catch (error) {
    console.error('Error fetching song:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
