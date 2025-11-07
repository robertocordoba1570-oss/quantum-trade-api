const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint para obtener el precio del oro
app.get('/api/precio-xauusd', (req, res) => {
  const precioActual = 3985; // Simulado como número
  res.json({ symbol: "XAUUSD", price: precioActual });
});

// Endpoint para registrar la operación
app.post('/api/operar-xauusd', (req, res) => {
  const { ticket, precio, fecha } = req.body;
  console.log(`📩 Transacción recibida:\nTicket: ${ticket}\nPrecio: ${precio}\nFecha: ${fecha}`);
  res.json({ mensaje: "Operación registrada con éxito en Quantum Trade." });
});

app.listen(PORT, () => {
  console.log(`✅ Quantum Trade API activo en puerto ${PORT}`);
});




