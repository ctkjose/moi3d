#include "GetObjects.js"

function DoMoveSliceToPoint()
{
	var objectpicker = moi.ui.createObjectPicker();
	if ( !GetObjects( objectpicker ) )
		return;
		
	// Find the point objects closest to 0,0,0 and furthest from 0,0,0
	
	var pts = moi.geometryDatabase.getObjects().getPoints();
	if ( pts.length < 2 )
		return;
		
	var mindist, maxdist;
	var minpt = null, maxpt = null;
	var origin = moi.vectorMath.createPoint( 0, 0, 0 );

	for ( var i = 0; i < pts.length; ++i )
	{
		var thispt = pts.item(i);
		if ( thispt.hidden )
			continue;		
		
		var thisdist = moi.vectorMath.distance( origin, thispt.pt );
		
		if ( minpt == null || thisdist < mindist )
		{
			mindist = thisdist;
			minpt = thispt;
		}
		
		if ( maxpt == null || thisdist > maxdist )
		{
			maxdist = thisdist;
			maxpt = thispt;
		}
	}
	
	// Now set up a Move transform for the selected objects, from the min pt to the max pt.
	var factory = moi.command.createFactory( 'move' );
	factory.setInput( 0, objectpicker.objects );
	factory.setInput( 1, minpt.pt );
	factory.setInput( 2, maxpt.pt );
	factory.commit();

	// Now remove the far point object.
	moi.geometryDatabase.removeObject( maxpt );	
	
	moi.geometryDatabase.deselectAll();
}

DoMoveSliceToPoint();
