/*
This Program goes through all the selected tracks, saves the album art, and links the songs with no artwork to 
the saved artwork for that album.

By Brian Anders
*/

var artwork;
var artworks;
var extensions;
var file;
var format;
var location;
var name;
var t;
var trackcount;
var track;
var tracks;

name = 'cover';

var AlbumArt = new Array();

var extensions = new Array(4);
extensions[1] = 'jpg';
extensions[2] = 'bmp';
extensions[3] = 'png';

tracks = WScript.CreateObject("iTunes.Application").SelectedTracks;
TrackCount = tracks.Count;
for (t = 1; t <= TrackCount; t++) 
{
	try 
	{
		track = tracks.item(t);
		if (track.Kind == 1) 
		{
			artworks = track.Artwork;
			if (artworks.Count > 0) 
			{
				artwork = artworks.item(1);
				format = artwork.Format;
				if (format != 0) 
				{
					location = track.location;
					file = location.substring(0, location.lastIndexOf('\\') + 1) + name + '.' + extensions[format];
					AlbumArt[track.Album] = file;
					artwork.SaveArtworkToFile(file);
				}
			}
		}
	}
	catch (exception) 
	{
		WScript.echo("Problem with " + track.Name);
	}
}
WScript.Echo("Starting");

for (t = 1; t <= TrackCount; t++) 
{
	try 
		{
		var currTrack = tracks.Item(t);
		if(currTrack != null)
		{
			if(AlbumArt[currTrack.Album] != null && currTrack.Artwork.Count == 0)
			{
				currTrack.AddArtworkFromFile(AlbumArt[currTrack.Album]);
			}
		}
	}
	catch(exception)
	{
	}
}
WScript.Echo("Done");