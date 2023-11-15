import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Entrada para EmpleadoPorComision
        System.out.println("Ingrese la información para EmpleadoPorComision:");
        System.out.print("Primer Nombre: ");
        String primerNombre1 = scanner.next();
        System.out.print("Apellido Paterno: ");
        String apellidoPaterno1 = scanner.next();
        System.out.print("Número de Seguro Social: ");
        String numeroSeguroSocial1 = scanner.next();
        System.out.print("Ventas Brutas: ");
        double ventasBrutas1 = scanner.nextDouble();
        System.out.print("Tarifa de Comisión: ");
        double tarifaComision1 = scanner.nextDouble();

        EmpleadoPorComision empleado1 = new EmpleadoPorComision(primerNombre1, apellidoPaterno1, numeroSeguroSocial1,
                ventasBrutas1, tarifaComision1);

        // Entrada para EmpleadoBaseMasComision
        System.out.println("\nIngrese la información para EmpleadoBaseMasComision:");
        System.out.print("Primer Nombre: ");
        String primerNombre2 = scanner.next();
        System.out.print("Apellido Paterno: ");
        String apellidoPaterno2 = scanner.next();
        System.out.print("Número de Seguro Social: ");
        String numeroSeguroSocial2 = scanner.next();
        System.out.print("Ventas Brutas: ");
        double ventasBrutas2 = scanner.nextDouble();
        System.out.print("Tarifa de Comisión: ");
        double tarifaComision2 = scanner.nextDouble();
        System.out.print("Salario Base: ");
        double salarioBase2 = scanner.nextDouble();

        EmpleadoBaseMasComision empleado2 = new EmpleadoBaseMasComision(primerNombre2, apellidoPaterno2, numeroSeguroSocial2,
                ventasBrutas2, tarifaComision2, salarioBase2);

        scanner.close();

        // Muestra la información de los empleados
        System.out.println("\nInformación del EmpleadoPorComision:");
        System.out.println(empleado1);

        System.out.println("\nInformación del EmpleadoBaseMasComision:");
        System.out.println(empleado2);
        System.out.printf("Ingresos totales: %.2f%n", empleado2.ingresos());
    }
}
