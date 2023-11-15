// PruebaNomina.java
public class PruebaNomina {
    public static void main(String[] args) {
        Fecha fechaNacimiento1 = new Fecha(25, 11, 1990);
        EmpleadoAsalariado empleado1 = new EmpleadoAsalariado("Juan", fechaNacimiento1, 2000.0);

        Fecha fechaNacimiento2 = new Fecha(14, 11, 1985);
        EmpleadoAsalariado empleado2 = new EmpleadoAsalariado("María", fechaNacimiento2, 2500.0);

        Empleado[] empleados = { empleado1, empleado2 };

        // Calcular la nómina para cada empleado
        for (Empleado empleado : empleados) {
            System.out.println(empleado);
            System.out.printf("Pago: $%.2f%n", empleado.calcularPago());
            System.out.println("---------------------------");
        }
    }
}
