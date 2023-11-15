public class Main {
    public static void main(String[] args) {
        // Crea instancias de las subclases de Empleado
        EmpleadoAsalariado empleado1 = new EmpleadoAsalariado("John", "Doe", "123-45-6789", 2000.00);
        EmpleadoPorHoras empleado2 = new EmpleadoPorHoras("Jane", "Doe", "987-65-4321", 15.00, 40);
        EmpleadoPorComision empleado3 = new EmpleadoPorComision("Bob", "Ross", "345-67-8901", 5000.00, 0.05);
        EmpleadoBaseMasComision empleado4 = new EmpleadoBaseMasComision("Alice", "Johnson", "567-89-0123", 8000.00, 0.03, 2000.00);

        
        PorPagar[] cuentasPorPagar = { empleado1, empleado2, empleado3, empleado4 };

        for (PorPagar cuenta : cuentasPorPagar) {
            System.out.println(cuenta);
            System.out.printf("Monto a pagar: $%.2f%n", cuenta.obtenerMontoPago());
            System.out.println();
        }
    }
}

