/*
This Program makes a sorted playlist filled with all your highest rated songs. Sorted by newest to oldest.

By Brian Anders
*/

function main()
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var tracks = iTunesApp.SelectedTracks;
	var numTracks = tracks.Count;
	
	var ArtistArray = new Array();
	
	while(numTracks != 0)
	{
		var currTrack = tracks.Item(numTracks);
		if(currTrack != null && currTrack.Kind == 1)
		{
			if(isin(ArtistArray, currTrack.Artist) == -1)
			{
				ArtistArray[ArtistArray.length] = currTrack.Artist;
			}
		}
		numTracks--;
	}
	
	var   iTunesApp = WScript.CreateObject("iTunes.Application");
	var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	var   tracks = mainLibrary.Tracks;
	var   numTracks = tracks.Count;
	
	var Playlist = iTunesApp.CreatePlaylist("Temp");
	
	var SongCounter = new Array();
	
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		if(currTrack != null && currTrack.Kind == 1)
		{
			if(isin(ArtistArray, currTrack.Artist) != -1 && currTrack.Rating >= 80)
			{
				Playlist.AddTrack(currTrack);
			}
		}
	}
	WScript.Echo(ArtistArray);
	
	for(var i = 0; i < ArtistArray.length; i++)
	{
		CreateSortedPlaylist2(ArtistArray[i], i+1, ArtistArray.length+1);
	}
	
	iTunesApp.LibrarySource.Playlists.ItemByName("Temp").Delete();
	WScript.Echo("Done Making Sorted Playlists");
}
main();

function isin(list, variable)
{
	for(var i = 0; i < list.length; i++)
	{
		if(list[i] == variable) return i;
	}
	return -1;
}

function CreateSortedPlaylist2(InputArtist, at, of)
{
	var   iTunesApp = WScript.CreateObject("iTunes.Application");
	var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Temp");
	var   tracks = mainLibrary.Tracks;
	var   numTracks = tracks.Count;
	
	var Playlist = iTunesApp.CreatePlaylist("Temp " + InputArtist + " at " + at + " of " + of);
	
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		if(currTrack.Artist == InputArtist)
		{
			Playlist.AddTrack(currTrack);
		}
	}
	
	var Playlist = iTunesApp.CreatePlaylist(InputArtist + " Sorted");
	mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Temp " + InputArtist + " at " + at + " of " + of);
	tracks = mainLibrary.Tracks;
	numTracks = tracks.Count;
	
	var YearsAlbums = new Array();
	for(var i = 1800; i <= 2050; i++)
	{
		YearsAlbums[i] = new Array();
	}
	
	var lowestyear = 3000;
	var highestyear = 0;
	var AlbumsDone = new Array();
	var AlbumsTracks = new Array();
	var AlbumsDiscs = new Array();

	for(var i = 1; i <= numTracks; i++)//finds the lowest and highest years
	{
		var currTrack = tracks.Item(i);
		if(currTrack != null)
		{
			if(currTrack.Year > highestyear && currTrack.Artist == InputArtist)
			{
				highestyear = currTrack.Year
			}
			if(currTrack.Year < lowestyear && currTrack.Artist == InputArtist)
			{
				lowestyear = currTrack.Year
			}
			
			if(isin(AlbumsDone, currTrack.Album+currTrack.DiscNumber) == -1 && currTrack.Artist == InputArtist)
			{
				AlbumsTracks[currTrack.Album+currTrack.DiscNumber] = currTrack.TrackCount;
				AlbumsDiscs[currTrack.Album+currTrack.DiscNumber] = currTrack.DiscNumber;
				AlbumsDone[AlbumsDone.length] = currTrack.Album+currTrack.DiscNumber;
				YearsAlbums[currTrack.Year][YearsAlbums[currTrack.Year].length] = currTrack.Album+currTrack.DiscNumber;
			}
		}
	}
	
	for(var y = highestyear; y >= lowestyear; y--)
	{
		for(var i = 0; i < YearsAlbums[y].length; i++)
		{
			var Artist = InputArtist;
			var Album = YearsAlbums[y][i];
			var MaxDiscs = AlbumsDiscs[Album];
			var MaxTracks = AlbumsTracks[Album];
			for(var t = 1; t <= MaxTracks; t++)
			{
				var numTracks = tracks.Count;
				while(numTracks != 0)
				{
					var currTrack = tracks.Item(numTracks);
					if(currTrack.Artist == Artist && currTrack.Year == y && currTrack.Album+currTrack.DiscNumber == Album && currTrack.TrackNumber == t)
					{
						Playlist.AddTrack(currTrack);
						break;
					}
					numTracks--;
				}
			}
		}
	}
		
		
	iTunesApp.LibrarySource.Playlists.ItemByName("Temp " + InputArtist + " at " + at + " of " + of).Delete();
}



