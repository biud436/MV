/**
 * @author biud436
 * @date 08.29.2017
 */
 
#include <Windows.h>
#include <iostream>
#include <string>

#define NW_CLASS_NAME "Chrome_WidgetWin_0"
#define NW_WINDOW_NAME NULL
#define MINIMUM_OPACITY 0
#define MAXIMUM_OPACITY 255
#define OUTPUT_STD_MESSAGE "Adjusted the opacity of the window"

using namespace std;

int SetNodeWebkitWindowOpacity(int opacity, string wndName)
{
	HWND hWnd = FindWindow(NW_CLASS_NAME, wndName.c_str());
	LONG exStyle = GetWindowLong(hWnd, GWL_EXSTYLE);
	char buffer[255];
	
	if(hWnd == NULL) {
		GetWindowText(hWnd, buffer, 255);
		wndName = buffer;
		 hWnd = FindWindow(NW_CLASS_NAME, wndName.c_str());
	}
	
	if(opacity == 255) {
		SetWindowLong(hWnd, GWL_EXSTYLE, exStyle & ~WS_EX_LAYERED);		
	}

	if( exStyle & WS_EX_LAYERED ) {
		SetWindowLong(hWnd, GWL_EXSTYLE, exStyle | WS_EX_LAYERED);		
	}
		
	if(opacity < MINIMUM_OPACITY) 
		opacity = MINIMUM_OPACITY;
	
	if(opacity > MAXIMUM_OPACITY) 
		opacity = MAXIMUM_OPACITY;
	
	if(SetLayeredWindowAttributes(hWnd, NULL, opacity, LWA_ALPHA)) {
		ShowWindow(hWnd, SW_SHOW);
		return 0;
	}
	
	return -1;
}

int main(int argc, char** argv)
{
	const char *arg = argv[1];	
	
	arg++;
	
	switch(arg[0]) 
	{
	case 'c':
		cout << OUTPUT_STD_MESSAGE << endl;
		SetNodeWebkitWindowOpacity(stoi(argv[2]), argv[3]);
		break;
	}
	return 0;
}