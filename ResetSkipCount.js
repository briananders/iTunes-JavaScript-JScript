/*
This Program sets the SkipCount of all the selected tracks back to 0.

By Brian Anders
*/

var iTunesApp = WScript.CreateObject("iTunes.Application");
var tracks = iTunesApp.SelectedTracks;
var numTracks = tracks.Count;

while(numTracks != 0)
{
	var currTrack = tracks.Item(numTracks);
	if(currTrack != null && currTrack.Kind == 1)
	{
			currTrack.SkippedCount = 0;
	}
	numTracks--;
}
WScript.Echo("Done");