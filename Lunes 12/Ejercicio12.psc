//1Elaborar un programa que permita ingresar un número entero del 1 al 12 y muestre la
//tabla de multiplicar de dicho número.



Algoritmo Ejercicio12
	Definir numero, resultado, multiplicador como Entero
	
	Escribir "Ingrese un número del 1 al 12:"
	Leer numero
	
	Si numero < 1 O numero > 12 Entonces
		Escribir "El número ingresado está fuera del rango válido."
	Sino
		Escribir "Tabla de multiplicar del número ", numero, ":"
		
		Para multiplicador <- 1 Hasta 10 Con Paso 1 Hacer
			resultado <- numero * multiplicador
			Escribir numero, " x ", multiplicador, " = ", resultado
		Fin Para
		
	Fin Si
	
FinAlgoritmo
