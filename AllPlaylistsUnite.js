/*
This Program creates two playlists ("Union of all playlists" and "Not in a playlist") and fills one with all the songs that are in one or more
playlist and fills the other with all the songs in the music library that appears in no playlist.

By Brian Anders
*/

var iTunesApp = WScript.CreateObject("iTunes.Application");
var mainLibrary = iTunesApp.LibrarySource.Playlists;
var numPlaylists = mainLibrary.Count;

var currPlaylist = mainLibrary.Item(numPlaylists);
var UsedTracks = new Array();

var Playlist = iTunesApp.CreatePlaylist("Union of all playlists");

while(numPlaylists != 0)
{
	var currPlaylist = mainLibrary.Item(numPlaylists);
	if(currPlaylist != null)
	{
		if(currPlaylist.smart == true)
		{break;}
		else
		{
			var tracks = currPlaylist.Tracks;
			var numTracks = tracks.Count;
			for(var i = 1; i <= numTracks; i++)
			{
				var currTrack = tracks.Item(i);
				if(currTrack != null)
				{
					if(UsedTracks[currTrack.Artist + currTrack.Album + currTrack.Name + currTrack.TrackNumber + currTrack.TrackCount] == null)
					{
						UsedTracks[currTrack.Artist + currTrack.Album + currTrack.Name + currTrack.TrackNumber + currTrack.TrackCount] = 1;
						Playlist.AddTrack(currTrack);
					}
				}
			}
		}
	}
	numPlaylists--;
}
WScript.Echo("done with uniting");

var Playlist = iTunesApp.CreatePlaylist("Not in a playlist");

var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
var tracks = mainLibrary.Tracks;
var numTracks = tracks.Count;

for(var i = 1; i <= numTracks; i++)
{
	var currTrack = tracks.Item(i);
	if(currTrack != null)
	{
		if(UsedTracks[currTrack.Artist + currTrack.Album + currTrack.Name + currTrack.TrackNumber + currTrack.TrackCount] == null)
		{
			//UsedTracks[currTrack.Artist + currTrack.Album + currTrack.Name + currTrack.TrackNumber] = 1;
			Playlist.AddTrack(currTrack);
		}
	}
}

WScript.Echo("Done");