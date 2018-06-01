#include <nan.h>
#include <node.h>
#include <string>
#include <iostream>
#include <cstdlib>

#if defined(_WIN32) || defined(WIN32)
	#include <Windows.h>
#endif

namespace RSDisplayInfo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void RSChangeDisplaySettings(const Nan::FunctionCallbackInfo<v8::Value>& args) {	

	HDC hDC = CreateDC("DISPLAY", NULL, NULL, NULL);
	bool bFullscreen = false;
	
	int width = GetDeviceCaps(hDC, HORZRES);
	int height = GetDeviceCaps(hDC, VERTRES);

	DeleteDC(hDC);

	if (args.Length() < 2) {
		Nan::ThrowTypeError("Wrong number of arguments");
		return;
	}

	if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
		Nan::ThrowTypeError("Wrong arguments");
		return;
	}

	int nWindowWidth = args[1]->NumberValue();
	int nWindowHeight = args[2]->NumberValue();

	if (width != nWindowWidth || height != nWindowHeight) {

		DEVMODE dm;
		memset(&dm, 0, sizeof(dm));

		dm.dmSize = sizeof(dm);
		dm.dmPelsWidth = nWindowWidth;
		dm.dmPelsHeight = nWindowHeight;
		dm.dmBitsPerPel = 32;
		dm.dmFields = DM_BITSPERPEL | DM_PELSWIDTH | DM_PELSHEIGHT;

		ChangeDisplaySettings(&dm, CDS_UPDATEREGISTRY);
		args.GetReturnValue().Set(Nan::True());
	}

	args.GetReturnValue().Set(Nan::False());

}

void GetDisplaySettings(const Nan::FunctionCallbackInfo<v8::Value>& args) {	
	
	v8::Isolate* isolate = args.GetIsolate();
	v8::Local<v8::Array> retArray = Nan::New<v8::Array>();
		 
	#if defined(_WIN32) || defined(WIN32)

		DEVMODE dm; 
		ZeroMemory(&dm, sizeof(dm)); 
		dm.dmSize = sizeof(dm);		

		for (int i = 0; EnumDisplaySettings(NULL, i, &dm) != 0; i++)
		{
			// Create a new array
			v8::Local<v8::Array> newItem = Nan::New<v8::Array>();
			Nan::Set(newItem, 0, Nan::New<v8::Number>(dm.dmPelsWidth));
			Nan::Set(newItem, 1, Nan::New<v8::Number>(dm.dmPelsHeight));

			// Add
			Nan::Set(retArray, i, newItem);
		}	
	
		args.GetReturnValue().Set( retArray );
		
	#else

		args.GetReturnValue().Set( retArray );

	#endif 
}

void Init(v8::Local<v8::Object> exports, v8::Local<v8::Object> module) {
	exports->Set(Nan::New("GetDisplaySettings").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(GetDisplaySettings)->GetFunction());
	exports->Set(Nan::New("ChangeDisplaySettings").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(RSChangeDisplaySettings)->GetFunction());
}

NODE_MODULE(winDisplaySettings, Init)

}