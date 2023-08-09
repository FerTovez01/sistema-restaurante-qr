#include <iostream>
using namespace std;
 int main()
{
	int x= 10;
	int *pe;
	pe= &x;
	
	cout << x;
	cout<< "\n";
	cout << *pe;
	cout << "\n";
	*pe= 5;
	cout << x;
	cout<< "\n";
	
	float valor= 10.9;
	float *pf;
	pf: &valor;
	cout << *pe;
	
	return 0;
}
