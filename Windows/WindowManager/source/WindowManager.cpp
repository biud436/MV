/**
 * @author biud436
 * @date 08.29.2017
 */
 
#include <Windows.h>
#include <iostream>
#include <string>
#include <tchar.h>

#define NW_CLASS_NAME "Chrome_WidgetWin_0"
#define NW_WINDOW_NAME NULL
#define MINIMUM_OPACITY 0
#define MAXIMUM_OPACITY 255
#define OUTPUT_STD_MESSAGE "Adjusted the opacity of the window"

using namespace std;

HWND g_hWnd;

BOOL CALLBACK EnumWindowsProc(HWND hWnd, LPARAM lParam) {
    char buff[255];
	string szClassName = NW_CLASS_NAME;
	string szWindowName = (TCHAR*)lParam;
	
    if (IsWindowVisible(hWnd)) {	
		GetWindowText(hWnd, (LPSTR) buff, 254);		
		
		if(szWindowName.compare(buff) != 0) {
			return TRUE;
		}
		
		memset(buff, 0, 255);
		GetClassName(hWnd, (LPSTR) buff, 254);
		
		if(szClassName.compare(buff) != 0) {
			return TRUE;
		}
		
		g_hWnd = hWnd;
    }
	
    return TRUE;
}

int SetNodeWebkitWindowOpacity(int opacity, string wndName)
{	
	BOOL ret = EnumWindows(EnumWindowsProc, (LPARAM)wndName.c_str());
	
	if(g_hWnd == NULL) {
		return -1;
	}
	
	cout << g_hWnd << endl;
		
	LONG exStyle = GetWindowLong(g_hWnd, GWL_EXSTYLE);
		
	SetWindowLong(g_hWnd, GWL_EXSTYLE, exStyle | WS_EX_LAYERED);		
		
	if(opacity < MINIMUM_OPACITY) 
		opacity = MINIMUM_OPACITY;
	
	if(opacity > MAXIMUM_OPACITY) 
		opacity = MAXIMUM_OPACITY;
	
	if(SetLayeredWindowAttributes(g_hWnd, NULL, opacity, LWA_ALPHA)) {
		ShowWindow(g_hWnd, SW_SHOW);
		return 0;
	}
	
	return -1;			
	
}

int main(int argc, char** argv)
{
	const char *arg = argv[1];	
	g_hWnd = NULL;
	
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