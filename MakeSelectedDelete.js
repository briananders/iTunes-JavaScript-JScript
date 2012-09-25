/*
This Program finds all exact duplicates in the selected tracks (same name, artist, album, and time) and makes the Genre = "Deleted " [current Genre]

By: Brian Anders
*/

var TrackTimeList = new Array();

Main();

function Main()
{
	var objApp = WScript.CreateObject("iTunes.Application");
	var tracks = objApp.SelectedTracks;
	var numTracks = tracks.Count;
	var deleteCount = 0;
	
	while(numTracks != 0)
	{
		currTrack = tracks.Item(numTracks);
		
		if(isNaN(TrackTimeList[currTrack.Artist + currTrack.Album + currTrack.Name + currTrack.Time]))
		{	
			TrackTimeList[currTrack.Artist + currTrack.Album + currTrack.Name + currTrack.Time] = 1;
		}
		else
		{
			currTrack.Genre = "Delete " + currTrack.Genre;
			deleteCount++;
		}
		numTracks--;
	}

WScript.Echo("Marked " + deleteCount + " Songs");
}

