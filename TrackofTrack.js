/* 
This Program will take all the songs that are selected, 
find the highest TrackNumber and makes the TrackCount 
(1 of 10 = TrackNumber of TrackCount) the highest TrackNumber
for the album.

This one is less efficient because it makes 2 lists (albumlist and tracklist).
as the program scans through the songs it figures out the max TrackNumber.
it is slower because for each track it has to scan the albumlist to see if 
it is already present. then, when the program scans through all the tracks
again to set the TrackCount to the max TrackNumber for each Album, it
has to scan the albumlist for the index of the max TrackNumber stored
in the tracklist.

By Brian Anders
*/

function main()
{
	MakeLists();
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	
	var tracks = iTunesApp.SelectedTracks;
	var numTracks = tracks.Count;

	//Figures out what the highest Playtrack is for each album
	while (numTracks != 0)
	{
		currTrack = tracks.Item(numTracks);
		var Album = currTrack.Album;
		currTrack.TrackCount = getMax(Album);
		numTracks--;
	}

	WScript.Echo("Done!");
}

function getMax(Album)
{
	return tracklist[inlist(albumlist, Album)];
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
var tracklist = new Array();

function MakeLists()
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	
	var tracks = iTunesApp.SelectedTracks;
	var numTracks = tracks.Count;

	//Figures out what the highest Playtrack is for each album
	while (numTracks != 0)
	{
		currTrack = tracks.Item(numTracks);
		var Album = currTrack.Album;
		var track = currTrack.TrackNumber;
		var index = inlist(albumlist, Album);
		if(index >= 0)
		{
			if(tracklist[index] < track)
			{
				tracklist[index] = track;
			}
		}
		else
		{
			albumlist[albumlist.length] = Album;
			tracklist[tracklist.length] = track;
		}
		numTracks--;
	}
	WScript.Echo("List Made");
//	WScript.Echo(tracklist);
//	WScript.Echo(albumlist);
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