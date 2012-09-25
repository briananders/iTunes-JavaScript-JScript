/* 
This Program will take all the songs that are selected, 
find the highest play count in each album, and make all
the songs play count in each album match that maximum.

I believe that this is the most efficient. it makes the list but 
rather than counting through the array at an index of 0,1,2,3.... 
the index is simply the Album. so Array[Album] = max; this way you
don't have to search for the max, you just get it since you already 
have the index (the Album).

By Brian Anders
*/

function main()
{
	MakeLists();
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	//var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("test");
	var tracks = iTunesApp.SelectedTracks;
	var numTracks = tracks.Count;

	//Figures out what the highest Playtrack is for each album
	while (numTracks != 0)
	{
		currTrack = tracks.Item(numTracks);
		var Album = currTrack.Album;
		currTrack.PlayedCount = albumlist[Album];
		numTracks--;
	}

	WScript.Echo("Done!");
}

var albumlist = new Array();

function MakeLists()
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	//var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("test");
	var tracks = iTunesApp.SelectedTracks;
	var numTracks = tracks.Count;

	//Figures out what the highest Playtrack is for each album
	while (numTracks != 0)
	{
		currTrack = tracks.Item(numTracks);
		var Album = currTrack.Album;
		var Played = currTrack.PlayedCount;
		if(albumlist[Album] != undefined)
		{
			if(albumlist[Album] < Played)
			{
				albumlist[Album] = Played;
			}
		}
		else
		{
			albumlist[Album] = Played;
		}
		numTracks--;
	}
	WScript.Echo("List Made");
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
Disc track
Track Number
Track Count
Year
Date Modified
Date Added
Bit Rate
Play track
Play Date
Play Date UTC
Artwork track
Persistent ID
Track Type
Has Video
HD
Video Width
Video Height
Movie
Location
File Folder track
Library Folder track
*/