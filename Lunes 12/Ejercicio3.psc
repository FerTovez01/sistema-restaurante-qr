//Hacer un programa que permita ingresar 10 valores a un array seguido muestre cuantos
//son positivos, cuantos negativos y cuantos son nulos.


Algoritmo Ejercicio3
	
    Dimension vector[10]
    positivo = 0
    negativo = 0
    nulo = 0
    //Ingresa 10 valores al array
    Para f = 1 hasta 10 con paso 1 hacer			
        Escribir "Ingrese Número ", f, " : "		
        Leer vector[f]				
    FinPara		
    //Muestra Positivos, Negativos, Nulos
    Para f = 1 hasta 10 con paso 1 hacer						
        Si vector[f] = 0 Entonces
            nulo = nulo + 1
        SiNo
            Si vector[f] > 0 Entonces
                positivo = positivo + 1
            SiNo
                negativo = negativo + 1
            Fin Si
        Fin Si		
    FinPara
    Escribir "Total de Nulos : ", nulo
    Escribir "Total de Positivos : ", positivo
    Escribir "Total de Negativos : ", negativo
FinAlgoritmo