// winDisplaySettings.cc
#include <node.h>
#include <string>
#include <iostream>
#include <cstdlib>

#if defined(_WIN32) || defined(WIN32)
	#include <Windows.h>
#endif

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value>& args) {
	Isolate* isolate = args.GetIsolate();
	args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world"));
}

void GetDisplaySettings(const FunctionCallbackInfo<Value>& args) {	
	Isolate* isolate = args.GetIsolate();
		 
	#if defined(_WIN32) || defined(WIN32)
		std::string szReturnSTR;
		char buffer[32];
		
		DEVMODE dm; 
		ZeroMemory(&dm, sizeof(dm)); 
		dm.dmSize = sizeof(dm);		
		
		for (int i = 0; EnumDisplaySettings(NULL, i, &dm) != 0; i++)
		{
			// width
			itoa(dm.dmPelsWidth, buffer, 10);
			szReturnSTR.append( buffer );
			szReturnSTR.append( " x " );
			// height
			itoa(dm.dmPelsHeight, buffer, 10);
			szReturnSTR.append( buffer );
			
			szReturnSTR.append( "\n" );
		}	
		
		args.GetReturnValue().Set(String::NewFromUtf8(isolate, szReturnSTR.c_str() ));
		
	#else
		args.GetReturnValue().Set(String::NewFromUtf8(isolate, "This OS is not supported" ));
	#endif 
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Method);
  NODE_SET_METHOD(exports, "GetDisplaySettings", GetDisplaySettings);
}

NODE_MODULE(winDisplaySettings, init)

}  // namespace demo