#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

 int LanzarMonedas()
 {
 	int caras = 0;
 	int escudos= 0;
 	
 	  for (int i=0; i<10; i++)
 	   {
 	   	 int resultado= rand() % 2;
 	   	  
 	   	  
 	   	  if (resultado==0)
 	   	      caras++;
 	   	 
 	   	  else
 	   	       escudos++;
		}
		
	   cout<< "Resultado de los lanzaminetos:" <<endl;
	   cout<< "Caras: " <<caras<<endl;
	   cout<<" Escudos: " <<escudos <<endl;
	   
	   return caras + escudos;
	    }

  int LanzarDados()
  {
  	int contadorSeis= 0;
  	int lanzamientos= 0;
  	
  	
  	   while (contadorSeis < 10)
  	   {
  	   	 int resultado= rand() % 6 + 1;
  	   	 
  	   	 cout <<"Lanzamiento" << lanzamientos +1 <<":" <<resultado<< endl;
  	   	 
  	   	
  	   	  if (resultado==6)
  	   	        contadorSeis++;
  	   	       
  	   	  lanzamientos++;
		 }
		 
		 cout <<" Se obtuvieron 10 veces el numero 6 en : "  <<":" << lanzamientos << "lanzamientos"<<  endl;
		 
		 return 0;
  }
  
  int main() 
  {
  	
  	
  
  	
  	int opcion;
  	
  	    do {
  	    	
  	    	 cout <<"Menu :" << std:: endl;
  	    	 cout <<" 1. Lanzar Monedas" << endl;
  	    	 cout <<" 2. Lanzar Dados "  << endl;
  	    	 cout <<" 3. Terminar "  <<endl;
  	    	 cout <<" Selecciones una opcion: " ;
  	    	 cin>> opcion;
  	    	
  	    	
  	    	   switch (opcion) {
  	    	   	
  	    	   	   case 1:
  	    	   	   	  
  	    	   	   	  LanzarMonedas();
  	    	   	   	  break;
  	    	   	   	  
  	    	   	   	  
  	    	   	   case 2:
  	    	   	   	
  	    	   	  	   LanzarDados ();
  	    	   	  	   break;
  	    	   	  	   
  	    	   	  	   
  	    	   	   case 3:
  	    	   	   	
  	    	   	   	    cout<<" Terminar el programa..." <<endl;
  	    	   	   	    break;
  	    	   	   	    
  	    	   	default:
  	    	   		
  	    	   		cout <<" Opcion incorrecta, Seleccione una opcion correcta." <<endl;
  	    	   		
  	    	   		break;
							   
				 }
				 
				 cout <<endl;
		  }
		  
		  while (opcion != 3);
		  
		  return 0;
	}
 
