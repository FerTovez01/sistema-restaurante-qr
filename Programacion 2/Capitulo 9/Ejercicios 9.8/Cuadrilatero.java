class Cuadrilatero {
    private Punto punto1;
    private Punto punto2;
    private Punto punto3;
    private Punto punto4;

    public Cuadrilatero(Punto punto1, Punto punto2, Punto punto3, Punto punto4) {
        this.punto1 = punto1;
        this.punto2 = punto2;
        this.punto3 = punto3;
        this.punto4 = punto4;
    }

    public double calcularArea() {
        // Devolvemos 0 porque no podemos determinar el área para un cuadrilátero genérico.
        return 0;
    }

    public Punto getPunto1() {
        return punto1;
    }

    public Punto getPunto2() {
        return punto2;
    }

    public Punto getPunto3() {
        return punto3;
    }

    public Punto getPunto4() {
        return punto4;
    }
}

