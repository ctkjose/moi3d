
function DoQuickCircle()
{
	// Start by creating a point picker, and set its stickToSurfacesMode to 'max' so that it
	// will want to align its orientation by just a single pick on a surface.
	var pointpicker = moi.ui.createPointPicker();
	pointpicker.stickToSurfacesMode = 'max';		


	// We'll keep looping so you can place many circles while in this command.
	while ( 1 )
	{
		// Create a circle factory. A circle factory can take several inputs for the center
		// point radius point or exact radius value, etc... In this case we only need to
		// fill in input 1 which is the center point and orientation frame, and input 3
		// which is the radius value.
	
		var factory = moi.command.createFactory( 'circle' );

		// Clear all previous picked points so we don't get the previous picked point acting
		// as a base point.
		moi.ui.clearPickedPoints();
		
		// Clear all previous bindings for the pointpicker.
		pointpicker.clearBindings();
		
		// Bind the pointpickers point and orientation frame to the factory's input #1.
		pointpicker.bindResultFrame( factory.getInput(1) );
		
		// Set input #3 to the current radius value in the radius control.
		factory.setInput( 3, moi.ui.commandUI.radius.numericValue );

		// Pointpicker event loop.
		while ( 1 )
		{
			if ( !pointpicker.waitForEvent() || pointpicker.event == 'done' )
				return;
				
			// When the point is finished being picked, break out of the loop.
			if ( pointpicker.event == 'finished' )
				break;
				
			// If we get a radius event, it means a new value was entered in the radius
			// control, update the radius on the factory.
			if ( pointpicker.event == 'radius' )
				factory.setInput( 3, moi.ui.commandUI.radius.numericValue );
		}
		
		// If we get to here, the point was finished being picked successfully, commit the factory.
		factory.commit();
	}
}

DoQuickCircle();
