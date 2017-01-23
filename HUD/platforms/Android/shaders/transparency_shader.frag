#define GLSLIFY 1

precision mediump float;

varying vec2 vTextureCoord;

uniform float enabled;

uniform sampler2D uSampler;
uniform sampler2D uAlphaSampler;

void main(void) {
   gl_FragColor = texture2D(uSampler, vCoord);
   if(enabled > 0.0) {
		gl_FragColor.a = texture2D(uAlphaSampler, vCoord).r;
   }
}