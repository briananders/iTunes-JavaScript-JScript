/*
This Program takes the selected tracks and prints out the Attributes about them.

By Brian Anders
*/

function main()
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
		WScript.Echo("TrackID: " + currTrack.TrackID + 
		"\nName: " + currTrack.Name + 
		"\nArtist: " + currTrack.Artist + 
		"\nAlbumArtist: " + currTrack.AlbumArtist + 
		"\nAlbum: " + currTrack.Album + 
		"\nGenre: " + currTrack.Genre + 
		"\nKind: " + currTrack.Kind + 
		"\nSize: " + currTrack.Size + 
		"\nTotalTime: " + currTrack.Time + 
		"\nDiscNumber: " + currTrack.DiscNumber + 
		"\nDiscCount: " + currTrack.DiscCount + 
		"\nTrackNumber: " + currTrack.TrackNumber + 
		"\nTrackCount: " + currTrack.TrackCount + 
		"\nYear: " + currTrack.Year + 
		"\nDateModified: " + currTrack.DateModified + 
		"\nDateAdded: " + currTrack.DateAdded + 
		"\nBitRate: " + currTrack.BitRate + 
		"\nPlayCount: " + currTrack.PlayedCount + 
		"\nPlayDate: " + currTrack.PlayedDate + 
		"\nPlayDateUTC: " + currTrack.PlayedDateUTC + 
		"\nArtworkCount: " + currTrack.Artwork.Count + 
		"\nPersistentID: " + currTrack.PersistentID + 
		"\nTrackType: " + currTrack.TrackType + 
		"\nHasVideo: " + currTrack.HasVideo + 
		"\nHD: " + currTrack.HD + 
		"\nVideoWidth: " + currTrack.VideoWidth + 
		"\nVideoHeight: " + currTrack.VideoHeight + 
		"\nMovie: " + currTrack.Movie + 
		"\nLocation: " + currTrack.Location + 
		"\nFileFolderCount: " + currTrack.FileFolderCount + 
		"\nLibraryFolderCount: " + currTrack.LibraryFolderCount);

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