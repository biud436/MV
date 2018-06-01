#!/usr/bin/env python
# Author : biud436

from _winreg import *
import sys
import os
import platform

# Is the architecture of Windows OS is 64bit?
def is_windows_64bit():
	if 'PROCESSOR_ARCHITEW6432' in os.environ:
		return True
	return os.environ['PROCESSOR_ARCHITECTURE'].endswith('64')

# Set the default key for 32bit
varSubkey = r"SOFTWARE\KADOKAWA\RPGMV"

# Set the default key for 64bit
if is_windows_64bit():
	varSubkey = r"SOFTWARE\Wow6432Node\KADOKAWA\RPGMV"
	
registry_key = OpenKey(HKEY_LOCAL_MACHINE, varSubkey, 0, KEY_READ)
value, regtype = QueryValueEx(registry_key, "applicationpath")

# output
print value.replace('\\','/')