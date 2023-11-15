import java.util.Date;

public class Main {
    public static void main(String[] args) {
        Fecha fechaNacimiento1 = new Fecha(1, 1, 1990);
        Fecha fechaNacimiento2 = new Fecha(5, 5, 1995);

        EmpleadoAsalariado empleado1 = new EmpleadoAsalariado("John", "Doe", "123-45-6789", fechaNacimiento1, 2000.00);
        EmpleadoPorHoras empleado2 = new EmpleadoPorHoras("Jane", "Doe", "987-65-4321", fechaNacimiento2, 15.00, 40);

        Factura factura1 = new Factura(1, "Producto 1", 5, 10.00);
        Factura factura2 = new Factura(2, "Producto 2", 3, 8.50);

        PorPagar[] cuentasPorPagar = { empleado1, empleado2, factura1, factura2 };

        for (PorPagar cuenta : cuentasPorPagar) {
            System.out.println(cuenta);
            System.out.printf("Monto a pagar: $%.2f%n", cuenta.obtenerMontoPago());
            System.out.println();
        }
    }
}

