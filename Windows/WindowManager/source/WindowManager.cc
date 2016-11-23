// WindowManager.cc
#include <node.h>
#include <string>
#include <iostream>
#include <cstdlib>

#if defined(_WIN32) || defined(WIN32)
	#include <Windows.h>
#endif

namespace RS {
		
	using v8::FunctionCallbackInfo;
	using v8::Isolate;
	using v8::Local;
	using v8::Object;
	using v8::String;
	using v8::Value;

	void SetAlpha(const FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = args.GetIsolate();
		
		double value = args[0]->NumberValue();
		
		if(value > 255) {
			value = 255.0f;
		}
		if(value < 0) {
			value = 0.0f;
		}
		
		// Find Window
		HWND hWnd = ::FindWindow("Chrome_RenderWidgetHostHWND", NULL);
		if(hWnd == NULL) {
			hWnd = ::FindWindow("Chrome_WidgetWin_0", NULL);
		}
			
		::SetWindowLong(hWnd, GWL_EXSTYLE, ::GetWindowLong(0, GWL_EXSTYLE) | WS_EX_LAYERED);
		::SetLayeredWindowAttributes(hWnd, 0, (int)value, LWA_ALPHA);
		::ShowWindow(hWnd, 5);
		args.GetReturnValue().Set(value);
	}

	void init(Local<Object> exports) {
	  NODE_SET_METHOD(exports, "setAlpha", SetAlpha);
	}

	NODE_MODULE(WindowManager, init)

}