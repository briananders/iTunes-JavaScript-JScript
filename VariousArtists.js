/*
This Program finds all the Albums that have more than one Artist and puts those tracks in 
the "Various Artist" playlist. Once in the playlist you can pick and choose which songs to set
the Album Artist to "Various Artists"

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
	if(VariousArtists[currTrack.Album] != null)
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