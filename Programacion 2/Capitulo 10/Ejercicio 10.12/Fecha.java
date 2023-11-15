// Fecha.java
public class Fecha {
    private int dia;
    private int mes;
    private int año;

    public Fecha(int dia, int mes, int año) {
        this.dia = dia;
        this.mes = mes;
        this.año = año;
    }

    public static Fecha obtenerFechaActual() {
        // Simulación de obtener la fecha actual (puede implementarse de acuerdo al entorno)
        return new Fecha(14, 11, 2023);
    }

    public int obtenerMes() {
        return mes;
    }

    @Override
    public String toString() {
        return String.format("%02d/%02d/%04d", dia, mes, año);
    }
}
