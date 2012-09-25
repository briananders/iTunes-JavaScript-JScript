/*
This Program adds an "s" to the album and then later removes it to try to fix 
the song linking within the album. Sometimes the first track gets seperated from 
the rest of the album for no apparent reason. I have learned that the only way to
fix this is to change something about the album and this causes them all to reconnect.
this program is my attempt at a faster fix.

By: Brian Anders
*/

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
	currTrack.Album += "s";

	numtracks--;
}

numtracks = Tracks.Count;

while(numtracks > 0)
{
	var currTrack = Tracks.Item(numtracks);
	var Artist = currTrack.Artist;
	var Name = currTrack.Name;
	var Album = currTrack.Album;
	currTrack.Album = Album.substr(0,Album.length-1);

	numtracks--;
}

WScript.Echo("Done!");
