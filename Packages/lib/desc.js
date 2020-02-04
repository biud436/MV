//================================================================
// RS_MessageEffects.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc <RS_MessageEffects>
 * @author biud436
 * 
 * @param Default Text Effect
 * @type select
 * @desc Select desired text effect.
 * @default normal_rot
 * @option Ping Pong
 * @value pingpong
 * @option Slide
 * @value slide
 * @option high_rot
 * @value high_rot
 * @option normal_rot
 * @value normal_rot
 * @option random_rot
 * @value random_rot
 * @option None
 * @value none
 * 
 * @param New Page
 * 
 * @param Clear Flag
 * @parent New Page
 * @type boolean
 * @desc Clear the text effect as 'none' when opening a new page
 * @default false
 * @on true
 * @off false
 *          
 * @help
 * This help document does not support English translation yet.
 * This plugin is also incompatible with the YEP_MessageCore plugin.
 * 
 * ================================================================
 * 소개
 * ================================================================
 * 이 플러그인은 한글 메시지 시스템 플러그인과 호환됩니다.
 * 따로 부가 플러그인으로 내놓는 이유는 성능적 저하가 심하기 때문입니다.
 * 메인 플러그인에 이런 텍스트 기능을 넣게 되면 심각한 성능 저하가 올 수 있습니다.
 * 
 * 또한 Visual Novel Maker의 Design Pattern과 유사하게 상속 방식으로 개발하였습니다.
 * 따라서 이 플러그인은 RPG Maker MV v1.6.2 이상에서만 지원합니다.
 * 
 * 그러나 상속 방식의 패턴이 만드는 프로토타입 체인의 성능적 저하는 측정 및 검증되지 않았습니다.
 * 
 * 이외에도 성능적 저하의 요소는 더 있습니다.
 * 
 * //!! 성능 저하 요소 1
 * 텍스트는 캔버스를 생성한 후 동적으로 Texture를 만들고 GPU로 매 글자마다
 * 새로운 Texture를 업로드를 하게 됩니다.
 * 
 * 각 글자를 새로운 Texture로 형성해야 하므로 최적화에 좋지 않습니다.
 * 
 * 가장 좋은 방법은 Bitmap Text를 사용하여 미리 업로드된 Texture를 사용하는
 * 방식입니다.
 * 
 * 이렇게 하면 Draw Call이 추가로 들지 않습니다.
 * Bitmap Text는 글꼴 형성에 큰 제한이 있으므로 아직까지 지원하진 않습니다.
 * 
 * 따라서 PC가 아니라면 이 플러그인은 사용하기 부적절합니다.
 * 모바일에서는 사용을 하지 마시기 바랍니다.
 * 
 * //!! 성능 저하 요소 2
 * Draw Call 문제 이외에도, 이 플러그인은 대부분 삼각 함수를 이용하여 
 * 계산을 하고 있습니다.
 * 
 * 삼각 함수는 CPU에 부담을 주며 실제로 성능이 저하될 수 있습니다.
 * 성능 저하 시기는 대화창 페이지가 새로 형성될 때 입니다.
 * 
 * 삼각 함수는 업데이트 이전에 작성된 데이터를 사용하면 좋겠으나,
 * 실시간으로 데이터를 바꿔야 하므로 페이지가 열려있을 땐 매 시간 계산됩니다.
 * 
 * //!! 성능 저하 요소 3
 * 자바스크립트에서는 아직 C# 코루틴 같은 재진입 요소를 사용하기가 까다롭기 때문에,
 * 프레임워크 내에서 한시적으로 오브젝트를 업데이트를 시키는 것이 힘이 듭니다.
 * 
 * 따라서 페이지가 열려있을 때 글자 갯수마다 의미 없는 오브젝트 업데이트 함수가 호출됩니다.
 * 
 * 물론 이를 해결할 방법은 있습니다.
 * 텍스트 묘화가 끝난 후, 하나의 텍스쳐로 업로드를 하거나 
 * Ticker나 Event Listener 등으로 한시적 업데이트를 구현하는 것입니다.
 * 
 * 그러나 이렇게 검증되지 않은 방식에 투자할 시간은 없습니다.
 * 
 * ================================================================
 * Text Codes
 * ================================================================
 * 다음과 같은 텍스트 코드를 사용할 수 있습니다.
 * 
 *  \텍스트효과<효과명>
 *  \TE<TEXT_EFFECT_NAME>
 * 
 * 다음 명령은 부드럽게 상하로 부드럽게 흔들리는 이펙트를 줍니다.
 * 
 * \텍스트효과<pingpong>
 * \TE<pingpong>
 * 
 * 다음 명령은 투명도 증감과 함께 좌우로 살짝 흔들리는 이펙트를 줍니다.
 * 
 * \텍스트효과<slide>
 * \TE<slide>
 * 
 * 글자가 어딘가에서 날라와 제자리를 빠르게 찾아갑니다.
 * 
 * \텍스트효과<high_rot>
 * \TE<high_rot>
 * 
 * 규칙적으로 방향도 전환하면서 제자리를 찾는 효과입니다.
 * 
 * \텍스트효과<normal_rot>
 * \TE<normal_rot>
 * 
 * 불규칙적인 패턴으로 제자리를 찾아갑니다.
 * 
 * \텍스트효과<random_rot>
 * \TE<random_rot>
 * 
 * 이외로 텍스트 효과를 없애고 싶다면 다음과 같습니다.
 * 
 * \텍스트효과<none>
 * \TE<none>
 * 
 * 주의할 점은 텍스트 효과 문자열은 대소문자를 구분한다는 점입니다.
 * 
 * ================================================================
 * Plugin Commmands
 * ================================================================
 * 다음 명령은 부드럽게 상하로 부드럽게 흔들리는 이펙트를 줍니다.
 * 
 * MessageEffectMap pingpong
 * 
 * 다음 명령은 투명도 증감과 함께 좌우로 살짝 흔들리는 이펙트를 줍니다.
 * 
 * MessageEffectMap slide
 * 
 * 글자가 어딘가에서 날라와 제자리를 빠르게 찾아갑니다.
 * 
 * MessageEffectMap high_rot
 * 
 * 규칙적으로 방향도 전환하면서 제자리를 찾는 효과입니다.
 * 
 * MessageEffectMap normal_rot
 * 
 * 불규칙적인 패턴으로 제자리를 찾아갑니다.
 * 
 * MessageEffectMap random_rot
 * 
 * 대소문자를 구분하므로 소문자를 대문자를 적지 않도록 해주세요.
 * 
 * ================================================================
 * Change Log
 * ================================================================
 * 2020.01.24 (v1.0.0) - First Release.
 */ 
