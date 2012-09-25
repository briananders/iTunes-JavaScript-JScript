/*
This Program finds albums with more than one artist and puts them the playlist "Various Artists". 
Use "MakeVariousArtists.js" next to make those tracks' Album Artist = "Various Artist".

By Brian Anders
*/


var iTunesApp = WScript.CreateObject("iTunes.Application");
var Library = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
var tracks = Library.Tracks;
var numTracks = tracks.Count;

var Albums = new Array();
var VariousArtists = new Array();
var toString = new Array();

for(var i = 1; i <= numTracks; i++)
{
	var currTrack = tracks.Item(i);
	if(Albums[currTrack.Album] == null && currTrack.podcast == false)
	{
		Albums[currTrack.Album] = currTrack.Artist;
	}
	else if(Albums[currTrack.Album] != currTrack.Artist)
	{
		VariousArtists[currTrack.Album] = currTrack.Album;
		if(isin(toString, currTrack.Album) == false) toString[toString.length] = currTrack.Album;
	}
}

var Playlist = iTunesApp.CreatePlaylist("Various Artists");


for(var i = 1; i <= numTracks; i++)
{
	var currTrack = tracks.Item(i);
	if(VariousArtists[currTrack.Album] != null && currTrack.Genre != "podcast")
	{
		//currTrack.AlbumArtist = "Various Artists";
		Playlist.AddTrack(currTrack);
	}	
}

WScript.Echo("Done");


function isin(list, variable)
{
	for(var i = 0; i < list.length; i++)
		if(list[i] == variable) return true;
	return false;
	
}