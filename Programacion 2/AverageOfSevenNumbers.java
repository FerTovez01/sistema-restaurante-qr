import java.util.Scanner;

public class AverageOfSevenNumbers {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int sum = 0;

        for (int i = 0; i < 7; i++) {
            System.out.print("Ingrese un número: ");
            int number = scanner.nextInt();
            sum += number;
        }

        double average = (double) sum / 7;
        System.out.println("El promedio de los siete números es: " + average);
    }
}
