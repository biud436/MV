Window_NameInput.ARABIC1 = [ 
    '١','٢','٣','٤','٥',  '٦','٧','٨','٩','٠',
   'ذ','د','خ','ح','ج',  'ث','ت','ب','أ','ا',
   'غ','ع','ظ','ط','ض',  'ص','ش','س','ز','ر',
   'ي','ؤ','و','ه','ن',  'م','ل','ك','ق','ف',
   '','','','ـ','ئ',  'ى','ة','آ','إ','ء',
   '~','!','@','#','$',  '%','^','&','*','(',
   ')','_','+','=','-',   '','','','','',
   '','','','','',   '','','','','',
   ' ',' ',' ',' ',' ',  ' ',' ',' ','Page','OK' 
];

Window_NameInput.ARABIC2 = [ 
   '0','1','2','3','4',   '5','6','7','8','9',
   'A','B','C','D','E',  'a','b','c','d','e',
   'F','G','H','I','J',  'f','g','h','i','j',
   'K','L','M','N','O',  'k','l','m','n','o',
   'P','Q','R','S','T',  'p','q','r','s','t',
   'U','V','W','X','Y',  'u','v','w','x','y',
   'Z','','','','',  'z','','','','',
   ' ',' ',' ',' ',' ',  ' ',' ',' ',' ',' ',
   ' ',' ',' ',' ',' ',  ' ',' ',' ','Page','OK' 
];      

class Window_ArabicNameInput extends Window_NameInput {

    standardFontFace() {
        if(!navigator.language.match(/^ar/)) {
            return super.standardFontFace();
        }

        return RS.ArabicNameEdit.Params.fontFace;
    }

    table() {
        return [Window_NameInput.ARABIC1,
            Window_NameInput.ARABIC2];            
    }

}

window.Window_NameInput = Window_ArabicNameInput;