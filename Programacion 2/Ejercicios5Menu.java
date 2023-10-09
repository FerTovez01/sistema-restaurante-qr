import java.util.Scanner;


public class Ejercicios5Menu
{


  public static void main (String[]args)
  {

    Scanner scanner = new Scanner (System.in);

    int opcion;


    do
      {

	System.out.println ("MenC: de Ejercicios:");

	System.out.println ("1. Encontrar el valor menor");

	System.out.println ("2. Calcular el producto de enteros impares");

	System.out.println ("3. Calcular factoriales");

	System.out.println ("4. InterC)s compuesto");

	System.out.println ("5. Imprimir triC!ngulos");

	System.out.println ("6. Imprimir barras de asteriscos");

	System.out.println ("7. Calcular ventas");

	System.out.println ("8. InterC)s compuesto con enteros");

	System.out.println ("9. Ternas pitagC3ricas");

	System.out.println ("10. Imprimir triC!ngulos combinados");

	System.out.println ("0. Salir");

	System.out.print ("Seleccione una opciC3n: ");


	opcion = scanner.nextInt ();


	switch (opcion)
	  {

	  case 1:

	    encontrarValorMenor ();

	    break;

	    case 2:calcularProductoImpares ();

	    break;

	    case 3:calcularFactoriales ();

	    break;

	    case 4:calcularInteresCompuesto ();

	    break;

	    case 5:imprimirTriangulos ();

	    break;

	    case 6:imprimirBarrasAsteriscos ();

	    break;

	    case 7:calcularVentas ();

	    break;

	    case 8:calcularInteresCompuestoEnteros ();

	    break;

	    case 9:calcularTernasPitagoricas ();

	    break;

	    case 10:imprimirTriangulosCombinados ();

	    break;

	    case 0:System.out.println ("Saliendo del programa...");

	    break;

	    default:System.out.println
	      ("OpciC3n no vC!lida. Por favor, seleccione una opciC3n vC!lida.");

	  }


      }
    while (opcion != 0);


    scanner.close ();

  }



  private static void encontrarValorMenor ()
  {

    Scanner scanner = new Scanner (System.in);


    System.out.print ("Ingrese la cantidad de enteros a comparar: ");

    int cantidad = scanner.nextInt ();


    System.out.print ("Ingrese el primer valor: ");

    int menor = scanner.nextInt ();


    for (int i = 1; i < cantidad; i++)
      {

	System.out.print ("Ingrese el siguiente valor: ");

	int valor = scanner.nextInt ();

	if (valor < menor)
	  {

	    menor = valor;

	  }

      }


    System.out.println ("El valor menor es: " + menor);

    scanner.close ();

  }


  private static void calcularProductoImpares ()
  {

    int producto = 1;


    for (int i = 1; i <= 15; i += 2)
      {

	producto *= i;

      }

    System.out.println ("El producto de enteros impares del 1 al 15 es: " +
			producto);

  }

  private static void calcularFactoriales ()
  {

    for (int n = 1; n <= 20; n++)
      {

	long factorial = 1;


	for (int i = 1; i <= n; i++)
	  {

	    factorial *= i;

	  }

	System.out.printf ("%d! = %d%n", n, factorial);

      }
  }

  private static void calcularInteresCompuesto ()
  {

    double principal = 1000.0;

    double tasa;


    for (int i = 5; i <= 10; i++)
      {

	tasa = i / 100.0;

	double monto = principal * Math.pow (1.0 + tasa, 10);

	System.out.
	  printf ("A una tasa del %.2f%%, el monto final es: $%.2f%n",
		  tasa * 100, monto);

      }
  }

  private static void imprimirTriangulos ()
  {

    for (int i = 1; i <= 10; i++)
      {

	for (int j = 1; j <= i; j++)
	  {

	    System.out.print ("*");

	  }
	System.out.println ();

      }
  }

  private static void calcularVentas ()
  {

    Scanner scanner = new Scanner (System.in);

    double[] precios = { 2.98, 4.50, 9.98, 4.49, 6.87 };

    double totalVentas = 0;


    while (true)
      {

	System.out.print
	  ("Ingrese el nC:mero del producto (1-5) o 0 para salir: ");

	int producto = scanner.nextInt ();


	if (producto == 0)
	  {

	    break;

	  }


	if (producto >= 1 && producto <= 5)
	  {

	    System.out.print ("Ingrese la cantidad vendida: ");

	    int cantidad = scanner.nextInt ();

	    totalVentas += precios[producto - 1] * cantidad;

	  }
	else
	  {

	    System.out.println ("NC:mero de producto no vC!lido.");

	  }

      }


    System.out.println ("El total de ventas es: $" + totalVentas);

    scanner.close ();

  }



  private static void imprimirBarrasAsteriscos ()
  {

    Scanner scanner = new Scanner (System.in);

    double[] precios = { 2.98, 4.50, 9.98, 4.49, 6.87 };

    double totalVentas = 0;


    while (true)
      {

	System.out.print
	  ("Ingrese el nC:mero del producto (1-5) o 0 para salir: ");

	int producto = scanner.nextInt ();


	if (producto == 0)
	  {

	    break;

	  }


	if (producto >= 1 && producto <= 5)
	  {

	    System.out.print ("Ingrese la cantidad vendida: ");

	    int cantidad = scanner.nextInt ();

	    totalVentas += precios[producto - 1] * cantidad;

	  }
	else
	  {

	    System.out.println ("NC:mero de producto no vC!lido.");

	  }

      }


    System.out.println ("El total de ventas es: $" + totalVentas);

    scanner.close ();

  }


  private static void calcularInteresCompuestoEnteros ()
  {

    int principal = 100000;	// 1000 dC3lares en centavos
    int tasa;


    for (int i = 5; i <= 10; i++)
      {

	tasa = i;

	int monto = principal * (int) Math.pow (1.0 + tasa / 100.0, 10);

	int dolares = monto / 100;

	int centavos = monto % 100;

	System.out.
	  printf ("A una tasa del %d%%, el monto final es: $%d.%02d%n", tasa,
		  dolares, centavos);

      }
  }

  private static void calcularTernasPitagoricas ()
  {

    for (int lado1 = 1; lado1 <= 500; lado1++)
      {

	for (int lado2 = 1; lado2 <= 500; lado2++)
	  {

	    for (int hipotenusa = 1; hipotenusa <= 500; hipotenusa++)
	      {

		if (lado1 * lado1 + lado2 * lado2 == hipotenusa * hipotenusa)
		  {

		    System.out.println ("Terna PitagC3rica: " + lado1 +
					", " + lado2 + ", " + hipotenusa);

		  }

	      }

	  }

      }

  }


  private static void imprimirTriangulosCombinados ()
  {

    for (int i = 1; i <= 10; i++)
      {

	// TriC!ngulo izquierdo
	for (int j = 1; j <= i; j++)
	  {

	    System.out.print ("*");

	  }

	// Espacios
	for (int j = 10 - i; j >= 1; j--)
	  {

	    System.out.print (" ");

	  }

	// TriC!ngulo derecho
	for (int j = 1; j <= i; j++)
	  {

	    System.out.print ("*");

	  }

	System.out.println ();

      }
  }
}
