/*
This finds your Highest Rated Artists and makes a playlist for each. Sorted by Year (newest to oldest).

By Brian Anders
*/

function main()
{
	var   iTunesApp = WScript.CreateObject("iTunes.Application");
	var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	var   tracks = mainLibrary.Tracks;
	var   numTracks = tracks.Count;
	
	var Playlist = iTunesApp.CreatePlaylist("Temp1");
	
	var ArtistArray = new Array();
	var SongCounter = new Array();
	
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		if(currTrack != null && currTrack.Kind == 1)
		{
			if(currTrack.Rating >= 80)
			{
				if(currTrack.Genre != "Audiobook" && currTrack.Genre != "Disney Soundtrack" && currTrack.podcast == false
				&& isin(ArtistArray, currTrack.Artist) == -1)
				{
					ArtistArray[ArtistArray.length] = currTrack.Artist;
					SongCounter[SongCounter.length] = 1;
					Playlist.AddTrack(currTrack);
				}
				else if(currTrack.Genre != "Audiobook" && currTrack.Genre != "Disney Soundtrack" && currTrack.Genre != "Video" && currTrack.Genre != "Audiobook" && currTrack.Genre != "Audio Story" && currTrack.podcast == false)
				{
					SongCounter[isin(ArtistArray, currTrack.Artist)]++;
					Playlist.AddTrack(currTrack);
				}
			}
		}
	}
	WScript.Echo(ArtistArray);
	
	var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Temp1");
	var   tracks = mainLibrary.Tracks;
	var   numTracks = tracks.Count;
	
	var Playlist = iTunesApp.CreatePlaylist("Temp2");
	
	var ArtistArray2 = new Array();
	
	for(var i = 0; i < SongCounter.length; i++)
	{
		if(SongCounter[i] >= 20) ArtistArray2[ArtistArray2.length] = ArtistArray[i];
	}
	WScript.Echo(ArtistArray2);
	
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		if(isin(ArtistArray2, currTrack.Artist) != -1)
		{
			Playlist.AddTrack(currTrack);
		}
	}
	iTunesApp.LibrarySource.Playlists.ItemByName("Temp1").Delete();
	
	for(var i = 0; i < ArtistArray2.length; i++)
	{
		CreateSortedPlaylist2(ArtistArray2[i], i+1, ArtistArray2.length+1);
	}
	
	iTunesApp.LibrarySource.Playlists.ItemByName("Temp2").Delete();
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

function CreateSortedPlaylist(InputArtist, position, length)
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var tracks = iTunesApp.LibrarySource.Playlists.ItemByName("Temp2").Tracks;
	var numTracks = tracks.Count;
	
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
	
	var Playlist2 = iTunesApp.CreatePlaylist("Temp "+InputArtist+ " - " + position + "/" + length);
	
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		if(currTrack.Artist == InputArtist && currTrack.Rating >= 60)
		{
			Playlist2.AddTrack(currTrack);
		}
	}
	
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var tracks = iTunesApp.LibrarySource.Playlists.ItemByName("Temp "+InputArtist+ " - " + position + "/" + length).Tracks;
	var numTracks = tracks.Count;
	
	var Playlist = iTunesApp.CreatePlaylist(InputArtist + " Sorted");
	
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
				numTracks = tracks.Count;
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

	Playlist2.Delete();
}

function CreateSortedPlaylist2(InputArtist, at, of)
{
	var   iTunesApp = WScript.CreateObject("iTunes.Application");
	var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Temp2");
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



