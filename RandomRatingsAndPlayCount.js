/*
This Program goes through your library and gives all the tracks random playcounts and random ratings.
Just for fun.

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
		if(currTrack.Kind == 1 && currTrack.Podcast == false && currTrack.Enabled)
		{
			currTrack.Rating = Math.round(Math.random()*100);
			currTrack.PlayedCount += Math.round(Math.random()*1000);
		}
	}
}

WScript.Echo("Done");