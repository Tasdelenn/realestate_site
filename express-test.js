const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Emlak Sitesi</title></head>
      <body>
        <h1>Emlak Sitesi Çalışıyor!</h1>
        <p>Google Drive entegrasyonu yakında...</p>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Express sunucusu çalışıyor: http://localhost:3000');
});