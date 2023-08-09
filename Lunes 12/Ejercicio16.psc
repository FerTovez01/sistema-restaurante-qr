Algoritmo Ejercicio16
	Dimension matrix_1[3,6]
    cont = 1
    n = 1
    //Lee Datos al Array Bidimencional
    Para f = 1 hasta 3 con paso 1 hacer
        Para c = 1 hasta 3 con paso 1 hacer
            Escribir "Ingrese valor ", cont ,"/9 :" 
            Leer matrix_1[f,c]
            cont = cont + 1
        FinPara			
    FinPara
    //Ordenar Datos del Array Bidimencional
    Para m = 1 hasta 3 con paso 1 hacer			
        Para n = 1 hasta 3 con paso 1 hacer			
            Para f = 1 hasta 3 con paso 1 hacer		
                Para c = 1 hasta 3 con paso 1 hacer					
                    Si matrix_1[m,n] < matrix_1[f,c] Entonces
                        temp = matrix_1[m,n]
                        matrix_1[m,n] = matrix_1[f,c]
                        matrix_1[f,c] = temp
                    Fin Si						
                FinPara					
            FinPara		
        FinPara				
    FinPara
    //Mostrar Datos al Array Bidimencional 2
    Para f = 1 hasta 3 con paso 1 hacer		
        Escribir matrix_1[f,1] , " " , matrix_1[f,2] , " " , matrix_1[f,3]			
    FinPara	
FinAlgoritmo
