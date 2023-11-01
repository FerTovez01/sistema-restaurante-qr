import java.util.Scanner;

public class FindLargestNumber {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Ingrese cuántos números desea procesar: ");
        int count = scanner.nextInt();
        
        if (count <= 0) {
            System.out.println("Debe ingresar al menos un número.");
            return;
        }
        
        System.out.print("Ingrese el primer número: ");
        int largest = scanner.nextInt();
        
        for (int i = 1; i < count; i++) {
            System.out.print("Ingrese el siguiente número: ");
            int number = scanner.nextInt();
            
            if (number > largest) {
                largest = number;
            }
        }
        
        System.out.println("El número más grande es: " + largest);
    }
}
