import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ingrese las coordenadas del Punto A (x y): ");
        Punto puntoA = new Punto(scanner.nextDouble(), scanner.nextDouble());

        System.out.println("Ingrese las coordenadas del Punto B (x y): ");
        Punto puntoB = new Punto(scanner.nextDouble(), scanner.nextDouble());

        System.out.println("Ingrese las coordenadas del Punto C (x y): ");
        Punto puntoC = new Punto(scanner.nextDouble(), scanner.nextDouble());

        System.out.println("Ingrese las coordenadas del Punto D (x y): ");
        Punto puntoD = new Punto(scanner.nextDouble(), scanner.nextDouble());

        Cuadrilatero cuadrilatero = new Cuadrilatero(puntoA, puntoB, puntoC, puntoD);
        Trapezoide trapezoide = new Trapezoide(puntoA, puntoB, puntoC, puntoD);
        Paralelogramo paralelogramo = new Paralelogramo(puntoA, puntoB, puntoC, puntoD);
        Rectangulo rectangulo = new Rectangulo(puntoA, puntoB, puntoC, puntoD);
        Cuadrado cuadrado = new Cuadrado(puntoA, puntoB, puntoC, puntoD);

        // Calcular y mostrar áreas
        System.out.println("Área del Cuadrilatero: " + cuadrilatero.calcularArea());
        System.out.println("Área del Trapezoide: " + trapezoide.calcularArea());
        System.out.println("Área del Paralelogramo: " + paralelogramo.calcularArea());
        System.out.println("Área del Rectángulo: " + rectangulo.calcularArea());
        System.out.println("Área del Cuadrado: " + cuadrado.calcularArea());

        // Cierra el Scanner para evitar posibles fugas de recursos
        scanner.close();
    }
}
