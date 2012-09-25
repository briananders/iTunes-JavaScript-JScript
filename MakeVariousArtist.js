/*
This Program takes the songs in the playlist "Various Artists" and makes the Album Artist "Various Artists".
Use this after "VariousArtists.js".

By Brian Anders
*/


var iTunesApp = WScript.CreateObject("iTunes.Application");
var Library = iTunesApp.LibrarySource.Playlists.ItemByName("Various Artists");
var tracks = Library.Tracks;
var numTracks = tracks.Count;

for(var i = 1; i <= numTracks; i++)
{
	var currTrack = tracks.Item(i);
	if(currTrack != null) currTrack.AlbumArtist = "Various Artists";
}

WScript.Echo("Done");