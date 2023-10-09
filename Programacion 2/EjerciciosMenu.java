import java.util.Scanner;
import java.util.Arrays;

public class EjerciciosMenu {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int choice;

        do {
            // Mostrar las opciones del menú
            System.out.println("Menú de Ejercicios:");
            System.out.println("1. Cuadrado de asteriscos");
            System.out.println("2. Palíndromos");
            System.out.println("3. Convertir binario a decimal");
            System.out.println("4. Patrón de tablero de damas");
            System.out.println("5. Múltiplos de 2 (Ciclo infinito)");
            System.out.println("6. ¿Qué está mal en este código?");
            System.out.println("7. Lados de un triángulo");
            System.out.println("8. Triángulo rectángulo");
            System.out.println("9. Factorial");
            System.out.println("10. Kilometraje de gasolina");
            System.out.println("11. Salir");

            // Leer la elección del usuario
            System.out.print("Ingrese el número del ejercicio que desea ejecutar: ");
            choice = scanner.nextInt();

            // Ejecutar el ejercicio seleccionado
            switch (choice) {
                case 1:
                    cuadradoDeAsteriscos();
                    break;
                case 2:
                    verificarPalindromo(scanner);
                    break;
                case 3:
                    convertirBinarioADecimal(scanner);
                    break;
                case 4:
                    patronTableroDamas();
                    break;
                case 5:
                    mostrarMultiplosDeDosInfinito();
                    break;
                case 6:
                    System.out.println("La instrucción es incorrecta. No se puede hacer un incremento prefix (++(x + y)).");
                    break;
                case 7:
                    verificarTriangulo(scanner);
                    break;
                case 8:
                    verificarTrianguloRectangulo(scanner);
                    break;
                case 9:
                    calcularFactorial(scanner);
                    break;
                case 10:
                    calcularKilometraje(scanner);
                    break;
                case 11:
                    System.out.println("Saliendo del programa.");
                    break;
                default:
                    System.out.println("Opción no válida. Por favor, ingrese una opción válida.");
                    break;
            }
        } while (choice != 11);

        // Cerrar el scanner al final
        scanner.close();
    }

    // Ejercicio 1: Cuadrado de asteriscos
    public static void cuadradoDeAsteriscos() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Ingrese el tamaño del lado del cuadrado (1-20): ");
        int lado = scanner.nextInt();

        if (lado >= 1 && lado <= 20) {
            for (int i = 0; i < lado; i++) {
                for (int j = 0; j < lado; j++) {
                    if (i == 0 || i == lado - 1 || j == 0 || j == lado - 1) {
                        System.out.print("*");
                    } else {
                        System.out.print(" ");
                    }
                }
                System.out.println();
            }
        } else {
            System.out.println("Tamaño del lado fuera del rango válido.");
        }

        scanner.close();
    }

    // Ejercicio 2: Palíndromos
    public static void verificarPalindromo(Scanner scanner) {
        System.out.print("Ingrese un número de cinco dígitos: ");
        int numero = scanner.nextInt();

        if (numero >= 10000 && numero <= 99999) {
            int digito1 = numero / 10000;
            int digito2 = (numero / 1000) % 10;
            int digito4 = (numero / 10) % 10;
            int digito5 = numero % 10;

            if (digito1 == digito5 && digito2 == digito4) {
                System.out.println("Es un palíndromo.");
            } else {
                System.out.println("No es un palíndromo.");
            }
        } else {
            System.out.println("El número no es de cinco dígitos.");
        }
    }

    // Ejercicio 3: Convertir binario a decimal
    public static void convertirBinarioADecimal(Scanner scanner) {
        System.out.print("Ingrese un número binario (solo 0s y 1s): ");
        String binario = scanner.next();

        int longitud = binario.length();
        int decimal = 0;

        for (int i = 0; i < longitud; i++) {
            char bit = binario.charAt(i);
            if (bit == '1') {
                decimal += Math.pow(2, longitud - i - 1);
            } else if (bit != '0') {
                System.out.println("Número binario no válido.");
                return;
            }
        }

        System.out.println("El equivalente decimal es: " + decimal);
    }

    // Ejercicio 4: Patrón de asteriscos en forma de tablero de damas
    public static void patronTableroDamas() {
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 8; j++) {
                if ((i + j) % 2 == 0) {
                    System.out.print(" ");
                } else {
                    System.out.print("*");
                }
                System.out.print(" ");
            }
            System.out.println();
        }
    }

    // Ejercicio 5: Múltiplos de 2 con un ciclo infinito
    public static void mostrarMultiplosDeDosInfinito() {
        int numero = 2;
        while (true) {
            System.out.println(numero);
            numero *= 2;
        }
    }

    // Ejercicio 7: Lados de un triángulo
    public static void verificarTriangulo(Scanner scanner) {
        System.out.print("Ingrese el primer lado: ");
        double lado1 = scanner.nextDouble();

        System.out.print("Ingrese el segundo lado: ");
        double lado2 = scanner.nextDouble();

        System.out.print("Ingrese el tercer lado: ");
        double lado3 = scanner.nextDouble();

        if (lado1 + lado2 > lado3 && lado1 + lado3 > lado2 && lado2 + lado3 > lado1) {
            System.out.println("Estos lados pueden formar un triángulo.");
        } else {
            System.out.println("Estos lados no pueden formar un triángulo.");
        }
    }

      // Ejercicio 8: Lados de un triángulo rectángulo
    public static void verificarTrianguloRectangulo(Scanner scanner) {
        System.out.print("Ingrese el primer lado: ");
        double lado1 = scanner.nextDouble();

        System.out.print("Ingrese el segundo lado: ");
        double lado2 = scanner.nextDouble();

        System.out.print("Ingrese el tercer lado: ");
        double lado3 = scanner.nextDouble();

        // Ordenar los lados en orden ascendente
        double[] lados = {lado1, lado2, lado3};
        Arrays.sort(lados);

        if (Math.pow(lados[0], 2) + Math.pow(lados[1], 2) == Math.pow(lados[2], 2)) {
            System.out.println("Estos lados pueden formar un triángulo rectángulo.");
        } else {
            System.out.println("Estos lados no pueden formar un triángulo rectángulo.");
        }
    }

    // Ejercicio 9: Factorial
    public static void calcularFactorial(Scanner scanner) {
        System.out.print("Ingrese un número no negativo para calcular su factorial: ");
        int numero = scanner.nextInt();

        if (numero < 0) {
            System.out.println("El número debe ser no negativo.");
        } else {
            long factorial = 1;
            for (int i = 1; i <= numero; i++) {
                factorial *= i;
            }
            System.out.println("El factorial de " + numero + " es " + factorial);
        }
    }

    // Ejercicio 10: Kilometraje de gasolina
    public static void calcularKilometraje(Scanner scanner) {
        int totalKilometros = 0;
        int totalLitros = 0;
        int viajes = 0;

        while (true) {
            System.out.print("Ingrese los kilómetros conducidos en este viaje (o -1 para salir): ");
            int kilometros = scanner.nextInt();

            if (kilometros == -1) {
                break; // Salir del bucle si se ingresa -1
            }

            System.out.print("Ingrese los litros de gasolina usados en este viaje: ");
            int litros = scanner.nextInt();

            // Calcular y mostrar el kilometraje para este viaje
            double kilometrajePorLitro = (double) kilometros / litros;
            System.out.println("El kilometraje para este viaje es: " + kilometrajePorLitro + " km/l");

            // Actualizar totales
            totalKilometros += kilometros;
            totalLitros += litros;
            viajes++;
        }

        if (viajes > 0) {
            // Calcular y mostrar el promedio de kilometraje
            double promedioKilometraje = (double) totalKilometros / totalLitros;
            System.out.println("El promedio de kilometraje en " + viajes + " viajes es: " + promedioKilometraje + " km/l");
        } else {
            System.out.println("No se ingresaron datos de viajes.");
        }
    }
}

