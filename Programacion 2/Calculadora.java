// 2.15) Escriba un programa que pida al usuario que escriba dos números,
//que obtenga los números del usuario e imprima la suma, producto, diferencia y cocientede los números.
 
import java.util.Scanner;

public class Calculadora {
    public static void main(String[] args) {
        int x, y, suma, resta, producto, cociente;
        
        Scanner entrada = new Scanner(System.in);

        // Solicitar al usuario que ingrese dos números enteros
        System.out.print("Digite el primer número entero: ");
        x = entrada.nextInt();
        System.out.print("Digite el segundo número entero: ");
        y = entrada.nextInt();

        // Realizar las operaciones matemáticas
        suma = x + y;
        resta = x - y;
        producto = x * y;
        
        // Verificar si y no es cero antes de la división
        if (y != 0) {
            cociente = x / y;
            System.out.printf("El cociente de %d / %d = %d\n", x, y, cociente);
        } else {
            System.out.println("No se puede dividir por cero.");
        }

        // Mostrar los resultados de las operaciones
        System.out.printf("La suma de %d + %d = %d\n", x, y, suma);
        System.out.printf("La diferencia de %d - %d = %d\n", x, y, resta);
        System.out.printf("El producto de %d * %d = %d\n", x, y, producto);

        // Cerrar el scanner
        entrada.close();
    }
}

 
 
 
 
 
 
 
 
 