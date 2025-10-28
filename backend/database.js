const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function inicializarBaseDeDatos() {
  try {
    const client = await pool.connect();
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS mesas (
        id SERIAL PRIMARY KEY,
        numero VARCHAR(10) UNIQUE NOT NULL,
        qr_code TEXT,
        estado VARCHAR(20) DEFAULT 'libre',
        activa BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS categorias (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        icono VARCHAR(50),
        color VARCHAR(20),
        orden INTEGER DEFAULT 0
      );
      
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10,2) NOT NULL,
        categoria_id INTEGER REFERENCES categorias(id),
        imagen TEXT,
        disponible BOOLEAN DEFAULT TRUE,
        ingredientes TEXT,
        destacado BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS carrito (
        id SERIAL PRIMARY KEY,
        sesion_id VARCHAR(100) NOT NULL,
        mesa_id INTEGER REFERENCES mesas(id),
        producto_id INTEGER REFERENCES productos(id),
        cantidad INTEGER NOT NULL DEFAULT 1,
        precio_unitario DECIMAL(10,2) NOT NULL,
        subtotal DECIMAL(10,2) NOT NULL,
        notas TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS pedidos (
        id SERIAL PRIMARY KEY,
        mesa_id INTEGER REFERENCES mesas(id),
        tipo_pedido VARCHAR(20) DEFAULT 'local',
        estado VARCHAR(20) DEFAULT 'pendiente',
        metodo_pago VARCHAR(20),
        cliente_nombre VARCHAR(100),
        cliente_telefono VARCHAR(20),
        cliente_direccion TEXT,
        pagado BOOLEAN DEFAULT FALSE,
        comprobante_pago TEXT,
        total DECIMAL(10,2) DEFAULT 0,
        notas TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS detalles_pedido (
        id SERIAL PRIMARY KEY,
        pedido_id INTEGER REFERENCES pedidos(id) ON DELETE CASCADE,
        producto_id INTEGER REFERENCES productos(id),
        cantidad INTEGER NOT NULL,
        precio_unitario DECIMAL(10,2),
        subtotal DECIMAL(10,2),
        notas TEXT
      );
    `);
    
    // Datos iniciales
    await client.query(`
      INSERT INTO categorias (nombre, icono, color, orden) VALUES 
      ('Entradas', '🥗', 'green', 1),
      ('Platos Fuertes', '🍖', 'red', 2),
      ('Bebidas', '🥤', 'blue', 3),
      ('Postres', '🍰', 'purple', 4)
      ON CONFLICT DO NOTHING;
      
      INSERT INTO mesas (numero, qr_code) VALUES 
      ('MESA-01', '/menu?mesa=1'),
      ('MESA-02', '/menu?mesa=2'),
      ('MESA-03', '/menu?mesa=3'),
      ('MESA-04', '/menu?mesa=4')
      ON CONFLICT DO NOTHING;
      
      INSERT INTO productos (nombre, descripcion, precio, categoria_id, ingredientes, destacado) VALUES 
      ('Hamburguesa Premium', 'Carne 200g con queso cheddar', 15.99, 2, 'Carne, Queso, Lechuga, Tomate, Pan', true),
      ('Pizza Margarita', 'Salsa tomate con mozzarella', 12.99, 2, 'Masa, Salsa, Mozzarella, Albahaca', false),
      ('Ensalada César', 'Lechuga con pollo grillado', 9.99, 1, 'Lechuga, Pollo, Crutones, Parmesano', false),
      ('Refresco 500ml', 'Bebida refrescante', 2.99, 3, '', false),
      ('Tiramisú Clásico', 'Postre italiano con café', 6.99, 4, 'Mascarpone, Café, Cacao, Bizcochos', true)
      ON CONFLICT DO NOTHING;
    `);
    
    client.release();
    console.log('✅ Base de datos inicializada');
  } catch (error) {
    console.error('❌ Error inicializando BD:', error);
  }
}

module.exports = { pool, inicializarBaseDeDatos };
