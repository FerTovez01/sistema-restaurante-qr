public class EmpleadoPorHoras extends Empleado {
    private double sueldoPorHora;
    private int horasTrabajadas;

    public EmpleadoPorHoras(String primerNombre, String apellidoPaterno, String numeroSeguroSocial, double sueldoPorHora, int horasTrabajadas) {
        super(primerNombre, apellidoPaterno, numeroSeguroSocial);
        this.sueldoPorHora = sueldoPorHora;
        this.horasTrabajadas = horasTrabajadas;
    }

    @Override
    public double obtenerMontoPago() {
        return sueldoPorHora * horasTrabajadas;
    }

    @Override
    public String toString() {
        return String.format("Empleado por Horas: %s, Sueldo por Hora: $%.2f, Horas Trabajadas: %d",
                super.toString(), sueldoPorHora, horasTrabajadas);
    }
}
