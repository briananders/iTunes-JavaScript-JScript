/* 
This Program goes through the selected tracks and gives them random Track Numbers. 
Best used if you only do one album at a time.

By Brian Anders
*/

var objApp = WScript.CreateObject("iTunes.Application");
var tracks = objApp.SelectedTracks;
var numTracks = tracks.Count;
var i = numTracks;
var TracksArray = new Array();
TracksArray[0] = 1;
 
while(i != 0)
{
	var currTrack = tracks.Item(i);
	var number = Math.round(Math.random()*currTrack.TrackCount);
	while(TracksArray[number] != null)
	{
		var number = Math.round(Math.random()*currTrack.TrackCount);
	}
	if(currTrack != null)
	{
		currTrack.TrackNumber = number;
		TracksArray[number] = 1;
	}

	i--;
}


WScript.Echo("Done");