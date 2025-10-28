// Panel Administrativo - Corrales Restaurant
let pedidos = [];
let productos = [];
let mesas = [];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Panel Admin de Corrales Restaurant iniciado');
    cargarDashboard();
    setInterval(cargarDashboard, 30000); // Actualizar cada 30 segundos
});

// Navegación
function mostrarSeccion(seccion) {
    // Ocultar todas las secciones
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    document.getElementById(seccion).classList.add('active');
    
    // Actualizar navegación activa
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Cargar datos específicos de la sección
    if (seccion === 'pedidos') cargarPedidos();
    if (seccion === 'productos') cargarProductosAdmin();
    if (seccion === 'mesas') cargarMesas();
    if (seccion === 'ventas') cargarVentas();
    if (seccion === 'pagos') cargarPagos();
}

// Dashboard
async function cargarDashboard() {
    try {
        // En producción, aquí harías fetch a tu API
        console.log('📊 Actualizando dashboard de Corrales Restaurant...');
        
    } catch (error) {
        console.error('Error cargando dashboard:', error);
    }
}

// Gestión de Pedidos
async function cargarPedidos() {
    try {
        // Pedidos de ejemplo para Corrales Restaurant
        const pedidosEjemplo = [
            {
                id: 101,
                mesa: 'MESA-02',
                tipo: 'local',
                total: 450.00,
                estado: 'preparacion',
                metodo_pago: 'efectivo',
                pagado: true,
                items: ['Parrillada Corrales', 'Baleada Especial', 'Horchata'],
                cliente: '',
                fecha: '10:25 AM',
                tiempo: '15 min'
            },
            {
                id: 102,
                mesa: 'Delivery',
                tipo: 'delivery',
                total: 320.50,
                estado: 'pendiente',
                metodo_pago: 'transferencia',
                pagado: false,
                items: ['Pollo Chuco', 'Tres Leches'],
                cliente: 'María González',
                fecha: '10:15 AM',
                tiempo: '5 min'
            },
            {
                id: 103,
                mesa: 'MESA-04',
                tipo: 'local',
                total: 185.75,
                estado: 'listo',
                metodo_pago: 'pos',
                pagado: true,
                items: ['Sopa de Mariscos', 'Refresco'],
                cliente: '',
                fecha: '10:05 AM',
                tiempo: '25 min'
            },
            {
                id: 104,
                mesa: 'Para Llevar',
                tipo: 'llevar',
                total: 120.00,
                estado: 'entregado',
                metodo_pago: 'efectivo',
                pagado: true,
                items: ['Baleada Especial x2'],
                cliente: 'Carlos Hernández',
                fecha: '09:45 AM',
                tiempo: '45 min'
            }
        ];

        const pedidosHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mesa/Cliente</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Pago</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${pedidosEjemplo.map(pedido => `
                        <tr>
                            <td><strong>#P${pedido.id}</strong></td>
                            <td>
                                <strong>${pedido.mesa}</strong>
                                ${pedido.cliente ? `<br><small>${pedido.cliente}</small>` : ''}
                                <br><small style="color: #666;">${pedido.fecha}</small>
                            </td>
                            <td>
                                <small>${pedido.items.join(', ')}</small>
                            </td>
                            <td><strong>L. ${pedido.total.toFixed(2)}</strong></td>
                            <td>
                                <span class="estado-${pedido.estado}">
                                    ${obtenerTextoEstado(pedido.estado)}
                                </span>
                            </td>
                            <td>
                                <span class="metodo-${pedido.metodo_pago}">
                                    ${obtenerTextoMetodoPago(pedido.metodo_pago)}
                                </span>
                                <br>
                                <span class="${pedido.pagado ? 'pago-confirmado' : 'pago-pendiente'}">
                                    ${pedido.pagado ? 'Confirmado' : 'Pendiente'}
                                </span>
                            </td>
                            <td>
                                ${pedido.estado === 'pendiente' ? 
                                    `<button class="btn btn-success" onclick="cambiarEstadoPedido(${pedido.id}, 'preparacion')">
                                        <i class="fas fa-play"></i> 
                                    </button>` : ''}
                                ${pedido.estado === 'preparacion' ? 
                                    `<button class="btn btn-warning" onclick="cambiarEstadoPedido(${pedido.id}, 'listo')">
                                        <i class="fas fa-check"></i>
                                    </button>` : ''}
                                ${pedido.estado === 'listo' ? 
                                    `<button class="btn btn-info" onclick="cambiarEstadoPedido(${pedido.id}, 'entregado')">
                                        <i class="fas fa-check-circle"></i>
                                    </button>` : ''}
                                ${!pedido.pagado ? 
                                    `<button class="btn btn-success" onclick="marcarComoPagado(${pedido.id})">
                                        <i class="fas fa-money-bill"></i>
                                    </button>` : ''}
                                <button class="btn btn-danger" onclick="cancelarPedido(${pedido.id})">
                                    <i class="fas fa-times"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        
        document.getElementById('lista-pedidos').innerHTML = pedidosHTML;
        
    } catch (error) {
        console.error('Error cargando pedidos:', error);
        document.getElementById('lista-pedidos').innerHTML = '<p>Error cargando pedidos</p>';
    }
}

// Gestión de Productos
async function cargarProductosAdmin() {
    try {
        const productosEjemplo = [
            { id: 1, nombre: 'Parrillada Corrales', precio: 280.00, categoria: 'Platos Fuertes', disponible: true, destacado: true },
            { id: 2, nombre: 'Sopa de Mariscos', precio: 180.00, categoria: 'Entradas', disponible: true, destacado: false },
            { id: 3, nombre: 'Baleada Especial', precio: 45.00, categoria: 'Platos Fuertes', disponible: true, destacado: true },
            { id: 4, nombre: 'Pollo Chuco', precio: 120.00, categoria: 'Platos Fuertes', disponible: true, destacado: false },
            { id: 5, nombre: 'Horchata', precio: 25.00, categoria: 'Bebidas', disponible: true, destacado: false },
            { id: 6, nombre: 'Tres Leches', precio: 60.00, categoria: 'Postres', disponible: true, destacado: true }
        ];
        
        const productosHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${productosEjemplo.map(producto => `
                        <tr>
                            <td>
                                <strong>${producto.nombre}</strong>
                                ${producto.destacado ? ' <span style="color: gold;">⭐</span>' : ''}
                            </td>
                            <td><strong>L. ${producto.precio.toFixed(2)}</strong></td>
                            <td>${producto.categoria}</td>
                            <td>
                                <span style="color: ${producto.disponible ? 'green' : 'red'};">
                                    ${producto.disponible ? '🟢 Disponible' : '🔴 No Disponible'}
                                </span>
                            </td>
                            <td>
                                <button class="btn btn-info" onclick="editarProducto(${producto.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-warning" onclick="toggleDisponible(${producto.id})">
                                    <i class="fas fa-power-off"></i>
                                </button>
                                <button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        
        document.getElementById('lista-productos-admin').innerHTML = productosHTML;
        
    } catch (error) {
        console.error('Error cargando productos:', error);
    }
}

// Gestión de Mesas
async function cargarMesas() {
    try {
        const mesasEjemplo = [
            { id: 1, numero: 'MESA-01', estado: 'ocupada', qr: '/menu?mesa=1' },
            { id: 2, numero: 'MESA-02', estado: 'ocupada', qr: '/menu?mesa=2' },
            { id: 3, numero: 'MESA-03', estado: 'libre', qr: '/menu?mesa=3' },
            { id: 4, numero: 'MESA-04', estado: 'ocupada', qr: '/menu?mesa=4' },
            { id: 5, numero: 'MESA-05', estado: 'libre', qr: '/menu?mesa=5' },
            { id: 6, numero: 'MESA-06', estado: 'libre', qr: '/menu?mesa=6' }
        ];
        
        const mesasHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Mesa</th>
                        <th>Estado</th>
                        <th>QR Code</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${mesasEjemplo.map(mesa => `
                        <tr>
                            <td><strong>${mesa.numero}</strong></td>
                            <td>
                                <span style="color: ${mesa.estado === 'libre' ? 'green' : 'red'};">
                                    ${mesa.estado === 'libre' ? '🟢 Libre' : '🔴 Ocupada'}
                                </span>
                            </td>
                            <td>
                                <button class="btn btn-info" onclick="verQR('${mesa.numero}')">
                                    <i class="fas fa-qrcode"></i> Ver QR
                                </button>
                                <button class="btn btn-success" onclick="descargarQR('${mesa.numero}')">
                                    <i class="fas fa-download"></i> Descargar
                                </button>
                            </td>
                            <td>
                                <button class="btn btn-warning" onclick="cambiarEstadoMesa(${mesa.id}, '${mesa.estado === 'libre' ? 'ocupada' : 'libre'}')">
                                    <i class="fas fa-sync"></i> ${mesa.estado === 'libre' ? 'Ocupar' : 'Liberar'}
                                </button>
                                <button class="btn btn-danger" onclick="eliminarMesa(${mesa.id})">
                                    <i class="fas fa-trash"></i> 
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        
        document.getElementById('lista-mesas').innerHTML = mesasHTML;
        
    } catch (error) {
        console.error('Error cargando mesas:', error);
    }
}

// Control de Pagos
async function cargarPagos() {
    const pagosHTML = `
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #ddd;">
                <div>
                    <strong>Pedido #P102</strong>
                    <div style="font-size: 12px; color: #666;">Delivery - María González</div>
                </div>
                <div>
                    <span class="metodo-transferencia">Transferencia</span>
                    <span style="font-weight: bold; margin-left: 10px;">L. 320.50</span>
                </div>
                <div>
                    <button class="btn btn-success" onclick="confirmarPago(102)">
                        <i class="fas fa-check"></i> Confirmar
                    </button>
                    <button class="btn btn-danger" onclick="rechazarPago(102)">
                        <i class="fas fa-times"></i> Rechazar
                    </button>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px;">
                <div>
                    <strong>Pedido #P105</strong>
                    <div style="font-size: 12px; color: #666;">Para Llevar - Juan Pérez</div>
                </div>
                <div>
                    <span class="metodo-transferencia">Transferencia</span>
                    <span style="font-weight: bold; margin-left: 10px;">L. 129.50</span>
                </div>
                <div>
                    <button class="btn btn-success" onclick="confirmarPago(105)">
                        <i class="fas fa-check"></i> Confirmar
                    </button>
                    <button class="btn btn-danger" onclick="rechazarPago(105)">
                        <i class="fas fa-times"></i> Rechazar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('pagos-pendientes').innerHTML = pagosHTML;
}

// Ventas
async function cargarVentas() {
    // Ya está implementado en el HTML
}

// Funciones de utilidad
function obtenerTextoEstado(estado) {
    const estados = {
        'pendiente': 'Pendiente',
        'preparacion': 'En Preparación',
        'listo': 'Listo para Servir',
        'entregado': 'Entregado',
        'cancelado': 'Cancelado'
    };
    return estados[estado] || estado;
}

function obtenerTextoMetodoPago(metodo) {
    const metodos = {
        'efectivo': 'Efectivo',
        'transferencia': 'Transferencia', 
        'pos': 'POS/Tarjeta'
    };
    return metodos[metodo] || metodo;
}

// Funciones de acción
function cambiarEstadoPedido(pedidoId, nuevoEstado) {
    alert(`Pedido #P${pedidoId} cambiado a: ${obtenerTextoEstado(nuevoEstado)}`);
    // En producción, harías fetch a tu API
    cargarPedidos(); // Recargar lista
}

function cancelarPedido(pedidoId) {
    if (confirm(`¿Estás seguro de cancelar el pedido #P${pedidoId}?`)) {
        alert(`Pedido #P${pedidoId} cancelado`);
        cargarPedidos();
    }
}

function marcarComoPagado(pedidoId) {
    alert(`Pedido #P${pedidoId} marcado como pagado`);
    cargarPedidos();
}

function confirmarPago(pedidoId) {
    alert(`Pago del pedido #P${pedidoId} confirmado`);
    cargarPagos();
}

function rechazarPago(pedidoId) {
    if (confirm(`¿Rechazar pago del pedido #P${pedidoId}?`)) {
        alert(`Pago del pedido #P${pedidoId} rechazado`);
        cargarPagos();
    }
}

function verQR(mesa) {
    const urlCompleta = `${window.location.origin}/menu?mesa=${mesa.split('-')[1]}`;
    alert(`QR para ${mesa}:\n${urlCompleta}\n\nLos clientes pueden escanear este código o visitar el enlace.`);
}

function descargarQR(mesa) {
    alert(`Descargando QR para ${mesa}\n\nEn producción, aquí se generaría y descargaría el código QR.`);
}

function generarQRMesa() {
    const nuevaMesa = prompt('Ingresa el número de la nueva mesa (ej: 07):');
    if (nuevaMesa) {
        alert(`QR generado para MESA-${nuevaMesa}\nURL: ${window.location.origin}/menu?mesa=${nuevaMesa}`);
        cargarMesas();
    }
}

function generarTodosQR() {
    alert('Generando códigos QR para todas las mesas...\n\nEn producción, esto generaría PDFs con todos los QR.');
}

function crearPedidoManual() {
    alert('Abriendo formulario para crear pedido manual...\n\nEn producción, esto abriría un formulario similar al del cliente.');
}

function editarProducto(productoId) {
    alert(`Editando producto ID: ${productoId}\n\nEn producción, esto abriría un formulario de edición.`);
}

function toggleDisponible(productoId) {
    alert(`Cambiando disponibilidad del producto ID: ${productoId}`);
    cargarProductosAdmin();
}

function eliminarProducto(productoId) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        alert(`Producto ID: ${productoId} eliminado`);
        cargarProductosAdmin();
    }
}

function cambiarEstadoMesa(mesaId, nuevoEstado) {
    alert(`Mesa ID: ${mesaId} cambiada a: ${nuevoEstado}`);
    cargarMesas();
}

function eliminarMesa(mesaId) {
    if (confirm('¿Estás seguro de eliminar esta mesa?')) {
        alert(`Mesa ID: ${mesaId} eliminada`);
        cargarMesas();
    }
}

function actualizarPedidos() {
    alert('Actualizando lista de pedidos...');
    cargarPedidos();
}

function actualizarProductos() {
    alert('Actualizando lista de productos...');
    cargarProductosAdmin();
}

console.log('👑 Panel Administrativo de Corrales Restaurant cargado');
