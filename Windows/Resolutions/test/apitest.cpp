#include <Windows.h>
#include <string>
#include <iostream>
#include <cstdlib>
#include <vector>

typedef struct _stDisplay {
	int bits;
	int width;
	int height;
	int freq;
} stDisplay;

int main(int argc, char** argv) 
{
    
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

        isInValid = (displayInfo.width == lastWidth) && 
        (displayInfo.height == lastHeight) && 
        (displayInfo.bits == lastBits) &&
        (displayInfo.freq == lastFreq);

        if(!isInValid) {
            res.push_back(displayInfo);
        }

        lastWidth = displayInfo.width;
        lastHeight = displayInfo.height;
        lastBits = displayInfo.bits;
        lastFreq = displayInfo.freq;
    }

    std::vector<stDisplay>::iterator iter;

    for(iter = res.begin(); iter != res.end(); iter++) {
        std::cout << (*iter).width << ":" << (*iter).height << ":" << (*iter).freq << ":" << (*iter).bits << std::endl;
    }

    return 0;
}