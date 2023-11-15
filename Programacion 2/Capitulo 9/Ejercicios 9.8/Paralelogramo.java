class Paralelogramo extends Cuadrilatero {
    public Paralelogramo(Punto punto1, Punto punto2, Punto punto3, Punto punto4) {
        super(punto1, punto2, punto3, punto4);
    }

    @Override
    public double calcularArea() {
        double base = Math.sqrt(Math.pow(getPunto2().getX() - getPunto1().getX(), 2) + Math.pow(getPunto2().getY() - getPunto1().getY(), 2));
        double altura = Math.abs(getPunto2().getY() - getPunto1().getY());

        return base * altura;
    }
}
