
function DoRingCircle()
{
	// Create a circle factory. The inputs of this factory control different parameters
	// of the circle.
	var Factory = moi.command.createFactory( 'circle' );

	// We want to create a frame to align the circle to the front view, so create the frame
	// with an x-axis pointing to the right (1,0,0) and a y axis pointing upwards (0,0,1),
	// with the origin at 0,0,0.
	var FrameOrigin = moi.vectorMath.createPoint( 0, 0, 0 );
	var FrameXAxis = moi.vectorMath.createPoint( 0, 0, -1 );
	var FrameYAxis = moi.vectorMath.createPoint( 1, 0, 0 );
	var Frame = moi.vectorMath.createFrame( FrameOrigin, FrameXAxis, FrameYAxis );
	
	// Set the frame on the factory.
	Factory.setInput( 1, Frame );

	// Set the flag to tell the factory to use diameter instead of radius.
	Factory.setInput( 0, false );
	
	// Retrieve the current diameter from the UI.
	var Diameter = moi.ui.commandUI.GetDiameter();
	
	// Set the diameter on the factory and update it to generate the initial output.
	Factory.setInput( 3, Diameter );
	Factory.update();
	
	var Dialog = moi.ui.commandDialog;
	
	// Do an event loop and process any actions from UI controls.
	while ( 1 )
	{
		if ( !Dialog.waitForEvent() )
			return; // Canceled, bail out without committing the factory.
			
		if ( Dialog.event == 'done' )
			break; // Done was pushed, break out of the event loop and finish.

		// Otherwise one of the drop-downs has changed, update the diameter on the factory.
		Factory.setInput( 3, moi.ui.commandUI.GetDiameter() );
		Factory.update();
	}

	// Commit the factory to finalize creation of the circle.
	Factory.commit();
}

DoRingCircle();
