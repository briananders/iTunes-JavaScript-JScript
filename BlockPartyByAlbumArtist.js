/*
This Program creates a playlist, "Block Party By Album AlbumArtist", and fills it with, at most, 
three songs by each album AlbumArtist in the main library.

By Brian Anders
*/

function main()
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	var tracks = mainLibrary.Tracks;
	var numTracks = tracks.Count;
	var counter = 0;

	var AlbumArtistlist = new Array();
	
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		var AlbumArtist = currTrack.AlbumArtist;
		if(AlbumArtistlist[AlbumArtist] == undefined)
		{
			AlbumArtistlist[AlbumArtist] = 1;
		}
		else
		{
			AlbumArtistlist[AlbumArtist]++;
		}
	}
	//WScript.Echo(AlbumArtistlist.length + " vs " + counter);
	var Playlist = iTunesApp.CreatePlaylist("Block Party By Album AlbumArtist");
	var UsedList = new Array();
	for(var a = 0; a < 10; a++)
	{
		for(var i = 1; i <= numTracks; i++)
		{
			var currTrack = tracks.Item(i);
			var AlbumArtist = currTrack.AlbumArtist;
			if(AlbumArtistlist[AlbumArtist] > 3)
			{
				AlbumArtistlist[AlbumArtist] = 3;
			}
			var currTrack = tracks.Item(i);
			var Artist = currTrack.Artist;
			var Name = currTrack.Name;
			var AlbumArtist = currTrack.AlbumArtist;
			if(AlbumArtistlist[AlbumArtist] > 3)
			{
				AlbumArtistlist[AlbumArtist] = 3;
			}
			if(AlbumArtistlist[AlbumArtist] != 0 && Math.round(Math.random()) == 1 && UsedList[Name+Artist] != 1)
			{
				Playlist.AddTrack(currTrack);
				AlbumArtistlist[AlbumArtist]--;
				UsedList[Name+Artist] = 1;
			}
		}
	}
	WScript.Echo("Done");
}

main();