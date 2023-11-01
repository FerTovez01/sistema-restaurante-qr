import java.util.Scanner;

public class SimpletronSimulator {
    private int[] memory;
    private int accumulator;
    private int instructionCounter;

    public SimpletronSimulator() {
        memory = new int[100];
        accumulator = 0;
        instructionCounter = 0;
    }

    public void loadProgram() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("*** Bienvenido a Simpletron! ***");
        System.out.println("*** Por favor, introduzca en su programa una instruccion ***");
        System.out.println("*** (o palabra de datos) a la vez. Yo le mostrare ***");
        System.out.println("*** el numero de ubicacion y un signo de interrogacion (?) ***");
        System.out.println("*** Entonces usted escribira la palabra para esa ubicacion. ***");
        System.out.println("*** Teclee -9999 para dejar de introducir su programa. ***");

        int location = 0;
        while (true) {
            System.out.print(String.format("%02d ? ", location));
            int value = scanner.nextInt();

            if (value == -9999) {
                System.out.println("*** Se completo la carga del programa ***");
                System.out.println("*** Empieza la ejecucion del programa ***");
                break;
            }

            if (value >= -9999 && value <= 9999) {
                memory[location] = value;
                location++;
            } else {
                System.out.println("Error: Ingrese un valor válido (-9999 a 9999).");
            }
        }
    }

    public void executeProgram() {
        while (instructionCounter >= 0 && instructionCounter < memory.length) {
            int instruction = memory[instructionCounter];
            int opcode = instruction / 100;
            int operand = instruction % 100;

            switch (opcode) {
                case 10:
                    System.out.print("Ingrese un número: ");
                    int value = new Scanner(System.in).nextInt();
                    memory[operand] = value;
                    break;
                case 11:
                    System.out.println(memory[operand]);
                    break;
                case 20:
                    accumulator = memory[operand];
                    break;
                case 21:
                    memory[operand] = accumulator;
                    break;
                case 30:
                    accumulator += memory[operand];
                    break;
                case 31:
                    accumulator -= memory[operand];
                    break;
                case 32:
                    accumulator *= memory[operand];
                    break;
                case 33:
                    if (memory[operand] != 0) {
                        accumulator /= memory[operand];
                    } else {
                        System.out.println("Error: División por cero.");
                        return;
                    }
                    break;
                case 40:
                    instructionCounter = operand;
                    break;
                case 41:
                    if (accumulator < 0) {
                        instructionCounter = operand;
                    }
                    break;
                case 42:
                    if (accumulator == 0) {
                        instructionCounter = operand;
                    }
                    break;
                case 43:
                    System.out.println("*** Fin de la ejecucion del programa ***");
                    return;
                default:
                    System.out.println("Error: Código de operación inválido.");
                    return;
            }

            instructionCounter++;
        }
    }

    public void dumpMemory() {
        System.out.println("\n*** Estado de la computadora Simpletron ***");
        System.out.println("Acumulador: " + accumulator);
        System.out.println("Contador de instrucciones: " + instructionCounter);
        System.out.println("\n*** Memoria: ***");
        for (int i = 0; i < memory.length; i++) {
            System.out.println(String.format("%02d: %+04d", i, memory[i]));
        }
    }

    public static void main(String[] args) {
        SimpletronSimulator simpletron = new SimpletronSimulator();
        simpletron.loadProgram();
        simpletron.executeProgram();
        simpletron.dumpMemory();
    }
}
