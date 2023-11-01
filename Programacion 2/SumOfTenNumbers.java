import java.util.Scanner;

public class SumOfTenNumbers {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int sum = 0;
        int count = 0;

        while (count < 10) {
            System.out.print("Ingrese un número positivo: ");
            int number = scanner.nextInt();

            if (number > 0) {
                sum += number;
                count++;
            } else {
                System.out.println("El número no es positivo. Intente nuevamente.");
            }
        }

        System.out.println("La suma de los 10 números positivos es: " + sum);
    }
}

