const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());

app.use('/api/jikan', createProxyMiddleware({
  target: 'https://api.jikan.moe',
  changeOrigin: true,
  pathRewrite: {
    '^/api/jikan': '', 
  },
}));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});