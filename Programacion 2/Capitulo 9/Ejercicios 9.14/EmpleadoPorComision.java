// EmpleadoPorComision.java
public class EmpleadoPorComision extends Empleado {
    private double ventasBrutas;
    private double tarifaComision;

    public EmpleadoPorComision(String primerNombre, String apellidoPaterno, String numeroSeguroSocial,
                               double ventasBrutas, double tarifaComision) {
        super(primerNombre, apellidoPaterno, numeroSeguroSocial);
        establecerVentasBrutas(ventasBrutas);
        establecerTarifaComision(tarifaComision);
    }

    public void establecerVentasBrutas(double ventasBrutas) {
        if (ventasBrutas >= 0.0) {
            this.ventasBrutas = ventasBrutas;
        } else {
            throw new IllegalArgumentException("Las ventas brutas deben ser mayores o iguales a 0.0");
        }
    }

    public double obtenerVentasBrutas() {
        return ventasBrutas;
    }

    public void establecerTarifaComision(double tarifaComision) {
        if (tarifaComision > 0.0 && tarifaComision < 1.0) {
            this.tarifaComision = tarifaComision;
        } else {
            throw new IllegalArgumentException("La tarifa de comisión debe ser mayor que 0.0 y menor que 1.0");
        }
    }

    public double obtenerTarifaComision() {
        return tarifaComision;
    }

    
    public double ingresos() {
        return obtenerTarifaComision() * obtenerVentasBrutas();
    }

    @Override
    public String toString() {
        return String.format("%s%nVentas Brutas: %.2f%nTarifa de Comisión: %.2f",
                             super.toString(), obtenerVentasBrutas(), obtenerTarifaComision());
    }
}
