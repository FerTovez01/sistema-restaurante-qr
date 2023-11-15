public class EmpleadoAsalariado extends Empleado {
    private double salarioMensual;

    public EmpleadoAsalariado(String primerNombre, String apellidoPaterno, String numeroSeguroSocial, double salarioMensual) {
        super(primerNombre, apellidoPaterno, numeroSeguroSocial);
        this.salarioMensual = salarioMensual;
    }

    public double getSalarioMensual() {
        return salarioMensual;
    }

    public void setSalarioMensual(double salarioMensual) {
        this.salarioMensual = salarioMensual;
    }

    @Override
    public String toString() {
        return String.format("Empleado Asalariado: %s\nSalario Mensual: $%.2f", super.toString(), salarioMensual);
    }
}
