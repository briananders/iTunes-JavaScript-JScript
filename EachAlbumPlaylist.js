/*
This Program creates a playlist, "Album Playlist", and fills it with one song from each Album
in the main library.
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

	var Albumlist = new Array();
	
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		var Album = currTrack.Album;
		if(Albumlist[Album] == undefined)
		{
			Albumlist[Album] = currTrack.TrackCount;
			counter++;
		}
	}
	//WScript.Echo(Albumlist.length + " vs " + counter);
	var Playlist = iTunesApp.CreatePlaylist("Album Playlist");
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		var Album = currTrack.Album;
		if(Albumlist[Album] != 0 && Math.round(Math.random()) == 1)
		{
			Playlist.AddTrack(currTrack);
			Albumlist[Album] = 0;
		}
	}
	WScript.Echo("Done");
}

main();