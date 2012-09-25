/*
This Program goes your library and randomly gives songs a 0 rating. Just for fun.

By Brian Anders
*/


var iTunesApp = WScript.CreateObject("iTunes.Application");
var tracks = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
var numTracks = tracks.Count;

for(var i = 1; i <= numTracks; i++)
{
	var currTrack =  tracks.Item(i);
	if(currTrack != null)
	{
		if(Math.round(Math.random()*5) == 1 && currTrack.Kind == 1 && currTrack.Podcast == false)
		{
			currTrack.Rating = 0;
		}
	}
}

WScript.Echo("Done");