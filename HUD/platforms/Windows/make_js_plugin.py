import glob
import os
import re

extend_string = """\n
(function() {
  if(!Utils.isNwjs()) return;
  var path = require('path');
  var base = path.dirname(process.mainModule.filename);   
  var srcName = path.join(base, 'js', 'plugins', '%s.bin');
  require('nw.gui').Window.get().evalNWBin(null, srcName);
})();
"""

def is_rmmv_javascript(line):
	# result = re.match( r'((?:\/\*\:[a-zA-Z]*)(?:\s*\*.*\s*)*\s*\*\/)', line, re.M|re.I)
	result = re.findall( r'(\s*\/\*\:[a-zA-Z]*)', line, re.M|re.I)
	return result

if not os.path.exists("build"):
    os.makedirs("build")
	
file_list = glob.glob("*.js")
if file_list:
	for file_path in file_list:
		origin_name = file_path[:-3]
		
		# whitelist
		if origin_name == "--------------------":
			print "%s : PASS" % origin_name
			continue
			
		save_file_name = os.path.join(".", "build", origin_name + ".js");
		with open(file_path, 'r+') as fp:
			seek_p = 0
			# while(bool(is_rmmv_javascript(fp.readline()))):
				# seek_p += 1
				
			fp.seek(0)
			read_data = "".join(fp.readlines()[seek_p:-1])
			match_obj = is_rmmv_javascript(read_data)
			if bool(match_obj):
				print "%s : FOUND HEADER" % origin_name
				headsize = len(match_obj)
				temp = read_data.split('*/')
				if headsize == 1:
					final_read_data = temp[0] + "*/"
				if headsize == 2:
					final_read_data = temp[0] + "*/" + temp[1] + "*/"
			else:
				print "%s : NOT FOUND HEADER" % origin_name
				fp.seek(0)
				final_read_data = fp.read()
		with open(save_file_name, 'w+') as fp:
			if final_read_data: 
				fp.write(final_read_data + extend_string % (origin_name))
			
		
	

