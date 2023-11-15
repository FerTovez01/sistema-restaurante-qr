public class EmpleadoBaseMasComision extends EmpleadoPorComision {
    private double salarioBase;

    public EmpleadoBaseMasComision(String primerNombre, String apellidoPaterno, String numeroSeguroSocial, double ventasBrutas, double tarifaComision, double salarioBase) {
        super(primerNombre, apellidoPaterno, numeroSeguroSocial, ventasBrutas, tarifaComision);
        this.salarioBase = salarioBase;
    }

    @Override
    public double obtenerMontoPago() {
        return salarioBase + super.obtenerMontoPago();
    }

    @Override
    public String toString() {
        return String.format("Empleado Base más Comisión: %s, Salario Base: $%.2f",
                super.toString(), salarioBase);
    }
}
