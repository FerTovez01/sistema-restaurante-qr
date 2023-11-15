// Empleado.java
public abstract class Empleado {
    private String nombre;
    private Fecha fechaNacimiento;

    public Empleado(String nombre, Fecha fechaNacimiento) {
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
    }

    public abstract double calcularPago(); // Método abstracto para calcular el pago

    public double calcularBonificacion() {
        // Obtener el mes actual
        int mesActual = Fecha.obtenerFechaActual().obtenerMes();

        // Verificar si es el mes de cumpleaños
        if (mesActual == fechaNacimiento.obtenerMes()) {
            return 100.00; // Bonificación de $100.00 en el mes de cumpleaños
        } else {
            return 0.00;
        }
    }

    @Override
    public String toString() {
        return String.format("Nombre: %s%nFecha de Nacimiento: %s", nombre, fechaNacimiento);
    }
}

 