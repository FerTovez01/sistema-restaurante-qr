public class EmpleadoAsalariado extends Empleado {
    private double salarioMensual;

    public EmpleadoAsalariado(String nombre, Fecha fechaNacimiento, double salarioMensual) {
        super(nombre, fechaNacimiento);
        this.salarioMensual = salarioMensual;
    }

    @Override
    public double calcularPago() {
        return salarioMensual + calcularBonificacion();
    }
}
