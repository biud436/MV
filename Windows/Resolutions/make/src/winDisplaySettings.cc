#include <nan.h>
#include <node.h>
#include <string>
#include <iostream>
#include <cstdlib>
#include <vector>

#if defined(_WIN32) || defined(WIN32)
	#include <Windows.h>
#endif

namespace RSDisplayInfo {

	typedef struct _stDisplay {
		int bits;
		int width;
		int height;
		int freq;
	} stDisplay;	

	using v8::FunctionCallbackInfo;
	using v8::Isolate;
	using v8::Local;
	using v8::Object;
	using v8::String;
	using v8::Value;

	NAN_METHOD(GetDisplaySettings) {
			
		v8::Isolate* isolate = info.GetIsolate();
		v8::Local<v8::Array> retArray = Nan::New<v8::Array>();
		 
		#if defined(_WIN32) || defined(WIN32)

			DEVMODE dm; 
			ZeroMemory(&dm, sizeof(dm)); 
			dm.dmSize = sizeof(dm);		

			std::vector<stDisplay> res;

			int lastWidth = 0;
			int lastHeight = 0;
			int lastBits = 0;
			int lastFreq = 0;

    		bool isInValid = false;

			for (int i = 0; EnumDisplaySettings(NULL, i, &dm) != 0; i++)
			{
				stDisplay displayInfo;

				displayInfo.width = dm.dmPelsWidth;
				displayInfo.height = dm.dmPelsHeight;
				displayInfo.bits = dm.dmBitsPerPel;
				displayInfo.freq = dm.dmDisplayFrequency;

				isInValid = ((displayInfo.width == lastWidth) && (displayInfo.height == lastHeight) && (displayInfo.bits == lastBits) && (displayInfo.freq == lastFreq));		
				
				if(!isInValid) {
					res.push_back(displayInfo);
				}

				lastWidth = displayInfo.width;
				lastHeight = displayInfo.height;
				lastBits = displayInfo.bits;
				lastFreq = displayInfo.freq;				

			}	

    		std::vector<stDisplay>::iterator iter;

			int i = 0;
			for(iter = res.begin(); iter != res.end(); iter++) {
				v8::Local<v8::Array> newItem = Nan::New<v8::Array>();
				Nan::Set(newItem, 0, Nan::New<v8::Number>((*iter).width));
				Nan::Set(newItem, 1, Nan::New<v8::Number>((*iter).height));
				Nan::Set(newItem, 2, Nan::New<v8::Number>((*iter).freq));
				Nan::Set(newItem, 3, Nan::New<v8::Number>((*iter).bits));
				Nan::Set(retArray, i++, newItem);
			}			
	
			info.GetReturnValue().Set( retArray );
		
		#else

			args.GetReturnValue().Set( retArray );

		#endif 
	}
	
	NAN_MODULE_INIT(Init) {
		NAN_EXPORT(target, GetDisplaySettings);
	}

	NODE_MODULE(winDisplaySettings, Init)

}
