{
	'variables': {
		'rm_version': '<!(node tools/versions.js)',		
		'target_dir': 'bin'
	},
  
	'conditions': [
		['OS=="win"', {
		  'conditions': [
		  
			['target_arch=="ia32"', {
				'variables': {
					'project_name': '<(rm_version)-INI-ia32'
				}
			}],
			
			['target_arch=="x64"', {
				'variables': {
					'project_name': '<(rm_version)-INI-x64'
				}
			}]
			
		  ]
		}]
	],
	
	'targets': [
		{
			"target_name": '<(project_name)',
			"sources": [ "src/INI.cc" ],
			"include_dirs": [
				"src",
				"<!(node -e \"require('nan')\")"
			]
		},
		{
			'target_name': 'copy_binaries',
			'dependencies': [
				'<(project_name)'
			],
			'type': 'none',		
			'actions': [
				{		
					'action_name': 'Copy Binaries',
					'inputs': [
						'<(PRODUCT_DIR)/<(project_name).node'
					],			
					'outputs': [
						'<(target_dir)'
					],
					'action': [		
						'python',
						'tools/copy_binaries.py',
						'<@(_inputs)',
						'<@(_outputs)'			
					]		
				}
			]
		}
	]
}