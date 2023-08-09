//Realizar un algoritmo que muestre la siguiente serie numérica gráfica:
//123456789
//12345678
//1234567
//123456
//12345
//1234
//123
//12
//1

	Algoritmo Ejercicio11
		Para S <-1 Hasta 9 Con Paso 1  Hacer
			Serie = ""
			Para A <-1 Hasta 10 - S Con Paso 1  Hacer
				Serie = Serie + " "	+ ConvertirATexto(A)
			Fin Para
			Escribir Serie
		Fin Para	
FinAlgoritmo	

