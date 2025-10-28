const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function inicializarBaseDeDatos() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS mesas (
        id SERIAL PRIMARY KEY,
        numero VARCHAR(10) UNIQUE NOT NULL,
        qr_code TEXT,
        estado VARCHAR(20) DEFAULT 'libre',
        activa BOOLEAN DEFAULT TRUE
      );
      
      CREATE TABLE IF NOT EXISTS categorias (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        icono VARCHAR(50),
        orden INTEGER DEFAULT 0
      );
      
      INSERT INTO categorias (nombre, icono, orden) VALUES 
      ('Entradas', '🥗', 1),
      ('Platos Fuertes', '🍖', 2),
      ('Bebidas', '🥤', 3),
      ('Postres', '🍰', 4)
      ON CONFLICT DO NOTHING;
      
      INSERT INTO mesas (numero, qr_code) VALUES 
      ('MESA-01', '/menu?mesa=1'),
      ('MESA-02', '/menu?mesa=2')
      ON CONFLICT DO NOTHING;
    `);
    console.log('✅ Base de datos inicializada');
  } catch (error) {
    console.error('❌ Error inicializando BD:', error);
  }
}

module.exports = { pool, inicializarBaseDeDatos };
