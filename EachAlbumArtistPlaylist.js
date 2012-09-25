/*
This Program creates a playlist, "Album Artist Playlist", and fills it with one song from
each album artist.
Potentially Very Slow.

By Brian Anders
*/

function main()
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	var tracks = mainLibrary.Tracks;
	var numTracks = tracks.Count;
	var counter = 0;

	var AlbumArtistlist = new Array();
	
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		var AlbumArtist = currTrack.AlbumArtist;
		if(AlbumArtistlist[AlbumArtist] == undefined)
		{
			AlbumArtistlist[AlbumArtist] = currTrack.TrackCount;
			counter++;
		}
	}
	//WScript.Echo(AlbumArtistlist.length + " vs " + counter);
	var Playlist = iTunesApp.CreatePlaylist("Album Artist Playlist");
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		var AlbumArtist = currTrack.AlbumArtist;
		if(AlbumArtistlist[AlbumArtist] != 0 && Math.round(Math.random()) == 1)
		{
			Playlist.AddTrack(currTrack);
			AlbumArtistlist[AlbumArtist] = 0;
		}
	}
	WScript.Echo("Done");
}

main();