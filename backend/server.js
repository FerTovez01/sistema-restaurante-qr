const express = require('express');
const cors = require('cors');
const path = require('path');
const { pool, inicializarBaseDeDatos } = require('./database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Servir imágenes
app.use('/images', express.static(path.join(__dirname, '../frontend/images')));

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ 
      status: '✅ OK', 
      message: 'Corrales Restaurant funcionando',
      restaurante: 'Corrales Restaurant',
      moneda: 'Lempiras',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener mesas
app.get('/api/mesas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mesas WHERE activa = true');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener categorías
app.get('/api/categorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorias ORDER BY orden');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener productos
app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      JOIN categorias c ON p.categoria_id = c.id 
      WHERE p.disponible = true 
      ORDER BY p.destacado DESC, p.nombre
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener productos por categoría
app.get('/api/productos/categoria/:categoriaId', async (req, res) => {
  try {
    const { categoriaId } = req.params;
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      JOIN categorias c ON p.categoria_id = c.id 
      WHERE p.categoria_id = $1 AND p.disponible = true
      ORDER BY p.destacado DESC, p.nombre
    `, [categoriaId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manejar carrito
app.post('/api/carrito/agregar', async (req, res) => {
  try {
    const { session_id, mesa_id, producto_id, cantidad } = req.body;
    
    // Obtener precio del producto
    const productoResult = await pool.query(
      'SELECT precio FROM productos WHERE id = $1', 
      [producto_id]
    );
    
    if (productoResult.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    const precio = productoResult.rows[0].precio;
    const subtotal = precio * cantidad;
    
    // Verificar si ya existe en el carrito
    const existente = await pool.query(
      'SELECT * FROM carrito WHERE session_id = $1 AND producto_id = $2 AND mesa_id = $3',
      [session_id, producto_id, mesa_id]
    );
    
    if (existente.rows.length > 0) {
      // Actualizar cantidad
      await pool.query(
        'UPDATE carrito SET cantidad = cantidad + $1, subtotal = subtotal + $2 WHERE id = $3',
        [cantidad, subtotal, existente.rows[0].id]
      );
    } else {
      // Insertar nuevo
      await pool.query(
        `INSERT INTO carrito (session_id, mesa_id, producto_id, cantidad, precio_unitario, subtotal) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [session_id, mesa_id, producto_id, cantidad, precio, subtotal]
      );
    }
    
    res.json({ success: true, message: 'Producto agregado al carrito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener carrito
app.get('/api/carrito/:session_id', async (req, res) => {
  try {
    const { session_id } = req.params;
    const result = await pool.query(`
      SELECT c.*, p.nombre, p.imagen, p.descripcion 
      FROM carrito c 
      JOIN productos p ON c.producto_id = p.id 
      WHERE c.session_id = $1
    `, [session_id]);
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar del carrito
app.delete('/api/carrito/:session_id/item/:item_id', async (req, res) => {
  try {
    const { session_id, item_id } = req.params;
    await pool.query(
      'DELETE FROM carrito WHERE session_id = $1 AND id = $2',
      [session_id, item_id]
    );
    res.json({ success: true, message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear pedido
app.post('/api/pedidos', async (req, res) => {
  try {
    const { session_id, mesa_id, tipo_pedido, metodo_pago, cliente, items, total } = req.body;
    
    // Crear pedido principal
    const pedidoResult = await pool.query(
      `INSERT INTO pedidos (mesa_id, tipo_pedido, metodo_pago, cliente_nombre, cliente_telefono, cliente_direccion, total) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [mesa_id, tipo_pedido, metodo_pago, cliente.nombre, cliente.telefono, cliente.direccion, total]
    );
    
    const pedidoId = pedidoResult.rows[0].id;
    
    // Crear detalles del pedido
    for (const item of items) {
      await pool.query(
        `INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario, subtotal) 
         VALUES ($1, $2, $3, $4, $5)`,
        [pedidoId, item.id, item.cantidad, item.precio, item.precio * item.cantidad]
      );
    }
    
    // Limpiar carrito
    await pool.query('DELETE FROM carrito WHERE session_id = $1', [session_id]);
    
    res.json({ 
      success: true, 
      message: 'Pedido creado exitosamente',
      pedido_id: pedidoId,
      numero_pedido: 'P' + pedidoId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== RUTAS PARA EL PANEL ADMINISTRATIVO =====

// Obtener todos los pedidos
app.get('/api/admin/pedidos', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, m.numero as mesa_numero,
             COUNT(d.id) as total_items
      FROM pedidos p
      LEFT JOIN mesas m ON p.mesa_id = m.id
      LEFT JOIN detalles_pedido d ON p.id = d.pedido_id
      WHERE DATE(p.created_at) = CURRENT_DATE
      GROUP BY p.id, m.numero
      ORDER BY p.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener estadísticas del dashboard
app.get('/api/admin/estadisticas', async (req, res) => {
  try {
    // Estadísticas del día
    const ventasHoy = await pool.query(`
      SELECT 
        COUNT(*) as total_pedidos,
        COALESCE(SUM(total), 0) as total_ventas,
        COUNT(CASE WHEN estado = 'pendiente' THEN 1 END) as pedidos_pendientes,
        COUNT(CASE WHEN estado = 'preparacion' THEN 1 END) as en_preparacion,
        COUNT(CASE WHEN estado = 'listo' THEN 1 END) as pedidos_listos
      FROM pedidos 
      WHERE DATE(created_at) = CURRENT_DATE
    `);

    // Mesas activas
    const mesasActivas = await pool.query(`
      SELECT COUNT(*) as mesas_ocupadas
      FROM mesas 
      WHERE estado = 'ocupada' AND activa = true
    `);

    // Métodos de pago
    const metodosPago = await pool.query(`
      SELECT 
        metodo_pago,
        COUNT(*) as cantidad,
        COALESCE(SUM(total), 0) as total
      FROM pedidos 
      WHERE DATE(created_at) = CURRENT_DATE AND pagado = true
      GROUP BY metodo_pago
    `);

    res.json({
      ventas_hoy: ventasHoy.rows[0],
      mesas_activas: mesasActivas.rows[0],
      metodos_pago: metodosPago.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener reporte de ventas
app.get('/api/admin/reporte-ventas', async (req, res) => {
  try {
    const { periodo = 'hoy' } = req.query;
    
    let whereClause = "WHERE DATE(p.created_at) = CURRENT_DATE";
    if (periodo === 'semana') {
      whereClause = "WHERE p.created_at >= CURRENT_DATE - INTERVAL '7 days'";
    } else if (periodo === 'mes') {
      whereClause = "WHERE p.created_at >= CURRENT_DATE - INTERVAL '30 days'";
    }

    const ventasResult = await pool.query(`
      SELECT 
        COUNT(*) as total_pedidos,
        COALESCE(SUM(p.total), 0) as total_ventas,
        COALESCE(AVG(p.total), 0) as ticket_promedio,
        COUNT(CASE WHEN p.pagado = true THEN 1 END) as pedidos_pagados,
        COUNT(CASE WHEN p.pagado = false THEN 1 END) as pedidos_pendientes_pago
      FROM pedidos p
      ${whereClause}
    `);

    // Productos más vendidos
    const productosMasVendidos = await pool.query(`
      SELECT 
        pr.nombre,
        SUM(d.cantidad) as total_vendido,
        SUM(d.subtotal) as total_ingresos
      FROM detalles_pedido d
      JOIN productos pr ON d.producto_id = pr.id
      JOIN pedidos p ON d.pedido_id = p.id
      ${whereClause}
      GROUP BY pr.id, pr.nombre
      ORDER BY total_vendido DESC
      LIMIT 10
    `);

    // Mesas más activas
    const mesasActivas = await pool.query(`
      SELECT 
        m.numero,
        COUNT(p.id) as total_pedidos,
        COALESCE(SUM(p.total), 0) as total_ventas
      FROM pedidos p
      JOIN mesas m ON p.mesa_id = m.id
      ${whereClause}
      GROUP BY m.id, m.numero
      ORDER BY total_ventas DESC
      LIMIT 5
    `);

    res.json({
      resumen: ventasResult.rows[0],
      productos_mas_vendidos: productosMasVendidos.rows,
      mesas_activas: mesasActivas.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener productos para administración
app.get('/api/admin/productos', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre,
             (SELECT COUNT(*) FROM detalles_pedido dp WHERE dp.producto_id = p.id) as total_vendido
      FROM productos p
      JOIN categorias c ON p.categoria_id = c.id
      ORDER BY p.disponible DESC, p.nombre
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar estado de pedido
app.put('/api/admin/pedidos/:id/estado', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    
    await pool.query(
      'UPDATE pedidos SET estado = $1 WHERE id = $2',
      [estado, id]
    );
    
    res.json({ success: true, message: 'Estado actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Marcar pedido como pagado
app.put('/api/admin/pedidos/:id/pagar', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.query(
      'UPDATE pedidos SET pagado = true WHERE id = $1',
      [id]
    );
    
    res.json({ success: true, message: 'Pedido marcado como pagado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener pagos pendientes
app.get('/api/admin/pagos-pendientes', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, m.numero as mesa_numero
      FROM pedidos p
      LEFT JOIN mesas m ON p.mesa_id = m.id
      WHERE p.pagado = false
      ORDER BY p.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta principal - servir el menú
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/menu.html'));
});

// Ruta para menú con mesa específica
app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/menu.html'));
});

// Ruta para panel admin
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/admin.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Corrales Restaurant funcionando en puerto ${PORT}`);
  console.log(`📱 Menú: http://localhost:${PORT}/menu`);
  console.log(`👑 Admin: http://localhost:${PORT}/admin`);
  await inicializarBaseDeDatos();
});
