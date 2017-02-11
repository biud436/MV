#define GLSLIFY 1

precision mediump float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;
uniform sampler2D uAlphaSampler;

void main(void) {
   vec4 texColor = texture2D(uSampler, vCoord);
   vec4 retColor = vec4(texColor.rgb, texture2D(uAlphaSampler, vCoord).r);
   retColor.rgb *= retColor.a;
   gl_FragColor = texColor * vColor;
}
