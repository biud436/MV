#!/usr/bin/env python
# -*-coding: utf-8 -*-
# Author : biud436


import sys

major_version = sys.version_info.major
if major_version == 2:
	from _winreg import *
elif major_version == 3:
	from winreg import *

import os
import platform

class App:

	def run(self):
		self.process_registry()
	
	def check(self):
		version = platform.python_version()[0:3]
		is_valid = False

		if version != None and version == "2.7":
			is_valid = True
		else:
			is_valid = False

		if not is_valid:
			raise Exception("Your python's version is not 2.7")

	def process_registry(self):

		varSubkey = r"Software\KADOKAWA\RPGMV"

		# Read
		if sys.argv[1] == "r":
			key = OpenKey(HKEY_CURRENT_USER, varSubkey)
			value, regtype = QueryValueEx(key, "mvTools")
			CloseKey(key)
			print(value.encode("utf8") if major_version == 2 else value)

		# Write
		if sys.argv[1] == "w":
			key = OpenKey(HKEY_CURRENT_USER, varSubkey, 0, KEY_ALL_ACCESS)
			value = sys.argv[2]
			if isinstance(value, basestring):
				SetValueEx(key, "mvTools", 0, REG_SZ, value)
				CloseKey(key)

app = App()
app.run()