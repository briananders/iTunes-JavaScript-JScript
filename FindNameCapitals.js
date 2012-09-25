/* 
This Program Finds all the tracks in the library with poor
Capitalization in the Name field and puts them in the
"__Fix Capitals__" Playlist.

!!!WARNING!!! this program will count VII as wrong because it isn't 
in the form [capital][lower][lower][low... etc.

By Brian Anders
*/

function isAlpha(xStr){  
    var regEx = /^[a-zA-Z0-9\-]+$/;  
    return xStr.match(regEx);  
}

function ProperCaps(Name)
{
	var i;
	var Cap = true;
	var let;
	var exceptions = " _(-:.,/[\"";
	var NewName = "";


	for(i = 0; i < Name.length; i++)
	{
		let = Name.charAt(i);	
		//WScript.Echo(Name + " at position " + i + " is " + Name.charAt(i));
		if (isAlpha(let))
		{
			if (Cap)
			{
				let = let.toUpperCase();
				Cap = false;
			}
			else
			{
				let = let.toLowerCase();
			}
		}
		if(exceptions.indexOf(let) != -1)
		{
			Cap = true;
		}
		else
			;	
		NewName = NewName + let;
	//WScript.Echo(NewName);
	}
	return NewName;
}

var iTunesApp = WScript.CreateObject("iTunes.Application");
var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Music");
//var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("test");
var tracks = mainLibrary.Tracks;
var numTracks = tracks.Count;

NewPlaylist = iTunesApp.CreatePlaylist("__Fix Capitals__");

for (var i = 1; i <= numTracks; i++)
{
	var currTrack = tracks.Item(i);
    var	Tname = ProperCaps(currTrack.Name);
	if (Tname != currTrack.Name)
	{
		NewPlaylist.AddTrack(currTrack);
	}
}

WScript.Echo("Done!");