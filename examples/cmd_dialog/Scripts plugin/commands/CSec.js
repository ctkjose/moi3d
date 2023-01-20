#include "GetObjects.js"

function DoCSec()
{
	// First pick the section curves.

	var ObjectPicker = moi.ui.createObjectPicker();
	ObjectPicker.allowCurves();
	if ( !GetObjects( ObjectPicker ) )
		return;
		
	var Curves = ObjectPicker.objects;
	if ( Curves.length < 3 )
		return;

	Curves.sortBySelectionOrder();

	var PointPicker = moi.ui.createPointPicker();
	
	while ( 1 )
	{
		// Pick the start point of the section cutting line.
	
		PointPicker.reset();
		PointPicker.disableVerticalStraightSnap = true;
	
		moi.ui.beginUIUpdate();
		moi.ui.hideUI( 'SelectPrompt' );
		moi.ui.hideUI( 'LineEndPrompt' );
		moi.ui.showUI( 'LineStartPrompt' );
		moi.ui.endUIUpdate();
		
		while ( 1 )
		{
			if ( !PointPicker.waitForEvent() || PointPicker.event == 'done' )
				return;
				
			if ( PointPicker.event == 'finished' );
				break;
		}

		// Pick the end point of the section cutting line.
		moi.ui.beginUIUpdate();
		moi.ui.hideUI( 'LineStartPrompt' );
		moi.ui.showUI( 'LineEndPrompt' );
		moi.ui.endUIUpdate();
		
		var LineFactory = moi.command.createFactory( 'line' );
		LineFactory.setInput( 0, PointPicker.pt );
		PointPicker.bindResultPt( LineFactory.getInput(1) );
		
		while ( 1 )
		{
			if ( !PointPicker.waitForEvent() || PointPicker.event == 'done' )
				return;
				
			if ( PointPicker.event == 'finished' );
				break;
		}
		
		moi.ui.clearPickedPoints();
		
		// We'll now create a line by calling calculate, but it will be a free-standing line,
		// it is not added to the geometry database yet.
		var LineList = LineFactory.calculate();
		LineFactory.cancel();

		// Extrude a plane from the line.
		
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
		ExtrudeFactory.cancel();
		if ( PlaneList.length != 1 )
			continue;
			
		var Plane = PlaneList.item(0);
		
		
		// Now intersect the plane with the curves to generate points.
		var IntersectFactory = moi.command.createFactory( 'intersect' );
		var Objects = moi.geometryDatabase.createObjectList();
		for ( var i = 0; i < Curves.length; ++i )
			Objects.addObject( Curves.item(i) );
		
		Objects.addObject( Plane );
		IntersectFactory.setInput( 0, Objects );
		
		var PointList = IntersectFactory.calculate();
		IntersectFactory.cancel();
		
		
		if ( PointList.length != Curves.length )
			continue;
			
			
		// Now we have points, we can interpolate a curve through them.
		var InterpFactory = moi.command.createFactory( 'interpcurve' );
		
		for ( var i = 0; i < PointList.length; ++i )
		{
			// interpcurve has a variable number of inputs, so they have to be created.
			InterpFactory.createInput( 'point' );
			InterpFactory.setInput( InterpFactory.numInputs - 1, PointList.item(i).pt );
		}
		
		// Close it by repeating the first point.
		InterpFactory.createInput( 'point' );
		InterpFactory.setInput( InterpFactory.numInputs - 1, PointList.item(0).pt );
		
		// Ok, finally this is the thing we want to keep.
		InterpFactory.commit();
	}
}

DoCSec();
