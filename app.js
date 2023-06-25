const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;





app.get('/get-price', async (req, res) => {
  const apiKey = 'bc093fe3-1948-4939-8638-2c01e69a1afa';
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?convert_id=2796&id=24638`;

  const headers = {
    Accepts: 'application/json',
    'X-CMC_PRO_API_KEY': apiKey,
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (data.data) {
      const nrkInrData = Math.round(data.data[24638].quote[2796].price * 100);
      res.json({ data: nrkInrData });
    } else {
      res.json({ data: 778 });
    }
  } catch (error) {
    res.json({ data: 778 });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
