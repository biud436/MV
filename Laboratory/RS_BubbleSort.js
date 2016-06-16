//===================================================
// RS_BubbleSort.js
//===================================================
/*:
 * @plugindesc BubbleSort v1.0.0
 * @help 
 * O(n^2)
 */
 
var Imported = Imported || {};
Imported.RS_BubbleSort = true;

var RS = RS || {};
RS.Sort = RS.Sort || {};

(function(){
	
	RS.Sort.BubbleSort = function(arr) {
		var temp;
		var n = arr.length;
		for(var i=0; i< n-1; i++) {
			for(var j=0; j<(n-i)-1; j++) {
				if(arr[j] > arr[j+1]) {
					temp = arr[j];
					arr[j] = arr[j+1];
					arr[j+1] = temp;
				}
			}
		}
		return arr;
	}
	
})();