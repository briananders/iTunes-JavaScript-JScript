/*
This Program takes all the songs marked with "Delete" in the Genre and removes it from the Genre

By Brian Anders
*/

function main()
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	var tracks = iTunesApp.SelectedTracks;
	var numTracks = tracks.Count;
	var deleteCount = 0;
	
	while(numTracks != 0)
	{
		var currTrack = tracks.Item(numTracks);
		if(currTrack.Genre.substring(0,6) == "Delete")
		{
			//WScript.Echo("Deleting: " + currTrack.Name + " - " + currTrack.Artist + " - " + currTrack.Genre);
			currTrack.Genre = currTrack.Genre.substring(7);
			deleteCount++;
		}
		numTracks--;
	}
	WScript.Echo("UnMade " + deleteCount + " Tracks");
}

main();


