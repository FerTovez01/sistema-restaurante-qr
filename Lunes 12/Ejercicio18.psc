
	Proceso Ejercicio18
		Escribir Sin Saltar "DIA NACIMIENTO : "
		Leer d
		Escribir Sin Saltar "MES NACIMIENTO : "
		Leer m
		Escribir Sin Saltar "AÑO NACIMIENTO : "
		Leer a
		Escribir ""
		Escribir Sin Saltar "DIA ACTUAL : "
		Leer df
		Escribir Sin Saltar "MES ACTUAL : "
		Leer mf
		Escribir Sin Saltar "AÑO ACTUAL : "
		Leer af
		Si (m < mf) Entonces
			edad = af-a
		SiNo
			Si (m == mf) Entonces
				Si (d < df+1) Entonces
					edad = (af-a)
				SiNo
					edad = (af-a)-1
				FinSi
			SiNo
				edad = (af-a)-1
			FinSi
		FinSi
		Escribir ""
		Escribir "EDAD : ", edad
FinProceso

