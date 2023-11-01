import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Ingrese el nombre del cliente: ");
        String cliente = scanner.nextLine();

        System.out.print("Ingrese la fecha: ");
        String fecha = scanner.nextLine();

        System.out.print("Ingrese la cantidad de productos: ");
        int numProductos = scanner.nextInt();
        scanner.nextLine(); 

        Factura factura = new Factura(cliente, fecha, numProductos);

        for (int i = 0; i < numProductos; i++) {
            System.out.print("Ingrese el nombre del producto " + (i + 1) + ": ");
            String producto = scanner.nextLine();

            System.out.print("Ingrese la cantidad de " + producto + ": ");
            int cantidad = scanner.nextInt();

            System.out.print("Ingrese el precio unitario de " + producto + ": ");
            double precioUnitario = scanner.nextDouble();
            scanner.nextLine(); 

            LineaFactura lineaFactura = new LineaFactura(cantidad, producto, precioUnitario);
            factura.agregarLineaFactura(lineaFactura);
        }

        System.out.println("Cliente: " + factura.cliente);
        System.out.println("Fecha: " + factura.fecha);
        System.out.println("Detalle de la factura:");
        for (int i = 0; i < factura.numLineas; i++) {
            LineaFactura lineaFactura = factura.lineaFacturas[i];
            System.out.println("Producto: " + lineaFactura.producto + ", Cantidad: " + lineaFactura.cantidad + ", Precio Unitario: " + lineaFactura.precioUnitario + ", SubTotal: " + lineaFactura.getSubTotal());
        }

        System.out.println("Total de la factura: " + factura.getTotal());

        scanner.close(); 
    }
}
