/* 
This Program will take all the songs that are selected, 
find the highest play count in each album, and make all
the songs play count in each album match that maximum.

By Brian Anders
*/

function main()
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	//var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("test");
	var tracks = iTunesApp.SelectedTracks;
	var numTracks = tracks.Count;

	//Figures out what the highest Playcount is for each album
	while (numTracks != 0)
	{
		currTrack = tracks.Item(numTracks);
		var Album = currTrack.Album;
		var count = currTrack.TrackNumber;
		currTrack.PlayedCount = getMax(Album);
		numTracks--;
	}

	WScript.Echo("Done!");
}

function getMax(album)
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	//var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("test");
	var tracks = iTunesApp.SelectedTracks;
	var numTracks = tracks.Count;
	var max = 0;
	while(numTracks != 0)
	{
		currTrack = tracks.Item(numTracks);
		var Album = currTrack.Album;
		if(Album == album)
		{
			if(currTrack.PlayedCount > max)
				max = currTrack.PlayedCount;
		}
		numTracks--;
	}
	return max;
}
main();
/*
Track ID
Name
Artist
Album Artist
Album
Genre
Kind
Size
Total Time
Disc Number
Disc Count
Track Number
Track Count
Year
Date Modified
Date Added
Bit Rate
Play Count
Play Date
Play Date UTC
Artwork Count
Persistent ID
Track Type
Has Video
HD
Video Width
Video Height
Movie
Location
File Folder Count
Library Folder Count
*/