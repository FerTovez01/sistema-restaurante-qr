// Circulo.java
public class Circulo extends FiguraBidimensional {
    private double radio;

    public Circulo(double radio) {
        this.radio = radio;
    }

    @Override
    public double obtenerArea() {
        return Math.PI * Math.pow(radio, 2);
    }
}
