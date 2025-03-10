//================================================================
// RS_HotFixHudMaker.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc <RS_HotFixHudMaker>
 * @author biud436
 *
 * @help
 * SumRndmDde님의 SuperToolsEngine 사용 시,
 * 안드로이드(Android) 플랫폼에서 파싱 오류가 생기는 문제를 수정합니다.
 *
 * 원칙적으로는 process.versions['node-webkit'] 부분을
 * Utils.isNwjs()로 교체해주는 것이 best 방법입니다.
 *
 * 하지만 라이센스 문제로 인하여, 플러그인 파일을 직접 건드리기 제한되므로,
 * process.versions['node-webkit']가 있는 것처럼 속이는 방법을 사용하였습니다.
 *
 * 플러그인은 SRD_SuperToolsEngine.js보다 먼저 삽입되어야 합니다.
 */

var Imported = Imported || {};
Imported.RS_HotFixHudMaker = true;

if (Utils.isMobileDevice()) {
  if (!process) {
    var process = {};
    process.versions = {};
    process.versions['node-webkit'] = '0.0.0';
  }
}
