public class BoletoDeAvion {
    private String numeroVuelo;
    private String origen;
    private String destino;
    private String fecha;
    private double precio;

    public BoletoDeAvion(String numeroVuelo, String origen, String destino, String fecha, double precio) {
        this.numeroVuelo = numeroVuelo;
        this.origen = origen;
        this.destino = destino;
        this.fecha = fecha;
        this.precio = precio;
    }

    public String getNumeroVuelo() {
        return numeroVuelo;
    }

    public String getOrigen() {
        return origen;
    }

    public String getDestino() {
        return destino;
    }

    public String getFecha() {
        return fecha;
    }

    public double getPrecio() {
        return precio;
    }

 public static void main (String[] aStrings) {
 System.out.println();   

BoletoDeAvion boleto = new BoletoDeAvion("AA123", "Nueva York", "Los Ángeles", "2023-10-30", 300.0 );

System.out.println("Número de vuelo: " + boleto.getNumeroVuelo());
System.out.println("Origen: " + boleto.getOrigen());
System.out.println("Destino: " + boleto.getDestino());
System.out.println("Fecha: " + boleto.getFecha());
System.out.println("Precio: " + boleto.getPrecio());
}


public void setNumeroVuelo(String numeroVuelo) {
    this.numeroVuelo = numeroVuelo;
}

public void setOrigen(String origen) {
    this.origen = origen;
}

public void setDestino(String destino) {
    this.destino = destino;
}

public void setFecha(String fecha) {
    this.fecha = fecha;
}

public void setPrecio(double precio) {
    this.precio = precio;
}

public String[] getaStrings() {
    return aStrings;
}

public void setaStrings(String[] aStrings) {
    this.aStrings = aStrings;
}
}



