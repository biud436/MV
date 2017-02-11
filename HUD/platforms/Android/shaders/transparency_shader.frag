#define GLSLIFY 1

precision mediump float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform float enabled;

uniform sampler2D uSampler;
uniform sampler2D uAlphaSampler;

void main(void) {

   vec4 texColor1 = texture2D(uSampler, vCoord);
   vec4 retColor = vec4(texColor1.rgb, texture2D(uAlphaSampler, vCoord).r);
   
   if(enabled > 0.0) {

     // If it does not have an alpha channel
     retColor.rgb *= retColor.a;

		 gl_FragColor = texColor1 * vColor;

   } else {

     gl_FragColor = texColor1;
     gl_FragColor.a = retColor.a;

   }
}
