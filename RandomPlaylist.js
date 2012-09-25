/*
This Program creates a playlist of random songs.

By Brian Anders
*/


var iTunesApp = WScript.CreateObject("iTunes.Application");
var tracks = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
var numTracks = tracks.Count;

var Playlist = iTunesApp.CreatePlaylist("Random Playlist");

for(var i = 1; i <= numTracks; i++)
{
	var currTrack =  tracks.Item(i);
	if(currTrack != null)
	{
		if(Math.round(Math.random()*10) == 1 && currTrack.Kind == 1 && currTrack.Podcast == false currTrack.Genre != "Audiobook")
		{
			Playlist.AddTrack(currTrack);
		}
	}
}

WScript.Echo("Done");