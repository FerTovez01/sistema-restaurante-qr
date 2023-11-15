import java.time.LocalDate;

public interface PorPagar {
    double obtenerMontoPago();
}

class Fecha {
    private int dia;
    private int mes;
    private int anio;

    public Fecha(int dia, int mes, int anio) {
        this.dia = dia;
        this.mes = mes;
        this.anio = anio;
    }

    // Métodos de acceso y otros métodos relacionados con la fecha...

    @Override
    public String toString() {
        return String.format("%d/%d/%d", dia, mes, anio);
    }
}
