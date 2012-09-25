/* 	
This program makes a Playlist of all the songs that have no lyrics. (so, all of my songs)

By Otto - http://ottodestruct.com
*/

var iTunesApp = WScript.CreateObject("iTunes.Application"); 
var tracks = iTunesApp.LibrarySource.Playlists.ItemByName("Music").Tracks;
var numTracks = tracks.Count;
var i;
NoLyricsPlaylist = iTunesApp.CreatePlaylist("No Lyrics");

for (i = 1; i <= numTracks; i++) 
{ 	try 
	{
		var currTrack = tracks.Item(i); 
		if ( currTrack.Lyrics == "" ) 
			NoLyricsPlaylist.AddTrack(currTrack);
	}
	catch(er)
	{

	}
} 

