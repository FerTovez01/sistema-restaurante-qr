public class EmpleadoAsalariado extends Empleado implements PorPagar {
    private double salarioMensual;

    public EmpleadoAsalariado(String primerNombre, String apellidoPaterno, String numeroSeguroSocial, Fecha fechaNacimiento, double salarioMensual) {
        super(primerNombre, apellidoPaterno, numeroSeguroSocial, fechaNacimiento);
        this.salarioMensual = salarioMensual;
    }

    public double obtenerSalarioMensual() {
        return salarioMensual;
    }

    @Override
    public double obtenerMontoPago() {
        return obtenerSalarioMensual();
    }

    @Override
    public String toString() {
        return String.format("Empleado Asalariado: %s%nFecha de nacimiento: %s%nSalario Mensual: $%.2f",
                super.toString(), fechaNacimiento, salarioMensual);
    }
}

