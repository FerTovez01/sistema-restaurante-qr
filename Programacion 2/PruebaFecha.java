class Fecha {
    private int mes;
    private int dia;
    private int año;

    public Fecha(int mes, int dia, int año) {
        this.mes = mes;
        this.dia = dia;
        this.año = año;
    }

    public void establecerMes(int mes) {
        this.mes = mes;
    }

    public void establecerDia(int dia) {
        this.dia = dia;
    }

    public void establecerAño(int año) {
        this.año = año;
    }

    public int obtenerMes() {
        return mes;
    }

    public int obtenerDia() {
        return dia;
    }

    public int obtenerAño() {
        return año;
    }

    public void mostrarFecha() {
        System.out.printf("%d/%d/%d%n", mes, dia, año);
    }
}

public class PruebaFecha {
    public static void main(String[] args) {
        // Crear dos objetos Fecha
        Fecha fecha1 = new Fecha(9, 1, 2023);
        Fecha fecha2 = new Fecha(9, 15, 2023);

        // Mostrar las fechas
        System.out.print("Fecha 1: ");
        fecha1.mostrarFecha();
        System.out.print("Fecha 2: ");
        fecha2.mostrarFecha();

        // Calcular la diferencia en días
        long diferenciaEnDias = calcularDiferenciaEnDias(fecha1, fecha2);
        System.out.println("La diferencia en días entre las fechas es: " + diferenciaEnDias + " días");
    }

    public static long calcularDiferenciaEnDias(Fecha fecha1, Fecha fecha2) {
        java.time.LocalDate localDate1 = java.time.LocalDate.of(fecha1.obtenerAño(), fecha1.obtenerMes(), fecha1.obtenerDia());
        java.time.LocalDate localDate2 = java.time.LocalDate.of(fecha2.obtenerAño(), fecha2.obtenerMes(), fecha2.obtenerDia());

        return java.time.temporal.ChronoUnit.DAYS.between(localDate1, localDate2);
    }
}
