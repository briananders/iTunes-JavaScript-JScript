/* 
This Program Fixes the Capitalization in the Title, Artist, and Album for the selected tracks.

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
	var exceptions = " _(-:/[\.,\"";
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

var objApp = WScript.CreateObject("iTunes.Application");
var tracks = objApp.SelectedTracks;
var numTracks = tracks.Count;

while(numTracks != 0)
{
	var   currTrack = tracks.Item(numTracks);
	Tname = ProperCaps(currTrack.Name);

	currTrack.Name = Tname;  

	numTracks--;	  
}

WScript.Echo("Done With Name Capitals!");

var objApp = WScript.CreateObject("iTunes.Application");
var tracks = objApp.SelectedTracks;
var numTracks = tracks.Count;

while(numTracks != 0)
{
	var   currTrack = tracks.Item(numTracks);
	Tname = ProperCaps(currTrack.Artist);

	currTrack.Artist = Tname;

	numTracks--;
}

WScript.Echo("Done With Artist Capitals!");

var objApp = WScript.CreateObject("iTunes.Application");
var tracks = objApp.SelectedTracks;
var numTracks = tracks.Count;
 
while (numTracks != 0)
{
	var   currTrack = tracks.Item(numTracks);
	Tname = ProperCaps(currTrack.Album);

	currTrack.Album = Tname;      
	
	numTracks--;
}

WScript.Echo("Done With Album Capitals!");