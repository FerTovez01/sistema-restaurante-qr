Algoritmo Adivina_Numero
	
	Definir intentos_maximos, limite_inferior, limite_superior, num_secreto, num_ingresado, intentos Como Entero
	
	intentos_maximos <- 10
	
	Escribir "Ingrese el rango para generar el número secreto:"
	Escribir "Límite inferior:"
	Leer limite_inferior
	Escribir "Límite superior:"
	Leer limite_superior
	
	num_secreto <- azar(100)+1
	
	Escribir "Adivine el número (entre ", limite_inferior, " y ", limite_superior, "):"
	Leer num_ingresado
	
	intentos <- 1
	
	Mientras num_secreto <> num_ingresado Y intentos < intentos_maximos Hacer
		Si num_secreto > num_ingresado Entonces
			Escribir "Muy bajo"
		SiNo 
			Escribir "Muy alto"
		FinSi
		
		intentos <- intentos + 1
		Escribir "Intento ", intentos, " de ", intentos_maximos
		Leer num_ingresado
	FinMientras
	
	Si num_secreto = num_ingresado Entonces
		Escribir "¡Exacto! Usted adivinó en ", intentos, " intentos."
	SiNo
		Escribir "Agotó los ", intentos_maximos, " intentos. El número era: ", num_secreto
	FinSi
	
FinAlgoritmo



