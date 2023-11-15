// Cuadrado.java
public class Cuadrado extends FiguraBidimensional {
    private double lado;

    public Cuadrado(double lado) {
        this.lado = lado;
    }

    @Override
    public double obtenerArea() {
        return lado * lado;
    }
}

