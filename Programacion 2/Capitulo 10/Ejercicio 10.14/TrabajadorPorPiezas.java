public class TrabajadorPorPiezas extends Empleado {
    private double sueldoPorPieza;
    private int piezasProducidas;

    public TrabajadorPorPiezas(String primerNombre, String apellidoPaterno, String numeroSeguroSocial, double sueldoPorPieza, int piezasProducidas) {
        super(primerNombre, apellidoPaterno, numeroSeguroSocial);
        this.sueldoPorPieza = sueldoPorPieza;
        this.piezasProducidas = piezasProducidas;
    }

    public double getSueldoPorPieza() {
        return sueldoPorPieza;
    }

    public void setSueldoPorPieza(double sueldoPorPieza) {
        this.sueldoPorPieza = sueldoPorPieza;
    }

    public int getPiezasProducidas() {
        return piezasProducidas;
    }

    public void setPiezasProducidas(int piezasProducidas) {
        this.piezasProducidas = piezasProducidas;
    }

    @Override
    public String toString() {
        return String.format("Trabajador por Piezas: %s\nSueldo por Pieza: $%.2f\nPiezas Producidas: %d",
                super.toString(), sueldoPorPieza, piezasProducidas);
    }
}


 