
function DoMultiSave()
{
	var gd = moi.geometryDatabase;
	
	var filename = gd.currentFileName;
	if ( filename == '' )
		return; // No file name set yet.
		
	// First save the 3DM file.
	gd.save();
	
	var filename_without_extension =  filename.substr( 0, filename.lastIndexOf('.') );
	
	// Save to an .igs file.
	gd.saveAs( filename_without_extension + '.igs' );
	
	// Save to a .lwo file.
	gd.saveAs( filename_without_extension + '.lwo' );
}

DoMultiSave();
