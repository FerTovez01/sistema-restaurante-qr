Algoritmo 	Ejercico17
	
		Definir montoPrestamo, numMeses, tasaInteres, interesTotal Como Real
		
		Escribir "Ingrese el monto del préstamo:"
		Leer montoPrestamo
		
		Escribir "Ingrese el número de meses:"
		Leer numMeses
		
		tasaInteres <- 2 / 100  // Tasa de interés mensual del 2%
		
		interesTotal <- montoPrestamo * tasaInteres * numMeses
		
		Escribir "El interés total a pagar es:", interesTotal
FinAlgoritmo


