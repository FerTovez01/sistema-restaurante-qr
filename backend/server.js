const express = require('express');
const cors = require('cors');
const path = require('path');
const { pool, inicializarBaseDeDatos } = require('./database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ 
      status: '✅ OK', 
      message: 'Sistema funcionando en Render',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/menu.html'));
});

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/menu.html'));
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Servidor en puerto ${PORT}`);
  await inicializarBaseDeDatos();
});
