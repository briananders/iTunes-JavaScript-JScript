/* 
This Program builds a tree of playlists using folders for the selected Tracks.

By Brian Anders
*/

var iTunesApp = WScript.CreateObject("iTunes.Application");
//var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("A");
var tracks = iTunesApp.SelectedTracks;
var MainFolder = iTunesApp.CreateFolder("Main Folder");

function main()
{
	var Artists = new Array();
	var Albums = new Array();

	AllArtists = MainFolder.CreateFolder("#All Artists");
	AllAlbums = AllArtists.CreatePlaylist("#All Albums");

	var numTracks = tracks.Count;
	for(var i = 1; i <= numTracks; i++) //Fills up arrays for all artists and albums
	{
		var currTrack = tracks.Item(i);
		if(isin(Artists, currTrack.Artist) == false)
		{
			Artists[Artists.length] = currTrack.Artist;
		}
		if(isin(Albums, currTrack.Artist + "|" + currTrack.Album) == false)
		{
			Albums[Albums.length] = currTrack.Artist + "|" + currTrack.Album;
		}
	}
	//WScript.Echo(Artists);
	//WScript.Echo(Albums);
	for(var i = 0; i < Artists.length; i++) //Creates Folder for each Artist and #All Albums Playlist
	{
		ArtistFolder = MainFolder.CreateFolder(Artists[i]);
		ArtistFolder.CreatePlaylist("#All Albums - " + Artists[i]);
		
		var Albs = getArtAlbs(Artists[i], Albums);
		for(var j = 0; j < Albs.length; j++) //Create Playlist for Each Album
		{
			AllArtists.CreatePlaylist(Albs[j] + " by " + Artists[i]);
			ArtistFolder.CreatePlaylist(Albs[j] + " - " + Artists[i]);
		}
	}
	
	for(var i = 1; i <= numTracks; i++)
	{
		var currTrack = tracks.Item(i);
		iTunesApp.LibrarySource.Playlists.ItemByName("#All Albums").AddTrack(currTrack);
		iTunesApp.LibrarySource.Playlists.ItemByName("#All Albums - " + currTrack.Artist).AddTrack(currTrack);
		iTunesApp.LibrarySource.Playlists.ItemByName(currTrack.Album + " - " + currTrack.Artist).AddTrack(currTrack);
		iTunesApp.LibrarySource.Playlists.ItemByName(currTrack.Album + " by " + currTrack.Artist).AddTrack(currTrack);
	}
}
main();

WScript.Echo("done");

function getArtAlbs(Artist, Albums)
{
	var Albs = new Array();
	for(var i = 0; i < Albums.length; i++)
	{
		if(getArtist(Albums[i]) == Artist) 
			Albs[Albs.length] = getAlbum(Albums[i]);
	}
	return Albs
}

function isin(list, string)
{
	for(var i = 0; i < list.length; i++)
	{
		if(list[i] == string)
			return true;
	}
	return false;
}

function getArtist(string)
{
	var artist = ""
	for(var i = 0; i < string.length; i++)
	{
		if(string.charAt(i) == "|")
			return artist;
		artist += string.charAt(i);
	}
}

function getAlbum(string)
{
	var album = ""
	var go = false;
	for(var i = 0; i < string.length; i++)
	{
		if(string.charAt(i) == "|")
			go = true;
		if(go && string.charAt(i) != "|")	
			album += string.charAt(i);
	}
	return album;
}