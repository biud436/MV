#include <string>
#include <iostream>
#include <cstdlib>

#include <Windows.h>
#include <tchar.h>

#define NW_CLASS_NAME "Chrome_WidgetWin_0"
#define NW_WINDOW_NAME NULL

using namespace std;

HWND g_hWnd;

int GetDisplaySettings(void) 
{	
	string szReturnSTR;
		
	DEVMODE dm; 
	ZeroMemory(&dm, sizeof(dm)); 
	dm.dmSize = sizeof(dm);		
		
	for (int i = 0; EnumDisplaySettings(NULL, i, &dm) != 0; i++)
	{
		
		// width
		szReturnSTR.append( to_string((int)dm.dmPelsWidth) );
		szReturnSTR.append( " x " );
		
		// height
		szReturnSTR.append( to_string((int)dm.dmPelsHeight) );
		szReturnSTR.append( "\n" );
		
	}	
	
	cout << szReturnSTR.c_str() << endl;
	return 0;
}

int main(int argc, char** argv)
{
	const char *arg = argv[1];	
	g_hWnd = NULL;
	
	arg++;
	
	switch(arg[0]) 
	{
	case 'c':
		GetDisplaySettings();
		break;
	}
	return 0;
}