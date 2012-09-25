/*
This Program goes through all your playlists and if there are less than 10 tracks in a playlist, it deletes it.
This doesn not affect your smart playlists.

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
		if(currPlaylist.tracks.Count < 10) 
			currPlaylist.Delete();
	}
	
	
	numPlaylists--;
}
WScript.Echo("done");