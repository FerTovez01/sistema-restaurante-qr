// EmpleadoBaseMasComision.java
public class EmpleadoBaseMasComision extends EmpleadoPorComision {
    private double salarioBase;

    public EmpleadoBaseMasComision(String primerNombre, String apellidoPaterno, String numeroSeguroSocial,
                                   double ventasBrutas, double tarifaComision, double salarioBase) {
        super(primerNombre, apellidoPaterno, numeroSeguroSocial, ventasBrutas, tarifaComision);
        establecerSalarioBase(salarioBase);
    }

    public void establecerSalarioBase(double salarioBase) {
        if (salarioBase >= 0.0) {
            this.salarioBase = salarioBase;
        } else {
            throw new IllegalArgumentException("El salario base debe ser mayor o igual a 0.0");
        }
    }

    public double obtenerSalarioBase() {
        return salarioBase;
    }

    public double ingresos() {
        // Calcula los ingresos sumando el salario base y las ventas brutas multiplicadas por la tarifa de comisión
        return obtenerSalarioBase() + super.ingresos();
    }

    @Override
    public String toString() {
        return String.format("%s%nSalario Base: %.2f", super.toString(), obtenerSalarioBase());
    }
}
