public class Factura implements PorPagar {
    private int numero;
    private String descripcion;
    private int cantidad;
    private double precioPorArticulo;

    public Factura(int numero, String descripcion, int cantidad, double precioPorArticulo) {
        this.numero = numero;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.precioPorArticulo = precioPorArticulo;
    }

    public int obtenerNumero() {
        return numero;
    }

    public String obtenerDescripcion() {
        return descripcion;
    }

    public int obtenerCantidad() {
        return cantidad;
    }

    public double obtenerPrecioPorArticulo() {
        return precioPorArticulo;
    }

    @Override
    public double obtenerMontoPago() {
        return obtenerCantidad() * obtenerPrecioPorArticulo();
    }

    @Override
    public String toString() {
        return String.format("Factura: %d%nDescripción: %s%nCantidad: %d%nPrecio por Artículo: $%.2f",
                obtenerNumero(), obtenerDescripcion(), obtenerCantidad(), obtenerPrecioPorArticulo());
    }
}


