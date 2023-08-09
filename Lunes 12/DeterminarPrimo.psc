Algoritmo DeterminarPrimo
    Definir numero, divisor, resto como Entero
    Definir esPrimo como Logico
    esPrimo <- Verdadero
	
    Escribir "Ingrese un número:"
    Leer numero
	
    Para divisor <- 2 Hasta numero / 2 Hacer
        resto <- numero % divisor
        Si resto = 0 Entonces
            esPrimo <- Falso
            Escribir "El número no es primo."
            Escribir "Divisores:"
            Para divisor <- 2 Hasta numero - 1 Hacer
                resto <- numero % divisor
                Si resto = 0 Entonces
                    Escribir divisor
                Fin Si
            Fin Para
            
        Fin Si
    Fin Para
	
    Si esPrimo Entonces
        Escribir "El número es primo."
    Fin Si
FinAlgoritmo
