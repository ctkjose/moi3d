#include "GetObjects.js"

function DoQuickSplit_XYZ()
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
	var dist = 100.0;

// Get the parameters that were included when this command was executed.
	var params = moi.command.getCommandLineParams();
	if (params.search( /X/i ) != -1)   // The parameters contain the word "X" in it.
	{
		axis = 'x';
	}
	else if (params.search( /Y/i ) != -1)
	{
		axis = 'y';
	}
	else if (params.search( /Z/i ) != -1)
	{
		axis = 'z';
	}

	// Pick the location point of the cutting line (plane).
	var PointPicker = moi.ui.createPointPicker();
	
		while ( 1 )  // wait for the point to be picked.
		{
			if ( !PointPicker.waitForEvent() || PointPicker.event == 'done' )
				return;		
			if ( PointPicker.event == 'finished' )
				break;
		}

      	var basept = PointPicker.pt;
		var endpt = PointPicker.pt;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		//  Points are picked, so make a cutting plane by creating a line and extruding into a plane:
		// Set  the line end points.

		basept[axis] =  - dist;
		endpt[axis] = dist;

		//  Make the line along an axis
		var LineFactory = moi.command.createFactory( 'line' );
		LineFactory.setInput( 0, basept );
		LineFactory.setInput( 1, endpt );
		
		// We'll now create a line by calling calculate, but it will be a free-standing line,
		// it is not added to the geometry database yet.
		var LineList = LineFactory.calculate();
		LineFactory.cancel();

		moi.ui.clearPickedPoints();


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

		//  Extrude a plane from the line.
		var ExtrudeFactory = moi.command.createFactory( 'extrude' );
		ExtrudeFactory.setInput( 0, LineList );
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

DoQuickSplit_XYZ();

