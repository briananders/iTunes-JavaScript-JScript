/* 
This Program will take all the songs that are selected, 
find the highest TrackNumber and makes the TrackCount 
(1 of 10 = TrackNumber of TrackCount) the highest TrackNumber
for the album.

This one is more efficient because it makes a list with the
index the Album title. as it is made it changes the value to 
largest TrackNumber. Then it goes through the selected area again
and makes the TrackCount equal to the max TrackNumber.

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
		var Album = currTrack.Album+currTrack.DiscNumber;
		currTrack.TrackCount = albumlist[Album];
		numTracks--;
	}

	WScript.Echo("Done!");
}

var albumlist = new Array();

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
		var Album = currTrack.Album+currTrack.DiscNumber;
		var track = currTrack.TrackNumber;
		if(albumlist[Album] != undefined)
		{
			if(albumlist[Album] < track)
			{
				albumlist[Album] = track;
			}
		}
		else
		{
			albumlist[Album] = track;
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