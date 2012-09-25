/*
This program takes two playlists and creates a Union of the two in a new playlist.

By Brian Anders
*/


var Playlist1 = "Intersection of Block Party By Album and Block Party By AlbumArtist";		//Playlist 1
var Playlist2 = "Union of Block Party By Album and Block Party By AlbumArtist";	//Playlist 2


var   iTunesApp = WScript.CreateObject("iTunes.Application");
var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName(Playlist1);//Playlist 1
var   tracks = mainLibrary.Tracks;
var   numTracks = tracks.Count;

var Playlist = iTunesApp.CreatePlaylist("Union of " + Playlist1 + " and " + Playlist2);

var Pone = new Array();
for(var i = 1; i <= numTracks; i++)
{
	var currTrack = tracks.Item(i);
	var Location = currTrack.Location;
	if(Pone[Location] != 1)
	{
		Pone[Location] = 1;
		Playlist.AddTrack(currTrack);
	}
}


var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName(Playlist2);//Playlist 2
var   tracks = mainLibrary.Tracks;
var   numTracks = tracks.Count;

for(var i = 1; i <= numTracks; i++)
{
	var currTrack = tracks.Item(i);
	var Location = currTrack.Location;
	if(Pone[Location] != 1)
	{
		Playlist.AddTrack(currTrack);
	}
}

WScript.Echo("Done!");