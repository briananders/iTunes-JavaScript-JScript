/* 
This Program trims the whitespace from both sides of the Name 
for each track.

gets tracks from the "test" playlist.

By Brian Anders
*/

function trim10 (str) {
	var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
	for (var i = 0; i < str.length; i++) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(i);
			break;
		}
	}
	for (i = str.length - 1; i >= 0; i--) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}


var objApp = WScript.CreateObject("iTunes.Application");
var tracks = objApp.SelectedTracks;
var numTracks = tracks.Count;


while(numTracks != 0)
{
	var   currTrack = tracks.Item(numTracks);
      
	Tname = currTrack.Name;
	Tname = trim10(Tname);
	//WScript.Echo(currTrack.Name + " --is now--> " + Tname);
	currTrack.Name = Tname; 
	
	numTracks--;
}

WScript.Echo("Done");