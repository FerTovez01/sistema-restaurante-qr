Algoritmo PromedioLista
	Definir N, dato, suma, promedio como Entero
	Definir i como Entero
	
	suma <- 0
	
	Escribir "Ingrese la cantidad de datos (N): "
	Leer N
	
	Para i <- 1 Hasta N Hacer
		Escribir "Ingrese el dato ", i, ": "
		Leer dato
		suma <- suma + dato
	Fin Para
	
	promedio <- suma / N
	
	Escribir "El promedio de la lista de datos es: ", promedio
	
FinAlgoritmo

