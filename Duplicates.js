/*
This Program makes three playlists (__Name_Duplicates__, __Exact_Duplicates__, __Super_Duplicates__) 
and fills them with duplicates by Name (track, artist, album), by Time (track, artist, album, time),
and by Time +- 5 (track, artist, album, time +- 5).

By: Brian Anders
*/

var TrackList = new Array();
var TrackTimeList = new Array();

Main();

function Main()
{
	var iTunesApp = WScript.CreateObject("iTunes.Application");
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
	//var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("test");
	var tracks = mainLibrary.Tracks;
	var numTracks = tracks.Count;
	
	var Name_Duplicates = iTunesApp.CreatePlaylist("__Name_Duplicates__");
	var Exact_Duplicates = iTunesApp.CreatePlaylist("__Exact_Duplicates__");
	var Super_Duplicates = iTunesApp.CreatePlaylist("__Super_Duplicates__");
	
	for (var i = 1; i <= numTracks; i++)
	{
		currTrack = tracks.Item(i);
		if(currTrack != null)
			TrackList[TrackList.length] = currTrack.Artist + currTrack.Album + currTrack.Name;
	}
	
	for (var i = 1; i <= numTracks; i++)
	{
		currTrack = tracks.Item(i);
		if(NOI(TrackList, currTrack.Artist + currTrack.Album + currTrack.Name) > 1)
		{
			Name_Duplicates.AddTrack(currTrack);
		}
	}WScript.Echo("Name_Duplicates Populated");
	
	var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("__Name_Duplicates__");
	var tracks = mainLibrary.Tracks;
	var numTracks = tracks.Count;
	
	for (var i = 1; i <= numTracks; i++)
	{
		currTrack = tracks.Item(i);
		TrackTimeList[TrackTimeList.length] = currTrack.Artist + currTrack.Album + currTrack.Name + currTrack.Time;
	}
	for (var i = 1; i <= numTracks; i++)
	{
		currTrack = tracks.Item(i);
		if(NOI(TrackTimeList, currTrack.Artist + currTrack.Album + currTrack.Name + currTrack.Time) > 1)
		{
			Exact_Duplicates.AddTrack(currTrack);
			//WScript.Echo(currTrack.Time);
		}
	}WScript.Echo("Exact_Duplicates Populated");
	for (var i = 1; i <= numTracks; i++)
	{
		currTrack = tracks.Item(i);
		if(HNOI(TrackTimeList, currTrack.Artist + currTrack.Album + currTrack.Name + currTrack.Time) > 1)
		{
			Super_Duplicates.AddTrack(currTrack);
			//WScript.Echo(currTrack.Time);
		}
	}WScript.Echo("Super_Duplicates Populated");

WScript.Echo("Done");
}

function NOI(list, word)
{
	count = 0;
	for(var i = 0; i < list.length; i++)
	{
		if(list[i] == word)
			count++;
	}
	return count;
}

function HNOI(list, word)
{
	count = 0;
	for(var i = 0; i < list.length; i++)
	{
		var original = list[i];
		var piece = original.substring(0,original.length-2);
		var seconds = parseInt(original.substring(original.length-2,original.length), 10);
		//WScript.Echo(list[i].substring(0,list[4].length-2) + (seconds + 1));
		for(var j = -2; j <= 2; j++)
		{
			if(piece + (seconds + j) == word)
			{
				count++;
			}
		}
	}
	return count;
}