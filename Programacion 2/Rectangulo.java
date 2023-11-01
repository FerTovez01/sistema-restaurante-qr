public class Rectangulo {
    private double longitud;
    private double anchura; 

    public Rectangulo() {
        longitud = 1.0;
        anchura = 1.0;
    } 

    public double calcularArea() {
        return longitud * anchura;
    } 

    public double calcularPerimetro() {
        return 2 * (longitud + anchura);
    } 

    public void setLongitud(double longitud) {
        if (longitud > 0.0 && longitud < 20.0) {
            this.longitud = longitud;
        } else {
            System.out.println("La longitud debe estar entre 0.0 y 20.0");
        }
    } 

    public double getLongitud() {
        return longitud;
    } 

    public void setAnchura(double anchura) {
        if (anchura > 0.0 && anchura < 20.0) {
            this.anchura = anchura;
        } else {
            System.out.println("La anchura debe estar entre 0.0 y 20.0");
        }
    } 

    public double getAnchura() {
        return anchura;
    } 

    public static void main(String[] args) {
        Rectangulo miRectangulo = new Rectangulo();
        System.out.println("Área: " + miRectangulo.calcularArea());
        System.out.println("Perímetro: " + miRectangulo.calcularPerimetro()); 

        miRectangulo.setLongitud(5.0);
        miRectangulo.setAnchura(3.0); 

        System.out.println("Nueva longitud: " + miRectangulo.getLongitud());
        System.out.println("Nueva anchura: " + miRectangulo.getAnchura());
        System.out.println("Nuevo Área: " + miRectangulo.calcularArea());
        System.out.println("Nuevo Perímetro: " + miRectangulo.calcularPerimetro());
        }
}
