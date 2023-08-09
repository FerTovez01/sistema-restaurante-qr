#include <iostream>
using namespace std;

	 
	 void ImpAsteriscos(int num) 
	{
	 	
	 	for (int i=1; i<=num; i++)
	 	 {
	 	 	for (int j=1; j<=i; j++)
			  {
			  	cout <<"*";
			  }
	 	cout << endl;	
	 		
		 }
		 
		 
	}
	 
	 int SumAsteriscos(int num)
	 {
	 	
       int suma=0;
       
	 	for (int i=1; i<=num; i++)
		 {
	 	     suma +=i;	
	 		
		 }
		 
		 return suma;
	 }
      
      
      int main()
	  {
      	
       int numero;	
       cout << "Ingrese un numero: " ;
	     cin>> numero;
       
       ImpAsteriscos(numero);
       
       int suma = SumAsteriscos(numero);
       
       cout<< "La suma de los asteriscos es: " << suma <<endl;
       
       return 0;
	  }
