/* 	
This program makes a playlist with all the songs that have no artwork.

Script by Otto - http://ottodestruct.com
*/

var iTunesApp = WScript.CreateObject("iTunes.Application"); 
var tracks = iTunesApp.LibrarySource.Playlists.ItemByName("Music").Tracks;
var numTracks = tracks.Count;
var i;
NoArtPlaylist = iTunesApp.CreatePlaylist("No Artwork");

for (i = 1; i <= numTracks; i++) 
{ 	
	var currTrack = tracks.Item(i); 
	if ( currTrack.Artwork.Count == 0 ) 
		NoArtPlaylist.AddTrack(currTrack);
} 

