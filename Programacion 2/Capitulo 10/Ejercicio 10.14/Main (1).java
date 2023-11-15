import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Obtener datos del usuario para EmpleadoPorComision
        System.out.print("Primer Nombre: ");
        String primerNombre = scanner.nextLine();
        System.out.print("Apellido Paterno: ");
        String apellidoPaterno = scanner.nextLine();
        System.out.print("Número de Seguro Social: ");
        String numeroSeguroSocial = scanner.nextLine();
        System.out.print("Ventas Brutas: ");
        double ventasBrutas = scanner.nextDouble();
        System.out.print("Tarifa de Comisión: ");
        double tarifaComision = scanner.nextDouble();

        // Crear instancia de EmpleadoPorComision
        EmpleadoPorComision empleado2 = new EmpleadoPorComision(primerNombre, apellidoPaterno, numeroSeguroSocial, ventasBrutas, tarifaComision);

        // Mostrar información de EmpleadoPorComision
        System.out.println("\nInformación del Empleado:\n" + empleado2);

        scanner.close(); // Cerrar el Scanner al final
    }
}

