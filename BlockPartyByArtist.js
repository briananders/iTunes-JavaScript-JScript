/*
This Program creates a playlist, "Block Party By Artist", and fills it with, at most, three
tracks by each artist in the main library.

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
		}
		else
		{
			Artistlist[Artist]++;
		}
	}
	//WScript.Echo(Artistlist.length + " vs " + counter);
	var Playlist = iTunesApp.CreatePlaylist("Block Party By Artist");
	
	var UsedList = new Array();
	for(var a = 0; a < 10; a++)
	{
		for(var i = 1; i <= numTracks; i++)
		{
			var currTrack = tracks.Item(i);
			var Artist = currTrack.Artist;
			if(Artistlist[Artist] > 3)
			{
				Artistlist[Artist] = 3;
			}
			var currTrack = tracks.Item(i);
			var Artist = currTrack.Artist;
			var Name = currTrack.Name;
			var Artist = currTrack.Artist;
			if(Artistlist[Artist] > 3)
			{
				Artistlist[Artist] = 3;
			}
			if(Artistlist[Artist] != 0 && Math.round(Math.random()) == 1 && UsedList[Name+Artist] != 1)
			{
				Playlist.AddTrack(currTrack);
				Artistlist[Artist]--;
				UsedList[Name+Artist] = 1;
			}
		}
	}
	WScript.Echo("Done");
}

main();