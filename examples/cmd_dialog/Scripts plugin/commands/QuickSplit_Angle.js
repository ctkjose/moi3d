#include "GetObjects.js"

function DoQuickSplit_Angle()
{
	// First get picked  object to be split.
	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowBReps();

	if ( !GetObjects( objectpicker, true ) )
		return;
		
	var baseobjects = objectpicker.objects;
	if ( baseobjects.length == 0 )
		return;

	var Booleanfactory = moi.command.createFactory( 'booleandifference' );
	Booleanfactory.setInput( 0, baseobjects );

	var axis = 'x';

	var view_name = moi.ui.getActiveViewport().Name;    //  test for which viewport the mouse is in,
	switch (view_name)															//  and adjust the axis accordingly.
		{
		case  'Right':
					axis = 'y'; break;
		case  'Left' :
					axis = 'x'; break;
		case  'Top' :
					axis = 'x'; break;
		}

	var dist = 100.0;  // The amount to extend the cutting plane beyond the first picked point.

	// Pick the location point of the cutting line (plane).
	var PointPicker = moi.ui.createPointPicker();
	
		while ( 1 )
		{
			if ( !PointPicker.waitForEvent() || PointPicker.event == 'done' )
				return;		
			if ( PointPicker.event == 'finished' )
				break;
		}

      	var basept = PointPicker.pt;
		var endpt = PointPicker.pt;

		var rotationpt = PointPicker.ptframe;
		PointPicker.restrictToPlaneThroughPt( rotationpt.origin, true );

		while ( 1 )
		{
			if ( !PointPicker.waitForEvent() || PointPicker.event == 'done' )
				return;
			if ( PointPicker.event == 'finished' )
				break;
		}
		
		var rotation_endpt = PointPicker.pt;		

		//  Points are picked, so make a cutting plane by creating a line and extruding into a plane:
		// Extend and set  the line end points.
		basept[axis] =  - dist;
		endpt[axis] = dist;

		//   Create the line:
		var LineFactory = moi.command.createFactory( 'line' );
		LineFactory.setInput( 0, basept );
		LineFactory.setInput( 1, endpt );
		// We'll now create a line by calling calculate, but it will be a free-standing line,
		// it is not added to the geometry database yet.
		var LineList = LineFactory.calculate();
		LineFactory.cancel();

		LineList.setProperty( 'hidden', true );
		moi.geometryDatabase.addObjects( LineList );

		//  Rotate the line thru the 2nd picked point.
		var factory = moi.command.createFactory( 'rotate' );
		factory.setInput( 0, LineList );
		factory.setInput( 1, rotationpt );  // frame, center of rotation.
		factory.setInput( 3, basept );  // end of the line, 1st reference point.
		factory.setInput( 4, rotation_endpt );  // point to rotate to.
		factory.setInput( 5, false );  // no copies.

		var RotatedLine = factory.calculate();
		factory.cancel();

		moi.ui.clearPickedPoints();
		moi.geometryDatabase.removeObjects( LineList );

		//  Extrude a plane from the rotated line.
		var ExtrudeFactory = moi.command.createFactory( 'extrude' );
		ExtrudeFactory.setInput( 0, RotatedLine );
		ExtrudeFactory.setInput( 2, 100.0 ); // Extrusion distance.
		ExtrudeFactory.setInput( 6, true ); // Both sides.
		
		// Set the extrusion direction to be normal to the construction plane that was picked.
		var ExtrusionDirBase = PointPicker.pt;
		var ExtrusionDirEnd = moi.vectorMath.add( ExtrusionDirBase, PointPicker.cplane.zaxis );
		ExtrudeFactory.setInput( 3, ExtrusionDirBase ); // Extrusion direction base point.
		ExtrudeFactory.setInput( 4, ExtrusionDirEnd );  // Extrusion direction second point.

		var PlaneList = ExtrudeFactory.calculate();
		if ( PlaneList.length != 1 )
			return;

		ExtrudeFactory.cancel();
		
		// Currently to be used in a boolean, the plane must be inserted into the geometry
		// database so it gets a unique ID assigned to it. We can set it as hidden so it
		// doesn't flash on the screen.
		PlaneList.setProperty( 'hidden', true );
		moi.geometryDatabase.addObjects( PlaneList );
		
		// Do a boolean diff between the object and the cutting plane.
		Booleanfactory.setInput( 1, PlaneList );
		Booleanfactory.commit();
}

DoQuickSplit_Angle();

