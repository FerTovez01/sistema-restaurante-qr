public class Main {
    public static void main(String[] args) {
        FiguraBidimensional[] figurasBidimensionales = {
                new Cuadrado(5),
                new Circulo(3)
        };

        FiguraTridimensional[] figurasTridimensionales = {
                new Cubo(4),
                new Esfera(2)
        };

        for (FiguraBidimensional figura : figurasBidimensionales) {
            System.out.println(figura);
            System.out.printf("Área: %.2f%n", figura.obtenerArea());
            System.out.println("------------");
        }

        for (FiguraTridimensional figura : figurasTridimensionales) {
            System.out.println(figura);
            System.out.printf("Área superficial: %.2f%n", figura.obtenerArea());
            System.out.printf("Volumen: %.2f%n", figura.obtenerVolumen());
            System.out.println("------------");
        }
    }
}

