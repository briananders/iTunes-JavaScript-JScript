/* 	
This program makes a playlist ("One Hit Wonders") and fills it with all the Artist with only one song.

By Otto - http://ottodestruct.com       
*/

WScript.Echo("Starting");

// put your playlist name here
var 	PlaylistName = "One Hit Wonders";

var	iTunesApp = WScript.CreateObject("iTunes.Application");

var	mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
// if you want to use some other playlist as the base to look through, uncomment this next line
// and change the "-All Songs" to the base playlist you want to use.:
//var	mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("-All Songs");



// --- no need to change anything below this line ---
var	tracks = mainLibrary.Tracks;
var	numTracks = tracks.Count;
var 	i;
var	artistArray = new Array();
for (i = 1; i <= numTracks; i++)
{
	var	currTrack = tracks.Item(i);
	var	artist = currTrack.Artist;

	if ((artist != undefined) && (artist != ""))
	{
		if (artistArray[artist] == undefined)
		{
			artistArray[artist] = new Array();
		}
		artistArray[artist].push(currTrack);
	}
}
OHWPlaylist = iTunesApp.CreatePlaylist(PlaylistName);
for (var artistNameKey in artistArray)
{
	var trackArray = artistArray[artistNameKey];

	if (trackArray.length == 1)
	{
		var	currTrack = trackArray[0];
		OHWPlaylist.AddTrack(currTrack);
	}
}

WScript.Echo("Done");