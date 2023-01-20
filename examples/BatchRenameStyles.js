// config: norepeat

#include "WaitForDialogDone.js"

function DoBatchRenameStyles()
{
	var filename = moi.filesystem.getSaveFileName( 'Text file name', 'Text files (*.txt)|*.txt' );
	if ( filename == '' )
		return;

	var styles = moi.geometryDatabase.getObjectStyles();

	var sorted_styles = [];
	for ( var i = 0; i < styles.length; ++i )
		sorted_styles.push( styles[i] );

	sorted_styles.sort( function( a, b ) { return a.name.localeCompare( b.name );  } );


	var outfile = moi.filesystem.openFileStream( filename, 'w' );
	for ( var i = 0; i < sorted_styles.length; ++i )
		outfile.writeLine( sorted_styles[i].name );

	outfile.close();


	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'WriteTextFilePrompt' );
	moi.ui.showUI( 'EditTextFilePrompt' );
	moi.ui.endUIUpdate();
	if ( !WaitForDialogDone() )
		return;


	var new_names = [];
	var infile = moi.filesystem.openFileStream( filename, 'r' );
	while ( !infile.atEOF )
		new_names.push( infile.readLine() );

	if ( sorted_styles.length != new_names.length )
	{
		moi.ui.alert( 'Error - edited file does not have the same number of lines' );
		return;
	}

	moi.geometryDatabase.styleEditorOpened();

	for ( var i = 0; i < new_names.length; ++i )
	{
		var style = sorted_styles[i];
		if ( style.name != new_names[i] )
			style.name = new_names[i];
	}

	moi.geometryDatabase.styleEditorClosed();
}

DoBatchRenameStyles();
