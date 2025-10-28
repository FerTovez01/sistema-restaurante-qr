// Panel Administrativo - Corrales Restaurant (Conectado a BD)
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
    if (seccion === 'dashboard') cargarDashboard();
    if (seccion === 'pedidos') cargarPedidos();
    if (seccion === 'productos') cargarProductosAdmin();
    if (seccion === 'mesas') cargarMesas();
    if (seccion === 'ventas') cargarVentas();
    if (seccion === 'pagos') cargarPagos();
}

// Dashboard con datos reales
async function cargarDashboard() {
    try {
        const response = await fetch('/api/admin/estadisticas');
        const data = await response.json();
        
        // Actualizar estadísticas
        document.getElementById('total-pedidos').textContent = data.ventas_hoy.total_pedidos || 0;
        document.getElementById('total-ventas').textContent = `L. ${(data.ventas_hoy.total_ventas || 0).toFixed(2)}`;
        document.getElementById('mesas-activas').textContent = `${data.mesas_activas.mesas_ocupadas || 0}/8`;
        document.getElementById('pedidos-pendientes').textContent = data.ventas_hoy.en_preparacion || 0;
        
        // Cargar pedidos recientes
        await cargarPedidosRecientes();
        
    } catch (error) {
        console.error('Error cargando dashboard:', error);
        mostrarErrorDashboard();
    }
}

async function cargarPedidosRecientes() {
    try {
        const response = await fetch('/api/admin/pedidos');
        const pedidos = await response.json();
        
        const pedidosRecientesHTML = pedidos.slice(0, 3).map(pedido => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #eee;">
                <div>
                    <strong>Pedido #P${pedido.id}</strong>
                    <div style="font-size: 12px; color: #666;">${pedido.mesa_numero || pedido.tipo_pedido} • L. ${pedido.total.toFixed(2)}</div>
                </div>
                <div>
                    <span class="estado-${pedido.estado}">${obtenerTextoEstado(pedido.estado)}</span>
                    <span style="font-size: 11px; color: #999;">${formatearHora(pedido.created_at)}</span>
                </div>
            </div>
        `).join('');
        
        document.getElementById('pedidos-recientes').innerHTML = pedidosRecientesHTML || '<p>No hay pedidos recientes</p>';
        
    } catch (error) {
        console.error('Error cargando pedidos recientes:', error);
    }
}

// Gestión de Pedidos con datos reales
async function cargarPedidos() {
    try {
        const response = await fetch('/api/admin/pedidos');
        const pedidos = await response.json();
        
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
                    ${pedidos.map(pedido => `
                        <tr>
                            <td><strong>#P${pedido.id}</strong></td>
                            <td>
                                <strong>${pedido.mesa_numero || pedido.tipo_pedido}</strong>
                                ${pedido.cliente_nombre ? `<br><small>${pedido.cliente_nombre}</small>` : ''}
                                <br><small style="color: #666;">${formatearHora(pedido.created_at)}</small>
                            </td>
                            <td>
                                <small>${pedido.total_items || 0} items</small>
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
                                        <i class="fas fa-play" title="Comenzar preparación"></i> 
                                    </button>` : ''}
                                ${pedido.estado === 'preparacion' ? 
                                    `<button class="btn btn-warning" onclick="cambiarEstadoPedido(${pedido.id}, 'listo')">
                                        <i class="fas fa-check" title="Marcar como listo"></i>
                                    </button>` : ''}
                                ${pedido.estado === 'listo' ? 
                                    `<button class="btn btn-info" onclick="cambiarEstadoPedido(${pedido.id}, 'entregado')">
                                        <i class="fas fa-check-circle" title="Marcar como entregado"></i>
                                    </button>` : ''}
                                ${!pedido.pagado ? 
                                    `<button class="btn btn-success" onclick="marcarComoPagado(${pedido.id})">
                                        <i class="fas fa-money-bill" title="Marcar como pagado"></i>
                                    </button>` : ''}
                                <button class="btn btn-danger" onclick="cancelarPedido(${pedido.id})" title="Cancelar pedido">
                                    <i class="fas fa-times"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            ${pedidos.length === 0 ? '<p style="text-align: center; padding: 20px;">No hay pedidos activos</p>' : ''}
        `;
        
        document.getElementById('lista-pedidos').innerHTML = pedidosHTML;
        
    } catch (error) {
        console.error('Error cargando pedidos:', error);
        document.getElementById('lista-pedidos').innerHTML = '<p style="text-align: center; padding: 20px; color: #e74c3c;">Error cargando pedidos</p>';
    }
}

// Gestión de Productos con datos reales
async function cargarProductosAdmin() {
    try {
        const response = await fetch('/api/admin/productos');
        const productos = await response.json();
        
        const productosHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Vendidos</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${productos.map(producto => `
                        <tr>
                            <td>
                                <strong>${producto.nombre}</strong>
                                ${producto.destacado ? ' <span style="color: gold;">⭐</span>' : ''}
                            </td>
                            <td><strong>L. ${producto.precio.toFixed(2)}</strong></td>
                            <td>${producto.categoria_nombre}</td>
                            <td>${producto.total_vendido || 0}</td>
                            <td>
                                <span style="color: ${producto.disponible ? 'green' : 'red'};">
                                    ${producto.disponible ? '🟢 Disponible' : '🔴 No Disponible'}
                                </span>
                            </td>
                            <td>
                                <button class="btn btn-info" onclick="editarProducto(${producto.id})" title="Editar producto">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-warning" onclick="toggleDisponible(${producto.id}, ${!producto.disponible})" title="${producto.disponible ? 'Desactivar' : 'Activar'} producto">
                                    <i class="fas fa-power-off"></i>
                                </button>
                                <button class="btn btn-danger" onclick="eliminarProducto(${producto.id})" title="Eliminar producto">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            ${productos.length === 0 ? '<p style="text-align: center; padding: 20px;">No hay productos registrados</p>' : ''}
        `;
        
        document.getElementById('lista-productos-admin').innerHTML = productosHTML;
        
    } catch (error) {
        console.error('Error cargando productos:', error);
    }
}

// Reportes de Ventas con datos reales
async function cargarVentas() {
    try {
        const response = await fetch('/api/admin/reporte-ventas?periodo=hoy');
        const reporte = await response.json();
        
        const ventasHTML = `
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-top: 15px;">
                <div>
                    <h4>Ventas del Día</h4>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                        <p><strong>Total Ventas:</strong> L. ${(reporte.resumen.total_ventas || 0).toFixed(2)}</p>
                        <p><strong>Pedidos Totales:</strong> ${reporte.resumen.total_pedidos || 0}</p>
                        <p><strong>Ticket Promedio:</strong> L. ${(reporte.resumen.ticket_promedio || 0).toFixed(2)}</p>
                        <p><strong>Pedidos Pagados:</strong> ${reporte.resumen.pedidos_pagados || 0}</p>
                        <p><strong>Pendientes de Pago:</strong> ${reporte.resumen.pedidos_pendientes_pago || 0}</p>
                    </div>
                </div>
                <div>
                    <h4>Productos Más Vendidos</h4>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; max-height: 300px; overflow-y: auto;">
                        ${reporte.productos_mas_vendidos.map((producto, index) => `
                            <p>${index + 1}. ${producto.nombre} (${producto.total_vendido} ventas)<br>
                            <small style="color: #666;">L. ${producto.total_ingresos.toFixed(2)}</small></p>
                        `).join('')}
                        ${reporte.productos_mas_vendidos.length === 0 ? '<p>No hay ventas hoy</p>' : ''}
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <h4>Mesas Más Activas</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 10px;">
                    ${reporte.mesas_activas.map(mesa => `
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                            <strong>${mesa.numero}</strong>
                            <p style="margin: 5px 0; font-size: 12px;">${mesa.total_pedidos} pedidos</p>
                            <p style="margin: 0; font-weight: bold; color: #27ae60;">L. ${mesa.total_ventas.toFixed(2)}</p>
                        </div>
                    `).join('')}
                    ${reporte.mesas_activas.length === 0 ? '<p>No hay actividad en mesas hoy</p>' : ''}
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <button class="btn btn-success" onclick="exportarReporte('excel')">
                    <i class="fas fa-file-excel"></i> Exportar a Excel
                </button>
                <button class="btn btn-info" onclick="exportarReporte('pdf')">
                    <i class="fas fa-file-pdf"></i> Generar PDF
                </button>
                <button class="btn btn-warning" onclick="cambiarPeriodoVentas()">
                    <i class="fas fa-calendar"></i> Cambiar Período
                </button>
            </div>
        `;
        
        document.getElementById('reporte-ventas').innerHTML = ventasHTML;
        
    } catch (error) {
        console.error('Error cargando ventas:', error);
        document.getElementById('reporte-ventas').innerHTML = '<p style="text-align: center; padding: 20px; color: #e74c3c;">Error cargando reporte de ventas</p>';
    }
}

// Control de Pagos con datos reales
async function cargarPagos() {
    try {
        const response = await fetch('/api/admin/pagos-pendientes');
        const pagosPendientes = await response.json();
        
        const pagosHTML = `
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                ${pagosPendientes.map(pago => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #ddd;">
                        <div>
                            <strong>Pedido #P${pago.id}</strong>
                            <div style="font-size: 12px; color: #666;">
                                ${pago.mesa_numero || pago.tipo_pedido} 
                                ${pago.cliente_nombre ? `- ${pago.cliente_nombre}` : ''}
                            </div>
                        </div>
                        <div>
                            <span class="metodo-${pago.metodo_pago}">${obtenerTextoMetodoPago(pago.metodo_pago)}</span>
                            <span style="font-weight: bold; margin-left: 10px;">L. ${pago.total.toFixed(2)}</span>
                        </div>
                        <div>
                            <button class="btn btn-success" onclick="confirmarPago(${pago.id})">
                                <i class="fas fa-check"></i> Confirmar
                            </button>
                            <button class="btn btn-danger" onclick="rechazarPago(${pago.id})">
                                <i class="fas fa-times"></i> Rechazar
                            </button>
                        </div>
                    </div>
                `).join('')}
                ${pagosPendientes.length === 0 ? 
                    '<p style="text-align: center; padding: 20px; color: #27ae60;">No hay pagos pendientes</p>' : ''}
            </div>
        `;
        
        document.getElementById('pagos-pendientes').innerHTML = pagosHTML;
        
    } catch (error) {
        console.error('Error cargando pagos:', error);
    }
}

// Gestión de Mesas (mantiene datos de ejemplo por ahora)
async function cargarMesas() {
    try {
        const response = await fetch('/api/mesas');
        const mesas = await response.json();
        
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
                    ${mesas.map(mesa => `
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
                                ${mesa.activa ? `
                                <button class="btn btn-danger" onclick="desactivarMesa(${mesa.id})">
                                    <i class="fas fa-trash"></i> 
                                </button>
                                ` : `
                                <button class="btn btn-success" onclick="activarMesa(${mesa.id})">
                                    <i class="fas fa-check"></i> 
                                </button>
                                `}
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

// ===== FUNCIONES DE UTILIDAD =====

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

function formatearHora(fechaString) {
    const fecha = new Date(fechaString);
    return fecha.toLocaleTimeString('es-HN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}

function formatearPrecio(precio) {
    return `L. ${parseFloat(precio).toFixed(2)}`;
}

// ===== FUNCIONES DE ACCIÓN (Conectadas a la API) =====

async function cambiarEstadoPedido(pedidoId, nuevoEstado) {
    try {
        const response = await fetch(`/api/admin/pedidos/${pedidoId}/estado`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado: nuevoEstado })
        });
        
        if (response.ok) {
            alert(`Pedido #P${pedidoId} cambiado a: ${obtenerTextoEstado(nuevoEstado)}`);
            cargarPedidos();
            cargarDashboard();
        } else {
            throw new Error('Error en el servidor');
        }
    } catch (error) {
        console.error('Error cambiando estado:', error);
        alert('Error al cambiar el estado del pedido');
    }
}

async function marcarComoPagado(pedidoId) {
    try {
        const response = await fetch(`/api/admin/pedidos/${pedidoId}/pagar`, {
            method: 'PUT'
        });
        
        if (response.ok) {
            alert(`Pedido #P${pedidoId} marcado como pagado`);
            cargarPedidos();
            cargarPagos();
            cargarDashboard();
        } else {
            throw new Error('Error en el servidor');
        }
    } catch (error) {
        console.error('Error marcando como pagado:', error);
        alert('Error al marcar el pedido como pagado');
    }
}

async function confirmarPago(pedidoId) {
    await marcarComoPagado(pedidoId);
}

async function rechazarPago(pedidoId) {
    if (confirm(`¿Rechazar pago del pedido #P${pedidoId}?`)) {
        alert(`Pago del pedido #P${pedidoId} rechazado - Contactar al cliente`);
        cargarPagos();
    }
}

async function cancelarPedido(pedidoId) {
    if (confirm(`¿Estás seguro de cancelar el pedido #P${pedidoId}?`)) {
        await cambiarEstadoPedido(pedidoId, 'cancelado');
    }
}

// Funciones de Mesas
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

// Funciones de Productos
function editarProducto(productoId) {
    alert(`Editando producto ID: ${productoId}\n\nEn producción, esto abriría un formulario de edición.`);
}

async function toggleDisponible(productoId, nuevoEstado) {
    try {
        // Aquí iría la llamada a la API para cambiar disponibilidad
        alert(`Producto ID: ${productoId} - ${nuevoEstado ? 'Activado' : 'Desactivado'}`);
        cargarProductosAdmin();
    } catch (error) {
        console.error('Error cambiando disponibilidad:', error);
    }
}

function eliminarProducto(productoId) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        alert(`Producto ID: ${productoId} eliminado`);
        cargarProductosAdmin();
    }
}

// Funciones de Mesas
async function cambiarEstadoMesa(mesaId, nuevoEstado) {
    try {
        // Aquí iría la llamada a la API para cambiar estado de mesa
        alert(`Mesa ID: ${mesaId} cambiada a: ${nuevoEstado}`);
        cargarMesas();
        cargarDashboard();
    } catch (error) {
        console.error('Error cambiando estado de mesa:', error);
    }
}

async function desactivarMesa(mesaId) {
    if (confirm('¿Estás seguro de desactivar esta mesa?')) {
        alert(`Mesa ID: ${mesaId} desactivada`);
        cargarMesas();
    }
}

async function activarMesa(mesaId) {
    alert(`Mesa ID: ${mesaId} activada`);
    cargarMesas();
}

// Funciones de utilidad
function crearPedidoManual() {
    alert('Abriendo formulario para crear pedido manual...\n\nEn producción, esto abriría un formulario similar al del cliente.');
}

function actualizarPedidos() {
    cargarPedidos();
}

function actualizarProductos() {
    cargarProductosAdmin();
}

function exportarReporte(formato) {
    alert(`Exportando reporte en formato ${formato.toUpperCase()}...\n\nEn producción, esto generaría un archivo descargable.`);
}

function cambiarPeriodoVentas() {
    const periodo = prompt('Selecciona período (hoy/semana/mes):', 'hoy');
    if (periodo) {
        alert(`Cambiando período a: ${periodo}\n\nEn producción, esto recargaría el reporte con el nuevo período.`);
    }
}

function mostrarErrorDashboard() {
    document.getElementById('total-pedidos').textContent = '0';
    document.getElementById('total-ventas').textContent = 'L. 0.00';
    document.getElementById('mesas-activas').textContent = '0/8';
    document.getElementById('pedidos-pendientes').textContent = '0';
    document.getElementById('pedidos-recientes').innerHTML = '<p>Error cargando datos</p>';
}

console.log('👑 Panel Administrativo de Corrales Restaurant cargado - Conectado a BD');
