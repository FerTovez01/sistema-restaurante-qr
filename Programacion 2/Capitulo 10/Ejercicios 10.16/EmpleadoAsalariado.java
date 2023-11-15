public class EmpleadoAsalariado extends Empleado implements PorPagar  {
    private double salarioMensual;

    public EmpleadoAsalariado(String primerNombre, String apellidoPaterno, String numeroSeguroSocial, double salarioMensual) {
        super(primerNombre, apellidoPaterno, numeroSeguroSocial);
        this.salarioMensual = salarioMensual;
    }

    @Override
    public double obtenerMontoPago() {
        return salarioMensual;
    }

    @Override
    public String toString() {
        return String.format("Empleado Asalariado: %s, Salario Mensual: $%.2f",
                super.toString(), salarioMensual);
    }
}
