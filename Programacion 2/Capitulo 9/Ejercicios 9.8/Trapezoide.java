class Trapezoide extends Cuadrilatero {
    public Trapezoide(Punto punto1, Punto punto2, Punto punto3, Punto punto4) {
        super(punto1, punto2, punto3, punto4);
    }

    @Override
    public double calcularArea() {
        double baseMayor = Math.sqrt(Math.pow(getPunto3().getX() - getPunto2().getX(), 2) + Math.pow(getPunto3().getY() - getPunto2().getY(), 2));
        double baseMenor = Math.sqrt(Math.pow(getPunto4().getX() - getPunto1().getX(), 2) + Math.pow(getPunto4().getY() - getPunto1().getY(), 2));
        double altura = Math.abs(getPunto2().getY() - getPunto1().getY());

        return (baseMayor + baseMenor) * altura / 2;
    }
}
