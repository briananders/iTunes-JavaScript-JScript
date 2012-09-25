/*
This Program adds to the Play Count.

By: Brian Anders
*/
var Amount = 5;

var iTunesApp = WScript.CreateObject("iTunes.Application");
var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
var Tracks = iTunesApp.SelectedTracks;
var numtracks = Tracks.Count;


while(numtracks > 0)
{
	var currTrack = Tracks.Item(numtracks);
	var Artist = currTrack.Artist;
	var Name = currTrack.Name;
	var Album = currTrack.Album;
	var Track = currTrack.TrackNumber;
	var count = currTrack.PlayedCount;

	currTrack.PlayedCount += Amount;

	numtracks--;
 
}

WScript.Echo("Done!");
