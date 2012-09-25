/*
This Program deletes all your empty playlists.
Does not effect your smart playlists.

By Brian Anders
*/


var iTunesApp = WScript.CreateObject("iTunes.Application");
var mainLibrary = iTunesApp.LibrarySource.Playlists;
//var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("test");
var numPlaylists = mainLibrary.Count;

var currPlaylist = mainLibrary.Item(numPlaylists);

while(numPlaylists != 0)
{
	var currPlaylist = mainLibrary.Item(numPlaylists);
	if(currPlaylist != null)
	{
		if(currPlaylist.smart == true)
		{break;}
		if(currPlaylist.tracks.Count == 0) 
			currPlaylist.Delete();
	}
	
	
	numPlaylists--;
}
WScript.Echo("done");