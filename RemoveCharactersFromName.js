/*
This Program removes the number of characters from the front of the track name (value from variable "RemoveFromFront") 
and removes the number of characters from the end of the track name (value from variable "RemoveFromBack")

By Brian Anders
*/

var objApp = WScript.CreateObject("iTunes.Application");
var tracks = objApp.SelectedTracks;
var numTracks = tracks.Count;


var RemoveFromFront = 0;
var RemoveFromBack = 0;


while(numTracks != 0)
{
	var   currTrack = tracks.Item(numTracks);
      
	Name = currTrack.Name;

	currTrack.Name = currTrack.Name.substring(RemoveFromFront, currTrack.Name.length - RemoveFromBack); 
	//WScript.Echo(currTrack.Name.substring(RemoveFromFront, currTrack.Name.length - RemoveFromBack));
	numTracks--;
}

WScript.Echo("Done");