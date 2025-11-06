const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = 'a66be6abf67448a6ba4d6bbc2c8ba017';

// Función genérica para consultar precios
async function obtenerPrecio(symbol) {
  const url = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.close;
}

// Endpoints institucionales
const activos = {
  xauusd: 'XAU/USD',
  plata: 'XAG/USD',
  cobre: 'COPPER/USD',
  btcusd: 'BTC/USD',
  ethusd: 'ETH/USD',
  usdjpy: 'USD/JPY',
  gbpusd: 'GBP/USD',
  usdcad: 'USD/CAD',
  audusd: 'AUD/USD',
  eurusd: 'EUR/USD',
  aapl: 'AAPL',
  nvda: 'NVDA',
  googl: 'GOOGL',
  msft: 'MSFT',
  amzn: 'AMZN'
};

for (const [ruta, simbolo] of Object.entries(activos)) {
  app.get(`/api/precio-${ruta}`, async (req, res) => {
    try {
      const precio = await obtenerPrecio(simbolo);
      res.json({ symbol: simbolo.replace('/', ''), price: precio });
    } catch (error) {
      console.error(`Error al consultar precio ${simbolo}:`, error.message);
      res.status(500).json({ error: `No se pudo obtener el precio de ${simbolo}` });
    }
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});

