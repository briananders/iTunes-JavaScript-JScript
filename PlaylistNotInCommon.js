/*
This program takes two playlists, finds the songs that it doesn't have in common, and puts those in 
a new playlist.
not(in(playlist1) and in(playlist2))

By Brian Anders
*/

var Playlist1 = "Sorted The Beatles";		//Playlist 1
var Playlist2 = "beatles";	//Playlist 2


var   iTunesApp = WScript.CreateObject("iTunes.Application");
var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName(Playlist1);//Playlist 1
var   tracks = mainLibrary.Tracks;
var   numTracks = tracks.Count;

var Pone = new Array();
for(var i = 1; i <= numTracks; i++)
{
	var currTrack = tracks.Item(i);
	var Location = currTrack.Location;
	if(Pone[Location] == 1)
	{
		Pone[Location]++;
	}
	else if(Pone[Location] == null)
	{
		Pone[Location] = 1;
	}
}

var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName(Playlist2);//Playlist 2
var   tracks = mainLibrary.Tracks;
var   numTracks = tracks.Count;

for(var i = 1; i <= numTracks; i++)
{
	var currTrack = tracks.Item(i);
	var Location = currTrack.Location;
	if(Pone[Location] == 1)
	{
		Pone[Location]++;
	}
	else if(Pone[Location] == null)
	{
		Pone[Location] = 1;
	}
}

var   iTunesApp = WScript.CreateObject("iTunes.Application");
var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName(Playlist1);//Playlist 1
var   tracks = mainLibrary.Tracks;
var   numTracks = tracks.Count;

var Playlist = iTunesApp.CreatePlaylist("Not In Common of " + Playlist1 + " and " + Playlist2);

for(var i = 1; i <= numTracks; i++)
{
	var currTrack = tracks.Item(i);
	var Location = currTrack.Location;
	if(Pone[Location] == 1)
	{
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
	if(Pone[Location] == 1)
	{
		Playlist.AddTrack(currTrack);
	}
}

WScript.Echo("Done!");