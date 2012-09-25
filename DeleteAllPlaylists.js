/*
This Program deletes all playlists. Does not effect Smart Playlists.

By Brian Anders
*/

var iTunesApp = WScript.CreateObject("iTunes.Application");
var mainLibrary = iTunesApp.LibrarySource.Playlists;
var numPlaylists = mainLibrary.Count;

var currPlaylist = mainLibrary.Item(numPlaylists);

while(numPlaylists != 0)
{
	var currPlaylist = mainLibrary.Item(numPlaylists);
	if(currPlaylist != null)
	{
		if(currPlaylist.smart == true)
		{break;}
		else currPlaylist.Delete();
	}
	
	numPlaylists--;
}
WScript.Echo("done");