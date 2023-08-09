#include <iostream>
#include <algorithm>

using namespace std;


void ImpArreglo(int arreglo[], int tam)
{
	
	for(int i=0; i<tam; i++){
		cout << arreglo[i]<<"";
	}
	   cout <<endl;
}

   void OrdArreglo(int arreglo[], int tam){
   	
   	sort(arreglo, arreglo+ tam);
   }
   
   int main() {
   	
   	int tam1, tam2;
   	
   	cout<< "Ingrese el tamaño del primer arreglo";
   	cin>> tam1;
   	
   	cout<< "Ingrese los elementos del primer arreglo";
   	int arreglo1[tam1];
   	for (int i=0; i<tam1; i++)
   	{
   		cin >> arreglo1[i];
	   }
   	
   	
   		cout<< "Ingrese el tamaño del segundo arreglo";
   	cin>> tam2;
   	
   	cout<< "Ingrese los elementos del segundo arreglo";
   	int arreglo2[tam2];
   	for (int i=0; i<tam2; i++)
   	{
   		cin >> arreglo2[i];
	   }
	   
	   
	   int tam3= tam1+tam2;
	   
	   int arreglo3[tam3];
	   
	   copy(arreglo1,arreglo1 + tam1, arreglo3);
	   copy(arreglo2,arreglo2 + tam2, arreglo3 + tam1);
	   
	   
	 OrdArreglo(arreglo3, tam3);
	 
	 
	 cout<< "El tercer arreglo ordenado es:";
	   ImpArreglo(arreglo3, tam3);
	   
	   return 0;
   }
