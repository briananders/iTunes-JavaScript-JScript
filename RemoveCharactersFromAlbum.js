/*
This Program removes the number of characters from the front of the track's Album (value from variable "RemoveFromFront") 
and removes the number of characters from the end of the track Artist (value from variable "RemoveFromBack")

By Brian Anders
*/

var objApp = WScript.CreateObject("iTunes.Application");
var tracks = objApp.SelectedTracks;
var numTracks = tracks.Count;


var RemoveFromFront = 0;
var RemoveFromBack = 0;


while(numTracks != 0)
{
	var currTrack = tracks.Item(numTracks);
    
	currTrack.Album = currTrack.Album.substring(RemoveFromFront, currTrack.Album.length - RemoveFromBack); 
	
	numTracks--;
}

WScript.Echo("Done");