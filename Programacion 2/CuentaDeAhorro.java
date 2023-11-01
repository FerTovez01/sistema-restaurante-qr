public class CuentaDeAhorros {
    private static double tasaInteresAnual = 0.0;
    private double saldoAhorros; 

    public CuentaDeAhorros(double saldoAhorros) {
        this.saldoAhorros = saldoAhorros;
    } 

    public double calcularInteresMensual() {
        double interesMensual = (saldoAhorros * tasaInteresAnual) / 12;
        saldoAhorros += interesMensual;
        return interesMensual;
    } 

    public static void modificarTasaInteres(double nuevaTasa) {
        tasaInteresAnual = nuevaTasa;
    } 

    public static void main(String[] args) {
        CuentaDeAhorros.modificarTasaInteres(0.04);  // Establecer la tasa de interés al 4% 

        CuentaDeAhorros ahorrador1 = new CuentaDeAhorros(2000.00);
        CuentaDeAhorros ahorrador2 = new CuentaDeAhorros(3000.00); 

        for (int mes = 1; mes <= 12; mes++) {
            double interes1 = ahorrador1.calcularInteresMensual();
            double interes2 = ahorrador2.calcularInteresMensual();
            System.out.println("Mes " + mes + ":");
            System.out.printf("Saldo de ahorrador1: $%.2f (Interés mensual: $%.2f)%n", ahorrador1.saldoAhorros, interes1);
            System.out.printf("Saldo de ahorrador2: $%.2f (Interés mensual: $%.2f)%n", ahorrador2.saldoAhorros, interes2);
        } 

        CuentaDeAhorros.modificarTasaInteres(0.05);  // Establecer la tasa de interés al 5% 

        double interes1 = ahorrador1.calcularInteresMensual();
        double interes2 = ahorrador2.calcularInteresMensual(); 

        System.out.println("\nDespués de cambiar la tasa de interés:");
        System.out.printf("Saldo de ahorrador1: $%.2f (Interés mensual: $%.2f)%n", ahorrador1.saldoAhorros, interes1);
        System.out.printf("Saldo de ahorrador2: $%.2f (Interés mensual: $%.2f)%n", ahorrador2.saldoAhorros, interes2);
    }
}