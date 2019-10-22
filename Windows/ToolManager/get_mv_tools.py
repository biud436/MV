#!/usr/bin/env python
# -*-coding: utf-8 -*-
# Author : biud436

from _winreg import *
import sys
import os
import platform

varSubkey = r"Software\KADOKAWA\RPGMV"

# Read
if sys.argv[1] == "r":
	key = OpenKey(HKEY_CURRENT_USER, varSubkey)
	value, regtype = QueryValueEx(key, "mvTools")
	CloseKey(key)
	print value.encode("utf-8")

# Write
if sys.argv[1] == "w":
	key = OpenKey(HKEY_CURRENT_USER, varSubkey)
	value = sys.argv[2]
	if isinstance(value, basestring):
		SetValue(key, "mvTools", REG_SZ, value)
		CloseKey(key)
		print value.encode("utf-8")
