Algoritmo Factorial_Numero
	
	Definir n, factorial, x Como ENTERO
	Escribir "Ingrese un numero:"
	leer n
	si n < 0 Entonces
		Escribir "El numero", n,"no se puede calcular"
	SiNo
		x=1
		factorial=1
		Repetir
			factorial=factorial*x
			x=x+1
		Hasta Que x>n
		Escribir "El factorial del numero es:" , factorial
	FinSi
	
FinAlgoritmo
