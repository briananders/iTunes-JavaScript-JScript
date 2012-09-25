/* 
This Program Fixes the Capitalization in the Track titles from the
"__Fix Capitals__" Playlist.

!!!WARNING!!! things like VII will become Vii if you don't remove them from 
the playlist before running this program.

By Brian Anders
*/

String.prototype.capitalize = function(){   return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );  };

function isAlpha(xStr){  
    var regEx = /^[a-zA-Z0-9\-]+$/;  
    return xStr.match(regEx);  
}


function ProperCaps(Name)
{
	var i;
	var Cap = true;
	var let;
	var exceptions = " _(-:/.,[\"";
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


var   iTunesApp = WScript.CreateObject("iTunes.Application");
var   mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("__Fix Capitals__");
var   tracks = mainLibrary.Tracks;
var   numTracks = tracks.Count;
var   i;
var   j;
var   Tname;
var   Count;
 

for (i = 1; i <= numTracks; i++)
{
      var   currTrack = tracks.Item(i);
      Tname = ProperCaps(currTrack.Name);
      
      //Count = Tname.length;
      //WScript.Echo(Tname + " - " + Tname.capitalize());
      //Tname = Tname.toLowerCase();
      //WScript.Echo(Tname + " - " + Tname.capitalize());
      //currTrack.Name = Tname.capitalize();
      
      //WScript.Echo(currTrack.Name + " --is now--> " + Tname);
      currTrack.Name = Tname;      
}

WScript.Echo("Done With Name Capitals");