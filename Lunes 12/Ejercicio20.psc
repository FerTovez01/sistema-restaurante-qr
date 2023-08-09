Algoritmo Ejercicio20
	Definir a,b,r Como Real
	
	Repetir
		Escribir "Elije una opción"
		
		Escribir "1.Área del triángulo"
		
		Escribir "2.Área del cuadrado"
		
		Escribir "3.Área del rectángulo"
		
		Escribir "4.Área del circulo"
		
		Escribir "5.Salir"
		leer n
		si n == 1 Entonces
			Escribir "Ingresa la base y la altura del triangulo"
			leer a,b
			
		Escribir "El área del triangulo es:" ,(a*b)/2
			
		FinSi
		
	    si n == 2 Entonces
			Escribir "Ingresa uno de los lados del cuadrado"
			leer a
			
		Escribir "El área del cuadrado es" ,a*a
	FinSi
	si n == 3 Entonces
		Escribir "Ingresa la base y la altura del rectángulo"
		
		leer a,b
		
	Escribir "El área del rectangulo es" ,a*b
		
	FinSi
	si n == 4 Entonces
		
		Escribir "Ingresa el radio del circulo"
		
		leer r
		
	Escribir "El área del circulo es" ,(3.1416 * (r*r))
		
		
FinSi
Hasta Que n == 5           
FinAlgoritmo
