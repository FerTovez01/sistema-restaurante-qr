import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Obtener datos para el primer empleado
        System.out.println("Ingrese el nombre del primer empleado:");
        String nombre1 = scanner.nextLine();

        System.out.println("Ingrese la fecha de nacimiento del primer empleado (en el formato dd/mm/aaaa):");
        String fechaNacimiento1Str = scanner.nextLine();
        String[] fechaNacimiento1Array = fechaNacimiento1Str.split("/");
        Fecha fechaNacimiento1 = new Fecha(Integer.parseInt(fechaNacimiento1Array[0]),
                                          Integer.parseInt(fechaNacimiento1Array[1]),
                                          Integer.parseInt(fechaNacimiento1Array[2]));

        System.out.println("Ingrese el salario mensual del primer empleado:");
        double salarioMensual1 = scanner.nextDouble();
        scanner.nextLine(); // Consumir la nueva línea pendiente

        // Obtener datos para el segundo empleado
        System.out.println("Ingrese el nombre del segundo empleado:");
        String nombre2 = scanner.nextLine();

        System.out.println("Ingrese la fecha de nacimiento del segundo empleado (en el formato dd/mm/aaaa):");
        String fechaNacimiento2Str = scanner.nextLine();
        String[] fechaNacimiento2Array = fechaNacimiento2Str.split("/");
        Fecha fechaNacimiento2 = new Fecha(Integer.parseInt(fechaNacimiento2Array[0]),
                                          Integer.parseInt(fechaNacimiento2Array[1]),
                                          Integer.parseInt(fechaNacimiento2Array[2]));

        System.out.println("Ingrese el salario mensual del segundo empleado:");
        double salarioMensual2 = scanner.nextDouble();
        scanner.nextLine(); // Consumir la nueva línea pendiente

        // Crear instancias de EmpleadoAsalariado con los datos ingresados
        EmpleadoAsalariado empleado1 = new EmpleadoAsalariado(nombre1, fechaNacimiento1, salarioMensual1);
        EmpleadoAsalariado empleado2 = new EmpleadoAsalariado(nombre2, fechaNacimiento2, salarioMensual2);

        // Crear un arreglo de empleados
        Empleado[] empleados = { empleado1, empleado2 };

        // Calcular la nómina para cada empleado y mostrarla
        for (Empleado empleado : empleados) {
            System.out.println(empleado);
            System.out.printf("Pago: $%.2f%n", empleado.calcularPago());
            System.out.println("---------------------------");
        }

        // Cerrar el scanner al final
        scanner.close();
    }
}

