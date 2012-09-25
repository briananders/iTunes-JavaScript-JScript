/*
This Program finds all exact duplicates (same name, artist, album, and time) and makes the Genre = "Deleted " [current Genre]

By: Brian Anders
*/

var TrackTimeList = new Array();

Main();

function Main()
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	var tracks = mainLibrary.Tracks;
	var numTracks = tracks.Count;
	var deleteCount = 0;
	
	for (var i = 1; i <= numTracks; i++)
	{
		currTrack = tracks.Item(i);
		
		if(isNaN(TrackTimeList[currTrack.Artist + currTrack.Album + currTrack.Name + currTrack.Time]))
		{	
			TrackTimeList[currTrack.Artist + currTrack.Album + currTrack.Name + currTrack.Time] = 1;
		}
		else
		{
			currTrack.Genre = "Delete " + currTrack.Genre;
			deleteCount++;
		}
	}



WScript.Echo("Marked " + deleteCount + " Songs");
}

