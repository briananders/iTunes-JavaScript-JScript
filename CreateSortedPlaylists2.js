/*
This Program creates a playlist of the selected tracks. Sorted from newest to oldest.
Better Version.

By Brian Anders
*/

function main()
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	var tracks = iTunesApp.SelectedTracks;
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
	var Artists = new Array();

	while(numTracks != 0)//finds the lowest and highest years
	{
		var currTrack = tracks.Item(numTracks);
		if(currTrack.Year > highestyear)
		{
			highestyear = currTrack.Year
		}
		if(currTrack.Year < lowestyear)
		{
			lowestyear = currTrack.Year
		}
		
		if(isin(AlbumsDone, currTrack.Album+currTrack.DiscNumber) == false && currTrack.Year != 0)
		{
			AlbumsDone[AlbumsDone.length] = currTrack.Album+currTrack.DiscNumber;
			YearsAlbums[currTrack.Year][YearsAlbums[currTrack.Year].length] = currTrack.Album+currTrack.DiscNumber;
		}
		
		if(isin(Artists, currTrack.Artist) == false)
		{
			Artists[Artists.length] = currTrack.Artist;
		}
	
		numTracks--;
	}
	
	var toString = "";
	for(var i = Artists.length-1; i >= 0; i--)
	{
		toString += Artists[i] + ", ";
	}
	
	var Playlist = iTunesApp.CreatePlaylist(toString.substring(0,toString.length-2) + " Sorted");
	
	for(var Art = Artists.length-1; Art >= 0; Art--)
	{
		WScript.Echo("Adding track from " + Artists[Art]);
		for(var y = 2050; y >= 1800; y--)
		{
			for(var i = 0; i < YearsAlbums[y].length; i++)
			{
				var Artist = Artists[Art];
				var Album = YearsAlbums[y][i];

				for(var t = 1; t <= 100; t++)
				{
					numTracks = tracks.Count;
					while(numTracks != 0)
					{
						var currTrack = tracks.Item(numTracks);
						if(currTrack.Artist == Artist && currTrack.Year == y && currTrack.Album+currTrack.DiscNumber == Album && currTrack.TrackNumber == t)
							Playlist.AddTrack(currTrack);
						numTracks--;
					}
				}
			}
		}
	}
	WScript.Echo("Done");
}
main();

function isin(list, variable)
{
	for(var i = 0; i < list.length; i++)
	{
		if(list[i] == variable)
			return true;
	}
	return false;
}
