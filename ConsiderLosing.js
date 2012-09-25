/*
This Program creates a playlist of all the songs that 

By Brian Anders
*/

var iTunesApp = WScript.CreateObject("iTunes.Application");
var tracks = iTunesApp.LibrarySource.Playlists.ItemByName("Music").Tracks;
var numTracks = tracks.Count;

var Playlist = iTunesApp.CreatePlaylist("Lose These Songs");

for(var i = 1; i <= numTracks; i++)
{
	var currTrack =  tracks.Item(i);
	if(currTrack != null)
	{
		//if(currTrack.SkippedCount != 0 && currTrack.PlayedCount != 0 && currTrack.PlayedCount <= currTrack.SkippedCount && currTrack.Kind == 1 && currTrack.Podcast == false)
		if(currTrack.PlayedCount <= currTrack.SkippedCount && currTrack.Kind == 1 && currTrack.Podcast == false && currTrack.Genre != "Audiobook")
		{
			Playlist.AddTrack(currTrack);
		}
	}
}

WScript.Echo("Done");