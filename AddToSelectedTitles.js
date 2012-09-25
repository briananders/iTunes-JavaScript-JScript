/* 
This Program will add text from the variable "AddBefore"
to the beginning of the track Name and the text from the 
variable "AddAfter" to the end of the name.

By Brian Anders
*/

var objApp = WScript.CreateObject("iTunes.Application");
var tracks = objApp.SelectedTracks;
var numTracks = tracks.Count; 

var AddBefore = "";
var AddAfter = "";

while(numTracks != 0)
{
	var   currTrack = tracks.Item(numTracks);
      
	var Tname = currTrack.Name;
	var num = currTrack.Album.charAt(0);
/////
	var newName = ToBefore + Tname + AddAfter;
/////
	
	//WScript.Echo(currTrack.Name + " --is now--> " + newName);
	currTrack.Name = newName;

	numTracks--;
}

WScript.Echo("DONE");