/*
This Program goes through the music library and unifies the year for all the tracks in each album.

By Brian Anders
*/

var iTunesApp = WScript.CreateObject("iTunes.Application");
var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");

var tracks = iTunesApp.SelectedTracks;
var numTracks = tracks.Count;

var YearArr = new Array();

while(numTracks != 0)
{
	var currTrack = tracks.Item(numTracks);
    var Year = currTrack.Year;
	var Album = currTrack.Album;
	
	if (isNaN(YearArr[Album]) && (Year != "" || Year != 0))
	{
		YearArr[Album] = Year;
	}
	
	numTracks--;
}

numTracks = tracks.Count;

while(numTracks != 0)
{
	var currTrack = tracks.Item(numTracks);
    var Year = currTrack.Year;
	var Album = currTrack.Album;
	
	if (!(isNaN(YearArr[Album])))
	{
		currTrack.Year = YearArr[Album];
	}
	
	numTracks--;
}

WScript.Echo("Done");