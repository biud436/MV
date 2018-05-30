#include <nan.h>
#include <node.h>
#include <string>
#include <iostream>
#include <cstdlib>
#include <cstring>

#if defined(_WIN32) || defined(WIN32)
	#include <Windows.h>
	#include <tchar.h>
	#define _UNICODE
#endif

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

#if defined(_WIN32) || defined(WIN32)

	LPWSTR ConvertAnsiToUnicode(v8::Local<v8::Value> str) {
		
		Nan::Utf8String value(str);
		LPSTR szANSI = (LPSTR)*value;

		LPWSTR szUnicode;
		int nLen = MultiByteToWideChar(CP_ACP, 0, szANSI, -1, NULL, NULL);

		nLen = nLen * sizeof(WCHAR);
		szUnicode = (LPWSTR)malloc(nLen + 1);
		memset(szUnicode, 0, nLen + 1);

		MultiByteToWideChar(CP_ACP, 0, szANSI, -1, szUnicode, nLen);

		return szUnicode;
	}

	LPSTR ConvertWCharToChar(LPWSTR szUnicode) {

		LPSTR szAnsi;
		int nLen = WideCharToMultiByte(CP_ACP, 0, szUnicode, -1, NULL, 0, NULL, NULL);

		szAnsi = (LPSTR)malloc(nLen + 1);
		memset(szAnsi, 0, nLen + 1);

		WideCharToMultiByte(CP_ACP, 0, szUnicode, -1, szAnsi, nLen, NULL, NULL);

		return szAnsi;
	}

	LPSTR ConvertWCharToUtf8Char(LPWSTR szUnicode) {
		
		LPSTR szAnsi;
		int nLen = WideCharToMultiByte(CP_UTF8, 0, szUnicode, -1, NULL, 0, NULL, NULL);
		
		szAnsi = (LPSTR)malloc(nLen + 1);
		memset(szAnsi, 0, nLen + 1);

		WideCharToMultiByte(CP_UTF8, 0, szUnicode, -1, szAnsi, nLen, NULL, NULL);

		return szAnsi;
	}

	LPWSTR ConvertUtf8ToUnicode(v8::Local<v8::Value> str) {

		Nan::Utf8String value(str);
		LPSTR szUtf8Str = (LPSTR)*value;

		LPWSTR szUnicode;
		
		int nLen = MultiByteToWideChar(CP_UTF8, 0, szUtf8Str, -1, NULL, NULL);

		nLen = nLen * sizeof(WCHAR);
		szUnicode = (LPWSTR)malloc(nLen + 1);
		memset(szUnicode, 0, nLen + 1);

		MultiByteToWideChar(CP_UTF8, 0, szUtf8Str, -1, szUnicode, nLen);

		return szUnicode;

	}

	LPWSTR ConvertUnicodeToUTF8(LPWSTR szUnicode) {
		
		LPWSTR szUtf8;
		int nLen = WideCharToMultiByte(CP_UTF8, 0, szUnicode, -1, NULL, 0, NULL, NULL);
		
		szUtf8 = (LPWSTR)malloc(nLen + 1);
		memset(szUtf8, 0, nLen + 1);

		WideCharToMultiByte(CP_UTF8, 0, szUnicode, -1, (LPSTR)szUtf8, nLen, NULL, NULL);

		return szUtf8;
	}

	void WriteInitializationFile(const Nan::FunctionCallbackInfo<v8::Value>& info) {	

		if (info.Length() < 4) {
			Nan::ThrowTypeError("Wrong number of arguments");
			return;
		}

		if (!info[0]->IsString() || !info[1]->IsString() || 
			!info[2]->IsString() || !info[3]->IsString()) {
			Nan::ThrowTypeError("Wrong arguments");
			return;
		}

		LPCWSTR lpAppName = ConvertUtf8ToUnicode(info[0]);
		LPCWSTR lpKeyName = ConvertUtf8ToUnicode(info[1]);
		LPCWSTR lpString = ConvertUtf8ToUnicode(info[2]);
		LPCWSTR lpFileName = ConvertUtf8ToUnicode(info[3]);

		TCHAR szPath[MAX_PATH] = {0, };
		wchar_t *p = NULL;
		BOOL bRet = FALSE;

		bRet = ::WritePrivateProfileStringW(lpAppName, lpKeyName, lpString, lpFileName);

		if (bRet) {
			info.GetReturnValue().Set(Nan::True());
		}
		else {
			info.GetReturnValue().Set(Nan::False());
		}

	}

	void ReadInitializationFile(const Nan::FunctionCallbackInfo<v8::Value>& info) {	

		if (info.Length() < 3) {
			Nan::ThrowTypeError("Wrong number of arguments");
			return;
		}

		if (!info[0]->IsString() || !info[1]->IsString() || 
			!info[2]->IsString()) {
			Nan::ThrowTypeError("Wrong arguments");
			return;
		}

		LPWSTR lpAppName = ConvertUtf8ToUnicode(info[0]);
		LPWSTR lpKeyName = ConvertUtf8ToUnicode(info[1]);
		LPWSTR lpFileName = ConvertUtf8ToUnicode(info[2]);

		int nLen = (sizeof(LPWSTR) * MAX_PATH) + 1;
		LPWSTR lpString = (LPWSTR)malloc( nLen );
		memset(lpString, 0, sizeof(nLen + 1));
		
		BOOL bRet = FALSE;

		bRet = ::GetPrivateProfileStringW(lpAppName, lpKeyName, L"", lpString, nLen, lpFileName);
		
		const char* szStr = ConvertWCharToUtf8Char(lpString);

		if (bRet) {
			v8::Local<v8::String> value = v8::String::NewFromUtf8(v8::Isolate::GetCurrent(), szStr);
			info.GetReturnValue().Set(value);
		}
		else {
			info.GetReturnValue().Set(Nan::EmptyString());
		}

	}	

	void Init(v8::Local<v8::Object> exports, v8::Local<v8::Object> module) {
		exports->Set(Nan::New("WriteString").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(WriteInitializationFile)->GetFunction());
		exports->Set(Nan::New("ReadString").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(ReadInitializationFile)->GetFunction());
	}

#else

	void EmptyFunction(const Nan::FunctionCallbackInfo<v8::Value>& info) {	
		info.GetReturnValue().Set(Nan::Undefined());
	}

	void Init(v8::Local<v8::Object> exports, v8::Local<v8::Object> module) {
	}

#endif

NODE_MODULE(INI, Init)

}