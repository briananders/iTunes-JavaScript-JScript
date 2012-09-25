/* 
This Program will look at the artists of all the selected songs and make 
a new playlist (__Artist__) that has all the songs by those artists

By Brian Anders
*/

var artistlist = new Array();

function main()
{
	MakeList();

	var iTunesApp = WScript.CreateObject("iTunes.Application");
	//var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	var mainLibrary = iTunesApp.SelectedTracks;
	var tracks = mainLibrary.Tracks;
	var numTracks = tracks.Count;
	
	var ArtistPlaylist = iTunesApp.CreatePlaylist("__Artist__");

	for (var j = 1; j <= numTracks; j++)
	{
		var currTrack = tracks.Item(j);
		if (isin(artistlist, currTrack.Artist) != -1) //(currTrack.Artist != Artist)
		{
			ArtistPlaylist.AddTrack(currTrack);
		} 
	}

	WScript.Echo("Done!");
}

main();

function MakeList()
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	//var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("test");
	var tracks = iTunesApp.SelectedTracks;
	var numTracks = tracks.Count;

	//Figures out what the highest Playtrack is for each album
	while (numTracks != 0)
	{
		var currTrack = tracks.Item(numTracks);
		var Artist = currTrack.Artist;
		if(isin(artistlist, Artist) == -1)
		{
			artistlist[artistlist.length] = Artist;
		}
		
		numTracks--;
	}

	WScript.Echo("List Made");
}

function isin(list, x)
{
	for(var i = 0; i < list.length; i++)
	{
		if(list[i] == x)
		{
			return i;
		}
	}
	//WScript.Echo("Failed");
	return -1;
}