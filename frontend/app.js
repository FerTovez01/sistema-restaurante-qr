// ===== CONFIGURACIÓN Y VARIABLES GLOBALES =====
let carrito = [];
let tipoPedido = 'local';
let mesaActual = 'MESA-01';
let productos = [];
let categorias = [];
let sessionId = generarSessionId();

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando sistema restaurante...');
    inicializarApp();
});

async function inicializarApp() {
    mostrarLoading(true);
    
    try {
        await Promise.all([
            detectarMesa(),
            cargarCategorias(),
            cargarProductos()
        ]);
        
        mostrarLoading(false);
        console.log('✅ App inicializada correctamente');
    } catch (error) {
        console.error('❌ Error inicializando app:', error);
        mostrarError('Error cargando el menú. Recarga la página.');
        mostrarLoading(false);
    }
}

// ===== FUNCIONES PRINCIPALES =====

function generarSessionId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function detectarMesa() {
    const urlParams = new URLSearchParams(window.location.search);
    const mesa = urlParams.get('mesa') || '1';
    mesaActual = `MESA-${mesa.padStart(2, '0')}`;
    document.getElementById('mesa-numero').textContent = mesaActual;
    console.log('📍 Mesa detectada:', mesaActual);
}

async function cargarCategorias() {
    try {
        const response = await fetch('/api/categorias');
        categorias = await response.json();
        mostrarCategorias();
    } catch (error) {
        console.error('Error cargando categorías:', error);
        // Categorías de respaldo
        categorias = [
            { id: 1, nombre: 'Entradas', icono: '🥗' },
            { id: 2, nombre: 'Platos Fuertes', icono: '🍖' },
            { id: 3, nombre: 'Bebidas', icono: '🥤' },
            { id: 4, nombre: 'Postres', icono: '🍰' }
        ];
        mostrarCategorias();
    }
}

function mostrarCategorias() {
    const container = document.getElementById('categorias-nav').querySelector('.categorias-container');
    container.innerHTML = categorias.map(cat => `
        <button class="categoria-btn" onclick="filtrarCategoria(${cat.id})" data-categoria="${cat.id}">
            ${cat.icono} ${cat.nombre}
        </button>
    `).join('');
    
    // Activar primera categoría
    if (categorias.length > 0) {
        filtrarCategoria(categorias[0].id);
    }
}

async function cargarProductos() {
    try {
        const response = await fetch('/api/productos');
        productos = await response.json();
        console.log('📦 Productos cargados:', productos.length);
        
        // Si no hay productos, mostrar algunos de ejemplo
        if (productos.length === 0) {
            productos = obtenerProductosEjemplo();
        }
    } catch (error) {
        console.error('Error cargando productos:', error);
        productos = obtenerProductosEjemplo();
    }
}

function obtenerProductosEjemplo() {
    return [
        {
            id: 1,
            nombre: "Hamburguesa Premium",
            descripcion: "Carne 200g con queso cheddar y vegetales frescos",
            precio: 15.99,
            categoria_id: 2,
            ingredientes: "Carne, Queso, Lechuga, Tomate, Pan",
            destacado: true
        },
        {
            id: 2,
            nombre: "Pizza Margarita",
            descripcion: "Salsa de tomate natural con mozzarella fresca",
            precio: 12.99,
            categoria_id: 2,
            ingredientes: "Masa, Salsa, Mozzarella, Albahaca",
            destacado: false
        },
        {
            id: 3,
            nombre: "Ensalada César",
            descripcion: "Lechuga romana con pollo grillado y aderezo césar",
            precio: 9.99,
            categoria_id: 1,
            ingredientes: "Lechuga, Pollo, Crutones, Parmesano",
            destacado: false
        },
        {
            id: 4,
            nombre: "Refresco 500ml",
            descripcion: "Bebida refrescante de tu elección",
            precio: 2.99,
            categoria_id: 3,
            ingredientes: "",
            destacado: false
        },
        {
            id: 5,
            nombre: "Tiramisú Clásico",
            descripcion: "Postre italiano con café y mascarpone",
            precio: 6.99,
            categoria_id: 4,
            ingredientes: "Mascarpone, Café, Cacao, Bizcochos",
            destacado: true
        }
    ];
}

function filtrarCategoria(categoriaId) {
    const productosFiltrados = productos.filter(p => p.categoria_id == categoriaId);
    mostrarProductos(productosFiltrados);
    
    // Actualizar botones activos
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-categoria="${categoriaId}"]`).classList.add('active');
}

function mostrarProductos(productosFiltrados) {
    const container = document.getElementById('productos-container');
    
    if (productosFiltrados.length === 0) {
        container.innerHTML = `
            <div class="producto-card" style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-utensils" style="font-size: 48px; color: #bdc3c7; margin-bottom: 15px;"></i>
                <h3 style="color: #7f8c8d; margin-bottom: 10px;">No hay productos</h3>
                <p style="color: #95a5a6;">Próximamente más opciones...</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = productosFiltrados.map(producto => `
        <div class="producto-card ${producto.destacado ? 'destacado' : ''} fade-in">
            <div class="producto-header">
                <div class="producto-nombre">${producto.nombre}</div>
                <div class="producto-precio">$${producto.precio}</div>
            </div>
            <div class="producto-descripcion">${producto.descripcion}</div>
            ${producto.ingredientes ? `
            <div class="producto-ingredientes">
                ${producto.ingredientes}
            </div>
            ` : ''}
            <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})" data-producto="${producto.id}">
                <i class="fas fa-plus"></i> Agregar al Carrito
            </button>
        </div>
    `).join('');
}

// ===== CARRITO =====

async function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;
    
    const btn = document.querySelector(`[data-producto="${productoId}"]`);
    
    try {
        // Intentar agregar al carrito del servidor
        const response = await fetch('/api/carrito/agregar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                session_id: sessionId,
                mesa_id: obtenerIdMesa(),
                producto_id: productoId,
                cantidad: 1
            })
        });
        
        if (response.ok) {
            const result = await response.json();
            
            // Animación de confirmación
            btn.innerHTML = '<i class="fas fa-check"></i> ¡Agregado!';
            btn.classList.add('agregado', 'pulse');
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-plus"></i> Agregar al Carrito';
                btn.classList.remove('agregado', 'pulse');
            }, 1500);
            
            await cargarCarrito();
        } else {
            throw new Error('Error en el servidor');
        }
    } catch (error) {
        console.error('Error con API, usando carrito local:', error);
        // Fallback: agregar al carrito local
        agregarAlCarritoLocal(producto);
    }
}

function agregarAlCarritoLocal(producto) {
    const itemExistente = carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    actualizarCarritoUI();
    
    // Animación de confirmación
    const btn = document.querySelector(`[data-producto="${producto.id}"]`);
    btn.innerHTML = '<i class="fas fa-check"></i> ¡Agregado!';
    btn.classList.add('agregado', 'pulse');
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-plus"></i> Agregar al Carrito';
        btn.classList.remove('agregado', 'pulse');
    }, 1500);
    
    mostrarNotificacion('✅ Producto agregado al carrito');
}

async function cargarCarrito() {
    try {
        const response = await fetch(`/api/carrito/${sessionId}`);
        if (response.ok) {
            const items = await response.json();
            carrito = items.map(item => ({
                id: item.producto_id,
                nombre: item.nombre,
                precio: parseFloat(item.precio_unitario),
                cantidad: item.cantidad,
                subtotal: parseFloat(item.subtotal),
                carrito_id: item.id
            }));
        }
    } catch (error) {
        console.error('Error cargando carrito del servidor:', error);
        // Continuar con carrito local
    }
    
    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrecio = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    document.getElementById('carrito-contador').textContent = totalItems;
    document.getElementById('carrito-total').textContent = `$${totalPrecio.toFixed(2)}`;
    
    // Actualizar badge con animación
    const badge = document.getElementById('carrito-contador');
    badge.classList.add('pulse');
    setTimeout(() => badge.classList.remove('pulse'), 300);
}

// ===== MODAL CARRITO =====

function abrirCarrito() {
    if (carrito.length === 0) {
        mostrarNotificacion('🛒 Tu carrito está vacío');
        return;
    }
    
    actualizarModalCarrito();
    document.getElementById('modal-carrito').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cerrarCarrito() {
    document.getElementById('modal-carrito').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function actualizarModalCarrito() {
    const container = document.getElementById('carrito-items');
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const impuestos = subtotal * 0.10; // 10% de impuestos
    const total = subtotal + impuestos;
    
    container.innerHTML = carrito.map(item => `
        <div class="carrito-item fade-in">
            <div class="item-info">
                <div class="item-nombre">${item.nombre}</div>
                <div class="item-precio">$${item.precio} c/u</div>
            </div>
            <div class="item-controls">
                <button class="cantidad-btn" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                <span class="item-cantidad">${item.cantidad}</span>
                <button class="cantidad-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                <button class="eliminar-btn" onclick="eliminarDelCarrito(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    document.getElementById('resumen-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('resumen-impuestos').textContent = `$${impuestos.toFixed(2)}`;
    document.getElementById('resumen-total').textContent = `$${total.toFixed(2)}`;
}

function cambiarCantidad(productoId, cambio) {
    const item = carrito.find(item => item.id === productoId);
    if (!item) return;
    
    const nuevaCantidad = item.cantidad + cambio;
    
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(productoId);
        return;
    }
    
    item.cantidad = nuevaCantidad;
    actualizarCarritoUI();
    actualizarModalCarrito();
    
    mostrarNotificacion('🛒 Carrito actualizado');
}

function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarCarritoUI();
    actualizarModalCarrito();
    
    if (carrito.length === 0) {
        cerrarCarrito();
        mostrarNotificacion('🗑️ Producto eliminado');
    }
}

// ===== TIPO DE PEDIDO =====

function seleccionarTipo(tipo) {
    tipoPedido = tipo;
    const datosCliente = document.getElementById('datos-cliente');
    const grupoDireccion = document.getElementById('grupo-direccion');
    
    // Actualizar botones activos
    document.querySelectorAll('.tipo-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.tipo-btn').classList.add('active');
    
    // Mostrar/ocultar formularios
    if (tipo === 'delivery') {
        datosCliente.style.display = 'block';
        grupoDireccion.style.display = 'block';
    } else if (tipo === 'llevar') {
        datosCliente.style.display = 'block';
        grupoDireccion.style.display = 'none';
    } else {
        datosCliente.style.display = 'none';
    }
}

// ===== PAGO =====

function procesarPago() {
    if (carrito.length === 0) {
        mostrarNotificacion('🛒 Tu carrito está vacío');
        return;
    }
    
    // Validar datos para delivery
    if (tipoPedido === 'delivery') {
        const nombre = document.getElementById('cliente-nombre').value;
        const telefono = document.getElementById('cliente-telefono').value;
        const direccion = document.getElementById('cliente-direccion').value;
        
        if (!nombre || !telefono || !direccion) {
            mostrarError('❌ Completa todos los datos para delivery');
            return;
        }
    }
    
    // Validar datos para llevar
    if (tipoPedido === 'llevar') {
        const nombre = document.getElementById('cliente-nombre').value;
        const telefono = document.getElementById('cliente-telefono').value;
        
        if (!nombre || !telefono) {
            mostrarError('❌ Completa tu nombre y teléfono');
            return;
        }
    }
    
    // Guardar datos temporalmente
    const pedidoData = {
        session_id: sessionId,
        mesa: mesaActual,
        tipo: tipoPedido,
        items: carrito,
        cliente: {
            nombre: document.getElementById('cliente-nombre').value,
            telefono: document.getElementById('cliente-telefono').value,
            direccion: document.getElementById('cliente-direccion').value
        },
        total: carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
    };
    
    localStorage.setItem('pedidoActual', JSON.stringify(pedidoData));
    
    // Simular proceso de pago
    mostrarNotificacion('💰 Redirigiendo a métodos de pago...');
    
    setTimeout(() => {
        // Aquí normalmente redirigirías a una página de pago
        const total = pedidoData.total;
        const metodoPago = confirm(`💰 Total: $${total.toFixed(2)}\n\n¿Deseas proceder con el pago?\n\nMétodos disponibles:\n• 💵 Efectivo\n• 📲 Transferencia\n• 💳 POS`);
        
        if (metodoPago) {
            mostrarNotificacion('✅ Pedido confirmado! Tu comida está en preparación 🍳');
            // Aquí limpiarías el carrito
            carrito = [];
            actualizarCarritoUI();
            cerrarCarrito();
        }
    }, 2000);
}

// ===== UTILIDADES =====

function obtenerIdMesa() {
    const numero = mesaActual.split('-')[1];
    return parseInt(numero);
}

function mostrarLoading(mostrar) {
    document.getElementById('loading').style.display = mostrar ? 'flex' : 'none';
}

function mostrarError(mensaje) {
    mostrarNotificacion(mensaje, 'error');
}

function mostrarNotificacion(mensaje, tipo = 'success') {
    // Crear notificación temporal
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'error' ? '#e74c3c' : '#27ae60'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notificacion)) {
                document.body.removeChild(notificacion);
            }
        }, 300);
    }, 3000);
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-carrito');
    if (event.target === modal) {
        cerrarCarrito();
    }
});

// Prevenir cierre con ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cerrarCarrito();
    }
});

// Estilos para animaciones de notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log('🎯 Sistema de Restaurante QR - Frontend cargado');
