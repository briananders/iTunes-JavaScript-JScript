/*
This Program creates a playlist, "Block Party By Album", and fills it with at most
3 random tracks from each album in the selected library.

By Brian Anders
*/

function main()
{
	var objApp = WScript.CreateObject("iTunes.Application");
	var tracks = objApp.SelectedTracks;
	var numTracks = tracks.Count;

	var Albumlist = new Array();
	
	while(numTracks != 0)
	{
		var currTrack = tracks.Item(numTracks);
		var Album = currTrack.Album;
		if(Albumlist[Album] == undefined)
		{
			Albumlist[Album] = 1;
		}
		else
		{
			Albumlist[Album]++;
		}
		numTracks--;
	}
	//WScript.Echo(Albumlist.length + " vs " + counter);
	
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	var tracks = mainLibrary.Tracks;
	var numTracks = tracks.Count;
	
	var Playlist = iTunesApp.CreatePlaylist("Block Party By Album");
	var UsedList = new Array();
	for(var a = 0; a < 10; a++)
	{
		for(var i = 1; i <= numTracks; i++)
		{
			var currTrack = tracks.Item(i);
			var Album = currTrack.Album;
			if(Albumlist[Album] > 3)
			{
				Albumlist[Album] = 3;
			}
			var currTrack = tracks.Item(i);
			var Artist = currTrack.Artist;
			var Name = currTrack.Name;
			var Album = currTrack.Album;
			if(Albumlist[Album] > 3)
			{
				Albumlist[Album] = 3;
			}
			if(Albumlist[Album] != 0 && Math.round(Math.random()) == 1 && UsedList[Name+Artist] != 1)
			{
				Playlist.AddTrack(currTrack);
				Albumlist[Album]--;
				UsedList[Name+Artist] = 1;
			}
		}
	}
	WScript.Echo("Done");
}

main();