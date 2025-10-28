const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function inicializarBaseDeDatos() {
  try {
    const client = await pool.connect();
    
    // TABLAS DEL SISTEMA COMPLETO
    await client.query(`
      -- Mesas del restaurante
      CREATE TABLE IF NOT EXISTS mesas (
        id SERIAL PRIMARY KEY,
        numero VARCHAR(10) UNIQUE NOT NULL,
        qr_code TEXT,
        estado VARCHAR(20) DEFAULT 'libre',
        activa BOOLEAN DEFAULT TRUE
      );

      -- Categorías de productos
      CREATE TABLE IF NOT EXISTS categorias (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        icono VARCHAR(50),
        orden INTEGER DEFAULT 0
      );

      -- Productos del menú
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10,2) NOT NULL,
        categoria_id INTEGER REFERENCES categorias(id),
        imagen TEXT,
        disponible BOOLEAN DEFAULT TRUE,
        ingredientes TEXT,
        destacado BOOLEAN DEFAULT FALSE
      );

      -- Carrito temporal
      CREATE TABLE IF NOT EXISTS carrito (
        id SERIAL PRIMARY KEY,
        sesion_id VARCHAR(100) NOT NULL,
        mesa_id INTEGER REFERENCES mesas(id),
        producto_id INTEGER REFERENCES productos(id),
        cantidad INTEGER NOT NULL DEFAULT 1,
        precio_unitario DECIMAL(10,2) NOT NULL,
        subtotal DECIMAL(10,2) NOT NULL
      );

      -- Pedidos principales
      CREATE TABLE IF NOT EXISTS pedidos (
        id SERIAL PRIMARY KEY,
        mesa_id INTEGER REFERENCES mesas(id),
        tipo_pedido VARCHAR(20) DEFAULT 'local',
        estado VARCHAR(20) DEFAULT 'pendiente',
        metodo_pago VARCHAR(20),
        
        -- Datos cliente (para llevar/delivery)
        cliente_nombre VARCHAR(100),
        cliente_telefono VARCHAR(20), 
        cliente_direccion TEXT,
        
        -- Control de pago
        pagado BOOLEAN DEFAULT FALSE,
        comprobante_pago TEXT,
        
        total DECIMAL(10,2) DEFAULT 0,
        creado_por VARCHAR(20) DEFAULT 'cliente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Detalles de pedido
      CREATE TABLE IF NOT EXISTS detalles_pedido (
        id SERIAL PRIMARY KEY,
        pedido_id INTEGER REFERENCES pedidos(id) ON DELETE CASCADE,
        producto_id INTEGER REFERENCES productos(id),
        cantidad INTEGER NOT NULL,
        precio_unitario DECIMAL(10,2),
        subtotal DECIMAL(10,2)
      );

      -- Usuarios administrativos
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        rol VARCHAR(20) DEFAULT 'admin',
        activo BOOLEAN DEFAULT TRUE
      );
    `);

    // DATOS INICIALES PARA CORRALES RESTAURANT
    await client.query(`
      -- Categorías
      INSERT INTO categorias (nombre, icono, orden) VALUES 
      ('Entradas', '🥗', 1),
      ('Platos Fuertes', '🍖', 2), 
      ('Bebidas', '🥤', 3),
      ('Postres', '🍰', 4)
      ON CONFLICT DO NOTHING;

      -- Mesas
      INSERT INTO mesas (numero, qr_code) VALUES 
      ('MESA-01', '/menu?mesa=1'),
      ('MESA-02', '/menu?mesa=2'),
      ('MESA-03', '/menu?mesa=3'),
      ('MESA-04', '/menu?mesa=4')
      ON CONFLICT DO NOTHING;

      -- Productos de Corrales Restaurant (Precios en Lempiras)
      INSERT INTO productos (nombre, descripcion, precio, categoria_id, imagen, ingredientes, destacado) VALUES 
      ('Parrillada Corrales', 'Mixto de carnes a la parrilla con chimol y tortillas', 280.00, 2, '/images/parrillada.jpg', 'Carne de res, chorizo, costilla, chimol, tortillas', true),
      ('Sopa de Mariscos', 'Sopa criolla con mixto de mariscos frescos', 180.00, 1, '/images/sopa-mariscos.jpg', 'Camarones, caracoles, pescado, yuca, plátano', false),
      ('Baleada Especial', 'Tortilla de harina con frijoles, queso y aguacate', 45.00, 2, '/images/baleada.jpg', 'Tortilla, frijoles, queso, aguacate, crema', true),
      ('Pollo Chuco', 'Pollo frito crujiente con tajadas y encurtido', 120.00, 2, '/images/pollo-chuco.jpg', 'Pollo, plátano, repollo, zanahoria, salsa', false),
      ('Horchata', 'Bebida refrescante de arroz y canela', 25.00, 3, '/images/horchata.jpg', 'Arroz, canela, azúcar, especias', false),
      ('Tres Leches', 'Postre tradicional hondureño', 60.00, 4, '/images/tres-leches.jpg', 'Leche evaporada, leche condensada, crema, bizcocho', true)
      ON CONFLICT DO NOTHING;

      -- Usuario admin por defecto
      INSERT INTO usuarios (username, password, rol) VALUES 
      ('admin', 'admin123', 'admin')
      ON CONFLICT DO NOTHING;
    `);

    client.release();
    console.log('✅ Base de datos de Corrales Restaurant inicializada');
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
  }
}

module.exports = { pool, inicializarBaseDeDatos };
