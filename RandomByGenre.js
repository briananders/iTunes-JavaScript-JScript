/*
This Program creates a randomly filled playlist for each Genre in your library.

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
		var Playlist = iTunesApp.CreatePlaylist("Random " + currGenre);
		
		for(var i = 1; i <= numTracks; i++)
		{
			var currTrack =  tracks.Item(i);
			if(Math.round(Math.random()*10) == 1 && currGenre == currTrack.Genre)
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