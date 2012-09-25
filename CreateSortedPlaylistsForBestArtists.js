/*
This Program creates a sorted playlist for your highest rated artists.
Slow Version.

By Brian Anders
*/

function CreatePlaylist(InputArtist, position, length)
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var tracks = iTunesApp.LibrarySource.Playlists.ItemByName("Temp").Tracks;
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
			
			if(isin(AlbumsDone, currTrack.Album+currTrack.DiscNumber) == false && currTrack.Artist == InputArtist)
			{
				AlbumsTracks[currTrack.Album+currTrack.DiscNumber] = currTrack.TrackCount;
				AlbumsDiscs[currTrack.Album+currTrack.DiscNumber] = currTrack.DiscNumber;
				AlbumsDone[AlbumsDone.length] = currTrack.Album+currTrack.DiscNumber;
				YearsAlbums[currTrack.Year][YearsAlbums[currTrack.Year].length] = currTrack.Album+currTrack.DiscNumber;
			}
		}
	}
	
	var Playlist2 = iTunesApp.CreatePlaylist("Temp "+InputArtist+ " - " + (position+1) + "/" + (length+1));
	
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		if(currTrack.Artist == InputArtist && currTrack.Rating >= 60)
		{
			Playlist2.AddTrack(currTrack);
		}
	}
	
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var tracks = iTunesApp.LibrarySource.Playlists.ItemByName("Temp "+InputArtist+ " - " + (position+1) + "/" + (length+1)).Tracks;
	var numTracks = tracks.Count;
	if(numTracks >= 20)
	{
		var Playlist = iTunesApp.CreatePlaylist(InputArtist + " Sorted");
		
		for(var y = 2050; y >= 1800; y--)
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
						if(currTrack != null)
						{
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
		}
	}
	Playlist2.Delete();
}

function main()
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var tracks = iTunesApp.LibrarySource.Playlists.ItemByName("Music").Tracks;
	var numTracks = tracks.Count;
	
	var Playlist = iTunesApp.CreatePlaylist("Temp");
	
	var Artists = new Array();
	var counter = new Array();
	
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		if(currTrack != null)
		{
			if(currTrack.Genre != "Video" && currTrack.podcast == false && currTrack.Rating > 70 && isin(Artists, currTrack.Artist)==false)
			{
				Artists[Artists.length] = currTrack.Artist;
				counter[counter.length] = 1;
			}
			else if(isin(Artists, currTrack.Artist))
			{
				counter[isin(Artists, currTrack.Artist)]++;
			}
		}
	}
	WScript.Echo(Artists);
	
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		if(isin(Artists, currTrack.Artist) != false && counter[isin(Artists, currTrack.Artist)] >= 20)
		{
			Playlist.AddTrack(currTrack);
		}
	}
	
	for(var i = 0; i < Artists.length; i++)
	{
		//WScript.Echo("Creating Playlist for " + Artists[i]);
		CreatePlaylist(Artists[i], i, Artists.length);
	}
	
	iTunesApp.LibrarySource.Playlists.ItemByName("Temp").Delete();
	
	WScript.Echo("Done");
}
main();

function isin(list, variable)
{
	for(var i = 0; i < list.length; i++)
	{
		if(list[i] == variable)
			return i;
	}
	return false;
}
