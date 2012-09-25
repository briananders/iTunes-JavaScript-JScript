/*
This Program finds all the tracks in the selected Library with an empty field

By Brian Anders
*/

function main()
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	var tracks = iTunesApp.SelectedTracks;
	var numTracks = tracks.Count;

	var FixName = iTunesApp.CreatePlaylist("Fix Name");
	var FixGenre = iTunesApp.CreatePlaylist("Fix Genre");
	var FixYear = iTunesApp.CreatePlaylist("Fix Year");
	var FixArtist = iTunesApp.CreatePlaylist("Fix Artist");
	var FixAlbum = iTunesApp.CreatePlaylist("Fix Album");
	var FixAlbumArtist = iTunesApp.CreatePlaylist("Fix Album Artist");
	var FixArtwork = iTunesApp.CreatePlaylist("Fix Artwork");
	var FixDiscCount = iTunesApp.CreatePlaylist("Fix Disc Count");
	var FixDiscNumber = iTunesApp.CreatePlaylist("Fix Disc Number");
	var FixTrackNumber = iTunesApp.CreatePlaylist("Fix Track Number");
	var FixTrackCount = iTunesApp.CreatePlaylist("Fix Track Count");
	
	while (numTracks != 0)
	{
		currTrack = tracks.Item(numTracks);
		if(currTrack.Name == "" || currTrack.Name == undefined)
		{
			FixName.AddTrack(currTrack);
		}
		
		if(currTrack.Artist == "" || currTrack.Artist == undefined)
		{
			FixArtist.AddTrack(currTrack);
		}
		
		if(currTrack.AlbumArtist == "" || currTrack.AlbumArtist == undefined)
		{
			FixAlbumArtist.AddTrack(currTrack);
		}
		
		if(currTrack.Album == "" || currTrack.Album == undefined)
		{
			FixAlbum.AddTrack(currTrack);
		}
		
		if(currTrack.Genre == "" || currTrack.Genre == undefined)
		{
			FixGenre.AddTrack(currTrack);
		}
		
		if(currTrack.DiscNumber == "" || currTrack.DiscNumber == undefined || currTrack.DiscNumber == 0)
		{
			FixDiscNumber.AddTrack(currTrack);
		}
		
		if(currTrack.DiscCount == "" || currTrack.DiscCount == undefined || currTrack.DiscCount == 0)
		{
			FixDiscCount.AddTrack(currTrack);
		}
		
		if(currTrack.TrackNumber == "" || currTrack.TrackNumber == undefined || currTrack.TrackNumber == 0)
		{
			FixTrackNumber.AddTrack(currTrack);
		}
		
		if(currTrack.TrackCount == "" || currTrack.TrackCount == undefined || currTrack.TrackCount == 0)
		{
			FixTrackCount.AddTrack(currTrack);
		}
		
		if(currTrack.Year == "" || currTrack.Year == undefined || currTrack.Year == 0)
		{
			FixYear.AddTrack(currTrack);
		}
		
		if(currTrack.Artwork.Count == 0)
		{
			FixArtwork.AddTrack(currTrack);
		}

		numTracks--;
	}
	if(FixName.Tracks.Count == 0) FixName.Delete();
	if(FixGenre.Tracks.Count == 0) FixGenre.Delete();
	if(FixYear.Tracks.Count == 0) FixYear.Delete();
	if(FixArtist.Tracks.Count == 0) FixArtist.Delete();
	if(FixAlbum.Tracks.Count == 0) FixAlbum.Delete();
	if(FixAlbumArtist.Tracks.Count == 0) FixAlbumArtist.Delete();
	if(FixArtwork.Tracks.Count == 0) FixArtwork.Delete();
	if(FixDiscCount.Tracks.Count == 0) FixDiscCount.Delete();
	if(FixDiscNumber.Tracks.Count == 0) FixDiscNumber.Delete();
	if(FixTrackNumber.Tracks.Count == 0) FixTrackNumber.Delete();
	if(FixTrackCount.Tracks.Count == 0) FixTrackCount.Delete(); 

	WScript.Echo("Done!");
}

main();
