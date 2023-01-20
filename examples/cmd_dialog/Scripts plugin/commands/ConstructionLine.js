// config: norepeat

function DoConstuctionLines()
{
	moi.command.setCommandSpecificUndo( true );

	var pointpicker = moi.ui.createPointPicker();

	// Keep looping with a pointpicker until either cancel or done.	
	while ( 1 )
	{
		if ( !pointpicker.waitForEvent() )
			return; // waitForEvent() returned false - this is a cancel.
			
		if ( pointpicker.event == 'done' )
			break; // If done was pushed, exit loop and break out to below code.
			
		if ( pointpicker.event == 'undo' )
		{
			// If we get an undo event (user pressed the undo button or ctrl+z), then
			// remove the last cline.
			
			var gd = moi.geometryDatabase;
			var clines = gd.getObjects().getConstructionLines();
			if ( clines.length > 0 )
				gd.removeObject( clines.item(clines.length-1) );
				
			continue;		
		}
			
		// Otherwise if the point was just picked (by a click), continue looping
		// to pick another one. But remove the picked point that is displayed.
		moi.ui.removeLastPickedPoint();
	}
	
	// Set "isTemporary" to false on all the construction lines so that they will
	// persist past the end of this command rather than being removed.
	moi.geometryDatabase.getObjects().getConstructionLines().setProperty( "isTemporary", false );  // lines done, set to keep lines.
}

DoConstuctionLines();
