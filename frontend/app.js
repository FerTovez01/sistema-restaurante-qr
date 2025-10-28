// ===== CONFIGURACIÓN Y VARIABLES GLOBALES =====
let carrito = [];
let tipoPedido = 'local';
let mesaActual = 'MESA-01';
let productos = [];
let categorias = [];
let sessionId = generarSessionId();

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando Corrales Restaurant...');
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
        console.log('✅ Corrales Restaurant inicializado correctamente');
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

// ===== FUNCIÓN PARA FORMATEAR PRECIOS EN LEMPIRAS =====
function formatearPrecio(precio) {
    return `L. ${parseFloat(precio).toFixed(2)}`;
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
            nombre: "Parrillada Corrales",
            descripcion: "Mixto de carnes a la parrilla con chimol y tortillas",
            precio: 280.00,
            categoria_id: 2,
            imagen: "/images/parrillada.jpg",
            ingredientes: "Carne de res, chorizo, costilla, chimol, tortillas",
            destacado: true
        },
        {
            id: 2,
            nombre: "Sopa de Mariscos",
            descripcion: "Sopa criolla con mixto de mariscos frescos",
            precio: 180.00,
            categoria_id: 1,
            imagen: "/images/sopa-mariscos.jpg",
            ingredientes: "Camarones, caracoles, pescado, yuca, plátano",
            destacado: false
        },
        {
            id: 3,
            nombre: "Baleada Especial",
            descripcion: "Tortilla de harina con frijoles, queso y aguacate",
            precio: 45.00,
            categoria_id: 2,
            imagen: "/images/baleada.jpg",
            ingredientes: "Tortilla, frijoles, queso, aguacate, crema",
            destacado: true
        },
        {
            id: 4,
            nombre: "Pollo Chuco",
            descripcion: "Pollo frito crujiente con tajadas y encurtido",
            precio: 120.00,
            categoria_id: 2,
            imagen: "/images/pollo-chuco.jpg",
            ingredientes: "Pollo, plátano, repollo, zanahoria, salsa",
            destacado: false
        },
        {
            id: 5,
            nombre: "Horchata",
            descripcion: "Bebida refrescante de arroz y canela",
            precio: 25.00,
            categoria_id: 3,
            imagen: "/images/horchata.jpg",
            ingredientes: "Arroz, canela, azúcar, especias",
            destacado: false
        },
        {
            id: 6,
            nombre: "Tres Leches",
            descripcion: "Postre tradicional hondureño",
            precio: 60.00,
            categoria_id: 4,
            imagen: "/images/tres-leches.jpg",
            ingredientes: "Leche evaporada, leche condensada, crema, bizcocho",
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
            ${producto.imagen ? `
            <div class="producto-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}" 
                     onerror="this.style.display='none'">
            </div>
            ` : ''}
            <div class="producto-header">
                <div class="producto-nombre">${producto.nombre}</div>
                <div class="producto-precio">${formatearPrecio(producto.precio)}</div>
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
        // Usar carrito local
    }
    
    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrecio = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    document.getElementById('carrito-contador').textContent = totalItems;
    document.getElementById('carrito-total').textContent = formatearPrecio(totalPrecio);
    
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
    const impuestos = subtotal * 0.15; // 15% de impuestos
    const total = subtotal + impuestos;
    
    container.innerHTML = carrito.map(item => `
        <div class="carrito-item fade-in">
            <div class="item-info">
                <div class="item-nombre">${item.nombre}</div>
                <div class="item-precio">${formatearPrecio(item.precio)} c/u</div>
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
    
    document.getElementById('resumen-subtotal').textContent = formatearPrecio(subtotal);
    document.getElementById('resumen-impuestos').textContent = formatearPrecio(impuestos);
    document.getElementById('resumen-total').textContent = formatearPrecio(total);
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

// ===== SISTEMA DE PAGO COMPLETO =====
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
    
    // Mostrar modal de métodos de pago
    mostrarModalMetodosPago();
}

function mostrarModalMetodosPago() {
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const impuestos = subtotal * 0.15; // 15% de impuestos Honduras
    const total = subtotal + impuestos;
    
    const modalHTML = `
        <div class="modal-overlay" onclick="cerrarModalPago()"></div>
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h2 class="modal-title">
                    <i class="fas fa-credit-card"></i>
                    Método de Pago
                </h2>
                <button class="modal-close" onclick="cerrarModalPago()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="resumen-pedido-pago">
                    <h4>Resumen del Pedido:</h4>
                    <div class="resumen-line">
                        <span>Subtotal:</span>
                        <span>${formatearPrecio(subtotal)}</span>
                    </div>
                    <div class="resumen-line">
                        <span>Impuestos (15%):</span>
                        <span>${formatearPrecio(impuestos)}</span>
                    </div>
                    <div class="resumen-line total">
                        <span>Total a Pagar:</span>
                        <span>${formatearPrecio(total)}</span>
                    </div>
                </div>
                
                <div class="metodos-pago">
                    <h4>Selecciona tu método de pago:</h4>
                    
                    <div class="metodo-pago-option" onclick="seleccionarMetodoPago('efectivo')">
                        <div class="metodo-icon">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                        <div class="metodo-info">
                            <strong>Efectivo</strong>
                            <span>Paga al momento de recibir tu pedido</span>
                        </div>
                        <div class="metodo-radio">
                            <input type="radio" name="metodoPago" value="efectivo">
                        </div>
                    </div>
                    
                    <div class="metodo-pago-option" onclick="seleccionarMetodoPago('transferencia')">
                        <div class="metodo-icon">
                            <i class="fas fa-university"></i>
                        </div>
                        <div class="metodo-info">
                            <strong>Transferencia Bancaria</strong>
                            <span>Transfiere desde tu banco</span>
                        </div>
                        <div class="metodo-radio">
                            <input type="radio" name="metodoPago" value="transferencia">
                        </div>
                    </div>
                    
                    <div class="metodo-pago-option" onclick="seleccionarMetodoPago('pos')">
                        <div class="metodo-icon">
                            <i class="fas fa-credit-card"></i>
                        </div>
                        <div class="metodo-info">
                            <strong>POS/Tarjeta</strong>
                            <span>Paga con tarjeta al recibir</span>
                        </div>
                        <div class="metodo-radio">
                            <input type="radio" name="metodoPago" value="pos">
                        </div>
                    </div>
                </div>
                
                <!-- Información Transferencia (oculta inicialmente) -->
                <div id="info-transferencia" style="display: none; margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <h4><i class="fas fa-info-circle"></i> Datos para Transferencia:</h4>
                    <div class="datos-banco">
                        <p><strong>Banco:</strong> BAC Credomatic</p>
                        <p><strong>Cuenta:</strong> 1234567890123456</p>
                        <p><strong>CLABE:</strong> 012345678901234567</p>
                        <p><strong>Beneficiario:</strong> CORRALES RESTAURANT S. DE R.L.</p>
                        <p><strong>RTN:</strong> 08011990123456</p>
                    </div>
                    <div class="comprobante-transferencia" style="margin-top: 15px;">
                        <label>
                            <input type="file" id="comprobante-pago" accept="image/*,.pdf" style="margin-top: 10px;">
                            <small>Sube tu comprobante de transferencia (opcional)</small>
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="cerrarModalPago()">
                    Cancelar
                </button>
                <button class="btn btn-primary" id="btn-confirmar-pago" onclick="confirmarPedidoConPago()" disabled>
                    <i class="fas fa-check"></i>
                    Confirmar Pedido
                </button>
            </div>
        </div>
    `;
    
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'modal-pago';
    modal.innerHTML = modalHTML;
    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function seleccionarMetodoPago(metodo) {
    // Marcar radio button
    document.querySelectorAll('input[name="metodoPago"]').forEach(radio => {
        radio.checked = radio.value === metodo;
    });
    
    // Mostrar/ocultar info de transferencia
    const infoTransferencia = document.getElementById('info-transferencia');
    if (metodo === 'transferencia') {
        infoTransferencia.style.display = 'block';
    } else {
        infoTransferencia.style.display = 'none';
    }
    
    // Habilitar botón de confirmar
    document.getElementById('btn-confirmar-pago').disabled = false;
}

function cerrarModalPago() {
    const modal = document.getElementById('modal-pago');
    if (modal) {
        modal.remove();
    }
    document.body.style.overflow = 'auto';
}

async function confirmarPedidoConPago() {
    const metodoPago = document.querySelector('input[name="metodoPago"]:checked');
    if (!metodoPago) {
        mostrarError('❌ Selecciona un método de pago');
        return;
    }
    
    const metodo = metodoPago.value;
    
    // Crear objeto de pedido
    const pedidoData = {
        session_id: sessionId,
        mesa_id: obtenerIdMesa(),
        tipo_pedido: tipoPedido,
        metodo_pago: metodo,
        cliente: {
            nombre: document.getElementById('cliente-nombre').value,
            telefono: document.getElementById('cliente-telefono').value,
            direccion: document.getElementById('cliente-direccion').value
        },
        items: carrito,
        total: carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
    };
    
    try {
        // Enviar pedido al servidor
        const response = await fetch('/api/pedidos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(pedidoData)
        });
        
        if (response.ok) {
            const result = await response.json();
            
            // Guardar en localStorage para seguimiento
            localStorage.setItem('ultimoPedido', JSON.stringify({
                ...pedidoData,
                numeroPedido: result.numero_pedido,
                estado: 'confirmado',
                fecha: new Date().toISOString(),
                tiempoEstimado: '20-30 minutos'
            }));
            
            // Cerrar modales
            cerrarModalPago();
            cerrarCarrito();
            
            // Mostrar pantalla de seguimiento
            mostrarSeguimientoPedido();
            
        } else {
            throw new Error('Error en el servidor');
        }
        
    } catch (error) {
        console.error('Error confirmando pedido:', error);
        // Fallback: guardar localmente
        localStorage.setItem('ultimoPedido', JSON.stringify({
            ...pedidoData,
            numeroPedido: 'P' + Date.now(),
            estado: 'confirmado',
            fecha: new Date().toISOString(),
            tiempoEstimado: '20-30 minutos'
        }));
        
        cerrarModalPago();
        cerrarCarrito();
        mostrarSeguimientoPedido();
    }
}

// ===== SISTEMA DE SEGUIMIENTO =====
function mostrarSeguimientoPedido() {
    const pedido = JSON.parse(localStorage.getItem('ultimoPedido'));
    if (!pedido) return;
    
    const seguimientoHTML = `
        <div class="modal-overlay" onclick="cerrarSeguimiento()"></div>
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h2 class="modal-title">
                    <i class="fas fa-truck"></i>
                    ¡Pedido Confirmado!
                </h2>
            </div>
            
            <div class="modal-body">
                <div class="confirmacion-pedido">
                    <div class="confirmacion-icon">
                        <i class="fas fa-check-circle" style="color: #27ae60; font-size: 48px;"></i>
                    </div>
                    <h3 style="text-align: center; color: #27ae60; margin: 15px 0;">¡Gracias por tu pedido!</h3>
                    
                    <div class="info-pedido">
                        <p><strong>Número de Pedido:</strong> ${pedido.numeroPedido}</p>
                        <p><strong>Total:</strong> ${formatearPrecio(pedido.total)}</p>
                        <p><strong>Método de Pago:</strong> ${obtenerTextoMetodoPago(pedido.metodo_pago)}</p>
                        <p><strong>Tiempo Estimado:</strong> ${pedido.tiempoEstimado}</p>
                    </div>
                </div>
                
                <div class="seguimiento-estados">
                    <h4>Seguimiento de tu pedido:</h4>
                    
                    <div class="timeline">
                        <div class="timeline-item active">
                            <div class="timeline-icon">
                                <i class="fas fa-check"></i>
                            </div>
                            <div class="timeline-content">
                                <strong>Pedido Recibido</strong>
                                <span>Hemos recibido tu pedido</span>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="timeline-icon">
                                <i class="fas fa-utensils"></i>
                            </div>
                            <div class="timeline-content">
                                <strong>En Preparación</strong>
                                <span>Tu comida está en cocina</span>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="timeline-icon">
                                <i class="fas fa-check-double"></i>
                            </div>
                            <div class="timeline-content">
                                <strong>Listo</strong>
                                <span>Tu pedido está listo</span>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="timeline-icon">
                                <i class="fas fa-box"></i>
                            </div>
                            <div class="timeline-content">
                                <strong>Entregado</strong>
                                <span>Pedido completado</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="acciones-seguimiento">
                    <p><small>Puedes cerrar esta ventana. Te notificaremos cuando tu pedido avance.</small></p>
                    <button class="btn btn-primary" onclick="cerrarSeguimientoYLimpiar()">
                        <i class="fas fa-home"></i>
                        Volver al Menú
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'modal-seguimiento';
    modal.innerHTML = seguimientoHTML;
    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function obtenerTextoMetodoPago(metodo) {
    const metodos = {
        'efectivo': '💵 Efectivo',
        'transferencia': '🏦 Transferencia Bancaria', 
        'pos': '💳 POS/Tarjeta'
    };
    return metodos[metodo] || metodo;
}

function cerrarSeguimiento() {
    const modal = document.getElementById('modal-seguimiento');
    if (modal) {
        modal.remove();
    }
    document.body.style.overflow = 'auto';
}

function cerrarSeguimientoYLimpiar() {
    // Limpiar carrito
    carrito = [];
    actualizarCarritoUI();
    
    // Limpiar formularios
    document.getElementById('cliente-nombre').value = '';
    document.getElementById('cliente-telefono').value = '';
    document.getElementById('cliente-direccion').value = '';
    
    // Cerrar modal
    cerrarSeguimiento();
    
    mostrarNotificacion('✅ Pedido completado. ¡Gracias por elegir Corrales Restaurant!');
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
    
    const modalPago = document.getElementById('modal-pago');
    if (event.target === modalPago) {
        cerrarModalPago();
    }
});

// Prevenir cierre con ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cerrarCarrito();
        cerrarModalPago();
        cerrarSeguimiento();
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

console.log('🎯 Corrales Restaurant - Sistema de pedidos cargado');
