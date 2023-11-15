// Cubo.java
public class Cubo extends FiguraTridimensional {
    private double lado;

    public Cubo(double lado) {
        this.lado = lado;
    }

    @Override
    public double obtenerArea() {
        return 6 * Math.pow(lado, 2);
    }

    @Override
    public double obtenerVolumen() {
        return Math.pow(lado, 3);
    }
}


 