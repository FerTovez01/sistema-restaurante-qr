public class EmpleadoPorHoras extends Empleado implements PorPagar {
    private double sueldoPorHora;
    private int horasTrabajadas;

    public EmpleadoPorHoras(String primerNombre, String apellidoPaterno, String numeroSeguroSocial, Fecha fechaNacimiento, double sueldoPorHora, int horasTrabajadas) {
        super(primerNombre, apellidoPaterno, numeroSeguroSocial, fechaNacimiento);
        this.sueldoPorHora = sueldoPorHora;
        this.horasTrabajadas = horasTrabajadas;
    }

    public double obtenerSueldoPorHora() {
        return sueldoPorHora;
    }

    public int obtenerHorasTrabajadas() {
        return horasTrabajadas;
    }

    @Override
    public double obtenerMontoPago() {
        return obtenerSueldoPorHora() * obtenerHorasTrabajadas();
    }

    @Override
    public String toString() {
        return String.format("Empleado por Horas: %s%nFecha de nacimiento: %s%nSueldo por Hora: $%.2f, Horas Trabajadas: %d",
                super.toString(), fechaNacimiento, sueldoPorHora, horasTrabajadas);
    }
}

