//================================================================
// RS_MenuInformation.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * RS_MenuInformation.js
 * @plugindesc This plugin provides the Information Window that adds a text via the global variable.
 * @author biud436
 *
 * @param Menu Name
 * @desc Type the menu name
 * @default Information
 *
 * @help
 * You might want to add a new text string in current line. This plugin command
 * is stored as text strings in the global memory space until the game ends.
 *
 *    MenuInformation add Hello, World
 *    MenuInformation add \image<picture_name> image1...
 *    MenuInformation add \image<picture_name:90> image2...
 *
 * Here plugin command is deleted all texts that are stored in the global memory
 * space.
 *
 *    MenuInformation clear
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.01.04 (v1.0.0) - First Release.
 * 2016.02.27 (v1.0.1) - Fixed a few code (makeCommandList → addOriginalCommands)
 * 2016.03.05 (v1.0.1b) - Fixed the class structure.
 * 2017.01.23 (v1.0.2) - Converted sources to ES6.
 * 2017.09.06 (v1.0.3) - Converted sources to ES5.
 * 2019.07.05 (v1.0.4) :
 * - Added the image text code.
 * 2020.02.13 (v1.0.5) :
 * - it is saved the menu information in the save file.
 * - Now it is possible to run this plugin even in the RMMV 1.5.2 or less.
 */
/*:ko
 * @plugindesc 간단한 텍스트를 표기할 수 있는 창을 만들 수 있습니다.
 * @author biud436
 *
 * @param Menu Name
 * @text 메뉴 이름
 * @desc 메뉴에 추가될 버튼의 이름을 적으세요.
 * @default Information
 *
 * @help
 * =============================================================================
 * 플러그인 명령에 대해...
 * =============================================================================
 * 
 * 정보 창에 새로운 라인을 추가하려면 다음 명령을 사용하세요.
 *
 *    MenuInformation add Hello, World
 *    MenuInformation add \image<picture_name> wow...
 *    MenuInformation add \image<picture_name:90> image2...
 *
 * 모든 텍스트를 삭제하려면 다음 명령을 사용하세요.
 *
 *    MenuInformation clear
 * 
 * 스크립트 호출을 위한 메서드는 제공되지 않습니다.
 *
 * =============================================================================
 * 변동 사항
 * =============================================================================
 * 2016.01.04 (v1.0.0) - 출시.
 * 2016.02.27 (v1.0.1) - 약간의 코드 수정 (makeCommandList → addOriginalCommands)
 * 2016.03.05 (v1.0.1b) - 클래스 구조가 수정되었습니다.
 * 2017.01.23 (v1.0.2) - 소스를 ES6으로 변환했습니다.
 * 2017.09.06 (v1.0.3) - 소스를 ES5로 변환했습니다.
 * 2019.07.05 (v1.0.4) :
 * - 이미지 텍스트 코드 추가
 * 2020.02.13 (v1.0.5) :
 * - 세이브 파일에 메뉴 정보가 저장되게 하였습니다.
 * - 이제 1.5.2 이하 버전에서도 실행가능합니다.
 */

var Imported = Imported || {};
Imported.RS_MenuInformation = true;

