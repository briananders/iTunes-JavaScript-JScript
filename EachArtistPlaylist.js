/*
This Program creates a playlist, "Artist Playlist", and fills it with one song from each 
artist in the main library.
Potentially Very Slow.

By Brian Anders
*/

function main()
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	var tracks = mainLibrary.Tracks;
	var numTracks = tracks.Count;
	var counter = 0;

	var Artistlist = new Array();
	
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		var Artist = currTrack.Artist;
		if(Artistlist[Artist] == undefined)
		{
			Artistlist[Artist] = 1;
			counter++;
		}
		else
		{
			Artistlist[Artist]++;
		}
	}
	//WScript.Echo(Artistlist.length + " vs " + counter);
	var Playlist = iTunesApp.CreatePlaylist("Artist Playlist");
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		var Artist = currTrack.Artist;
		if(Artistlist[Artist] != 0 && Math.round(Math.random()) == 1)
		{
			Playlist.AddTrack(currTrack);
			Artistlist[Artist] = 0;
		}
	}
	
	WScript.Echo("Done");
}

main();