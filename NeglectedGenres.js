/*
This Program creates a playlist for each genre and fills them with the songs that you've never listened to
and are rated 0.

By Brian Anders
*/



var iTunesApp = WScript.CreateObject("iTunes.Application");
var tracks = iTunesApp.LibrarySource.Playlists.ItemByName("Music").Tracks;
var numTracks = tracks.Count;

var genrelist = new Array();

function main()
{
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		var Genre = currTrack.Genre;
		if(inList(Genre))
		{;}
		else
		{
			genrelist[genrelist.length] = Genre;
		}
	}
	WScript.Echo(genrelist);


	for(var j = 0; j < genrelist.length; j++)
	{
		var currGenre = genrelist[j];
		var Playlist = iTunesApp.CreatePlaylist("Neglected " + currGenre + " Songs");
		
		for(var i = 1; i <= numTracks; i++)
		{
			var currTrack =  tracks.Item(i);
			if(currGenre == currTrack.Genre && (currTrack.Rating == 0 && currTrack.PlayedCount == 0))
			{
				Playlist.AddTrack(currTrack);
			}
		}
	}
	WScript.Echo("Done");
}
	
function inList(Genre)
{
	for(var i = 0; i < genrelist.length; i++)
	{
		if(genrelist[i] == Genre)
		{
			return true;
		}
	}
	return false;
}

main();