
public class EmpleadoPorHoras extends Empleado {
    private double horas;
    private double sueldo;

    public EmpleadoPorHoras(String primerNombre, String apellidoPaterno, String numeroSeguroSocial,
                            double sueldoPorHoras, double horasTrabajadas) {
        super(primerNombre, apellidoPaterno, numeroSeguroSocial);
        establecerSueldo(sueldoPorHoras);
        establecerHoras(horasTrabajadas);
    }

    public void establecerSueldo(double sueldoPorHoras) {
        if (sueldoPorHoras >= 0) {
            this.sueldo = sueldoPorHoras;
        } else {
            throw new IllegalArgumentException("El sueldo por horas debe ser mayor o igual a 0.");
        }
    }

    public double obtenerSueldo() {
        return sueldo;
    }

    public void establecerHoras(double horasTrabajadas) {
        if (horasTrabajadas >= 0 && horasTrabajadas <= 168) {
            this.horas = horasTrabajadas;
        } else {
            throw new IllegalArgumentException("Las horas trabajadas deben estar entre 0 y 168.");
        }
    }

    public double obtenerHoras() {
        return horas;
    }

    public double ingresos() {
        if (obtenerHoras() <= 40) {
            return obtenerSueldo() * obtenerHoras();
        } else {
            // Calcula las primeras 40 horas y el tiempo extra con tiempo y medio
            return obtenerSueldo() * 40 + obtenerSueldo() * 1.5 * (obtenerHoras() - 40);
        }
    }

    @Override
    public String toString() {
        return String.format("Empleado por horas: %s%nSueldo por horas: $%.2f%nHoras trabajadas: %.2f",
                             super.toString(), obtenerSueldo(), obtenerHoras());
    }
}

