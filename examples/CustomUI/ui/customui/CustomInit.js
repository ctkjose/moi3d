// CustomUI loader v1.5.2014
function CustomInit()
{
	var customuidir = moi.filesystem.getUIDir()+"\\customui" ;
	if (moi.filesystem.dirExists(customuidir))
	{
		var cb = moi.filesystem.getFiles(customuidir, '*.htm' );
		for ( var i = 0; i < cb.length; ++i ) 
		{
			if ( cb.Item(i).charAt(cb.Item(i).lastIndexOf("\\")+1) !== "-" )
			{
				var file = moi.filesystem.openFileStream( cb.Item(i), 'r' );
				while ( !file.AtEOF ) { document.write( file.readLine() ) }	
				file.close();
			}
		}
	} else { alert (" CustomUI folder not found "); }	
}		
	
CustomInit();
	