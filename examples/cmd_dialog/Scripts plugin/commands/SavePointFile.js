// config: norepeat

#include "GetObjects.js"

function SavePointFile()
{
	var ObjectPicker = moi.ui.createObjectPicker();
	ObjectPicker.allowPointObjects();
	if ( !GetObjects( ObjectPicker ) )
		return;
		
	var Points = ObjectPicker.objects;

	Points.sortBySelectionOrder();

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectPrompt' );
	moi.ui.showUI( 'SavePrompt' );
	moi.ui.showUI( 'SaveOptions' );
	moi.ui.endUIUpdate();

	// Wait for cancel or done.
	var dialog = moi.ui.commandDialog;
	
	while ( 1 )
	{
		if ( !dialog.waitForEvent() )
			return; // Canceled.
			
		if ( dialog.event == 'done' )
			break; // "Done" pushed.
	}
/*
	var Dlg = new ActiveXObject( 'UserAccounts.CommonDialog' );
	Dlg.Filter = 'Point files (*.txt)|*.txt|All files (*.*)|*.*|';

	if ( !Dlg.ShowOpen() )
		return; // User canceled.
	
	var filename = Dlg.FileName;
*/
	var filename = moi.geometryDatabase.getSaveFileName();

	if ( filename == '' )
		return;

	var Delimiter = moi.ui.commandUI.delimiter.value;
	if ( Delimiter == 'user' )
	{
		Delimiter = moi.ui.commandUI.text.value;
		if ( Delimiter == '' )
			return;
	}

	var Digits = moi.ui.commandUI.digits.value;

	var fso = new ActiveXObject( "Scripting.FileSystemObject" );
	var f = fso.CreateTextFile( filename, true );

	var pt = new Array(3);
	for ( var i=0; i < Points.length; i++ )
	{
		pt[0] = Points.item(i).pt.x;
		pt[1] = Points.item(i).pt.y;
		pt[2] = Points.item(i).pt.z;
		
		for ( var j=0; j < 3; j++ )
		{
			pt[j] = round( pt[j], Digits );
		}

		var point = pt.join( Delimiter );
		f.writeline( point );
	}

	f.close();
}

function round( x, n )
{
	var a = Math.pow( 10, n );
	return Math.round( x * a ) / a;
}

SavePointFile();
