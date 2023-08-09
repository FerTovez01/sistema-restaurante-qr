Algoritmo MayorMenorPromedio
	
	Definir mayor, menor, promedio, numero, suma Como Real
	
	mayor <- 0
	menor <- 0
	promedio <- 0
	suma <- 0
	
	Para i <- 1 Hasta 10 Hacer
		Escribir "Ingrese el número ", i, ": "
		Leer numero
		
		Si i = 1 Entonces
			mayor <- numero
			menor <- numero
		Sino
			Si numero > mayor Entonces
				mayor <- numero
			FinSi
			
			Si numero < menor Entonces
				menor <- numero
			FinSi
		FinSi
		
		suma <- suma + numero
	FinPara
	
	promedio <- suma / 10
	
	Escribir "El número mayor es: ", mayor
	Escribir "El número menor es: ", menor
	Escribir "El promedio de los números es: ", promedio
	
FinAlgoritmo

