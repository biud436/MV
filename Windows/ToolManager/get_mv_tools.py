#!/usr/bin/env python
# -*-coding: utf-8 -*-
# Author : biud436

import sys
import copy

major_version = sys.version_info.major
if major_version == 2:
	from _winreg import *
elif major_version == 3:
	from winreg import *

import os
import platform
import json
import re

"""

Author : biud436
Usage:
	Open the command line and call here as follows.

		python get_mv_tools.py r
		python get_mv_tools.py w jsonRaw
		python get_mv_tools.py rw appName, hint, name, path

"""

class App:

	def __init__(self):
		self.commands = sys.argv
		self.sub_key = r"Software\KADOKAWA\RPGMV"		

	def run(self):
		mode = self.commands[1]
		if mode in ['r', 'w']:
			self.process_registry()
		elif mode in ['rw']:
			self.data = self.read_json()
			
			if self.commands.count >= 5:
				args = copy.copy(self.commands[2:6])
				new_data = self.make_item(*args)
				if self.add(new_data):
					self.write_json(self.data)
		else:
			print("Cannot find the mode in command line option")


	def read_json(self):
		key = OpenKey(HKEY_CURRENT_USER, self.sub_key)
		value, regtype = QueryValueEx(key, "mvTools")
		CloseKey(key)
		return json.loads(value.encode("utf8")) if major_version == 2 else json.loads(value)

	def write_json(self, value):
		key = OpenKey(HKEY_CURRENT_USER, self.sub_key, 0, KEY_ALL_ACCESS)
		value = json.dumps(value).encode("utf8") if major_version == 2 else json.dumps(value) 
		
		if isinstance(value, basestring):
			SetValueEx(key, "mvTools", 0, REG_SZ, value)
			print(value)
			CloseKey(key)	

	def make_item(self, appName, hint, name, path):
		posix_path = re.sub(r"\\", "/", path, 0, re.I)
		data = { 
			'appName': appName,
			'hint': hint,
			'name': name, 
			'path': posix_path,
		}
		return data

	def add(self, data):
		if self.data is None:
			return False

		if isinstance(self.data, list) is not True:
			return False
	
		self.data.append(data)

		return True
	
	def process_registry(self):

		varSubkey = self.sub_key

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