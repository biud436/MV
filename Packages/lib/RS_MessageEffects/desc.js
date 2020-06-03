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
 * 이 플러그인은 한글 메시지 시스템 플러그인이 있어야 동작합니다.
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
 * 간단하게는 심플형으로 \E[n]를 사용할 수도 있습니다.
 * 심플형은 다음과 같이 사용할 수 있습니다.
 * 
 * \E[1]안녕하세요.
 * \E[2]반갑습니다.
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
 */ 
