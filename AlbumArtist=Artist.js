/*
This Program makes the Album Artist for the selected tracks match the Artist.

!!!WARNING!!! your track's album artist will be made equal to the track's artist, 
so if your artist is empty, then you will end up removing your album artist. so be careful.

By: Brian Anders
*/

function main()
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	
	var tracks = iTunesApp.SelectedTracks;
	var numTracks = tracks.Count;

	//Figures out what the highest Playtrack is for each album
	while (numTracks != 0)
	{
		currTrack = tracks.Item(numTracks);
		currTrack.AlbumArtist = currTrack.Artist;
		
		numTracks--;
	}

	WScript.Echo("Done!");
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