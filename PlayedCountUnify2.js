/* 
This Program will take all the songs that are selected, 
find the highest play count in each album, and make all
the songs play count in each album match that maximum.

This one is just like the first one, but it is more efficient.
I added a getMax() function to get the max playcount for that album. 
it is still pretty slow because it has to go through the whole selected
library to make the list and each time you get the max it has to scan 
the list to get the index of the album to get the value of the max in the other list.

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

function getMax(Album)
{
	return countlist[inlist(albumlist, Album)];
}

function inlist(list, x)
{
	for(var i = 0; i < list.length; i++)
	{
		if(list[i] == x)
		{
			return i;
		}
	}
	return -1;
}

var albumlist = new Array();
var countlist = new Array();

function MakeLists()
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
		var count = currTrack.PlayedCount;
		var index = inlist(albumlist, Album);
		if(index >= 0)
		{
			if(countlist[index] < count)
			{
				countlist[index] = count;
			}
		}
		else
		{
			albumlist[albumlist.length] = Album;
			countlist[countlist.length] = count;
		}
		numTracks--;
	}
	WScript.Echo(countlist);
	WScript.Echo(albumlist);
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