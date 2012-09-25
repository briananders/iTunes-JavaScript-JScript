/*
This Program removes the word "The " from all playlists.

By Brian Anders
*/

var iTunesApp = WScript.CreateObject("iTunes.Application");
var mainLibrary = iTunesApp.LibrarySource.Playlists;

for(var i = 0; i < 20; i++)
{
	var numPlaylists = mainLibrary.Count;

	while(numPlaylists != 0)
	{
		var currPlaylist = mainLibrary.Item(numPlaylists);
		if(currPlaylist != null)
		{
			if(currPlaylist.smart == true)
			{break;}
			if(currPlaylist.Name.substring(0,4) == "The " || currPlaylist.Name.substring(0,4) == "the ")
			{
				currPlaylist.Name = currPlaylist.Name.substring(4);
				//WScript.Echo(currPlaylist.Name.substring(4));
			}
		}
		
		
		numPlaylists--;
	}
}
WScript.Echo("done");