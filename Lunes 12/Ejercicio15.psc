Algoritmo Ejercicio15
    Dimension matrix[4,5]
    num = 1
   
    Para f = 1 hasta 4 con paso 1 hacer
        Para c = 1 hasta 5 con paso 1 hacer			
            matrix[f,c] = num
            num = num + 1
        FinPara			
    FinPara
  
    Escribir "Ingrese Número del 1 al 20 :"
    Leer Num
    Escribir ""
    Si Num >=1 Y Num <=20  Entonces
        
        Para f = 1 hasta 4 con paso 1 hacer		
            Escribir matrix[f,1] , " " , matrix[f,2] , " " , matrix[f,3] , " " , matrix[f,4], " " , matrix[f,5]
        FinPara	
        Escribir ""
        //Buscando Número
        Para f = 1 hasta 4 con paso 1 hacer
            Para c = 1 hasta 5 con paso 1 hacer							
                Si 	matrix[f,c] = num Entonces
                    Escribir "Posición MATRIX[",f,",",c,"]"
                Fin Si
            FinPara			
        FinPara		
    SiNo
        Escribir "Número mal Ingresado"
    Fin Si
FinAlgoritmo