
	//Hacer un programa que ingrese por teclado un número total de segundos y que luego
	//pueda mostrar la cantidad de horas, minutos y segundos que existen en el valor ingresado.
Algoritmo Ejercicio2
	Definir seg, min, horas, seg1 Como Entero
	Escribir "INGRESE UNA CANTIDAD DE SEGUNDOS Y MUESTRE LAS HORAS Y MINUTOS QUE EXISTEN."
	Escribir ""
	Escribir "Ingrese la cantidad en segundos: "
	Leer seg
	horas <- TRUNC(seg / 3600)
	min <- TRUNC((seg - (horas * 3600)) / 60)
	seg1 <- TRUNC(seg - ((horas * 3600) + (min * 60)))
	Escribir ""
	Escribir "Horas : ", horas
	Escribir "Minutos : ", min
	Escribir "Segundos : ", seg1
FinAlgoritmo

