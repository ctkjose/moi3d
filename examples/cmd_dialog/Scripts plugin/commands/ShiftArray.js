#include "GetLine.js"

function DoShiftArray()
{
	var LinePoints = new Array();

	if ( !GetLine( LinePoints ) )
		return;
		
	// Get all selected objects.
	var Objects = moi.geometryDatabase.getSelectedObjects();
	
	// Get all the point objects out of the selected objects.
	var Points = Objects.getPoints();
	
	var NumPoints = Points.length;
	if ( NumPoints == 0 )
		return;
		
	// Calculate the number of objects in one single array instance, expecting
	// this to be a multiple of the number of point objects.
	var ObjectSetSize = Math.floor( Objects.length / NumPoints );
	if ( NumPoints * ObjectSetSize != Objects.length )
		return;
		
	// Create an array of factories, one per object set.
	var NumSets = Objects.length / ObjectSetSize;
	
	var Counter = 0;
	
	var Shift = 0.0;
	
	for ( var i = 0; i < NumSets; ++i )
	{
		var ObjectSet = moi.geometryDatabase.createObjectList();
		var OriginPt = null;
		
		for ( j = 0; j < ObjectSetSize; ++j )
		{
			var Obj = Objects.item(Counter);
			++Counter;
			
			if ( Obj['pt'] != undefined )
			{
				// Point objects have a "pt" property that gets the x,y,z point. Get that
				// as the scaling origin.
				OriginPt = Obj.pt;
			}
			else
			{
				// Not a point object, add it to the object list to be scaled.
				ObjectSet.addObject( Obj );
			}
		}
		
		if ( ObjectSet.length == 0 || OriginPt == null )
			return;
			
		// We've now got the objects to be scaled and the origin point for this set,
		// create the factory and fill these in.
		var Factory = moi.command.createFactory( 'move' );
		Factory.setInput( 0, ObjectSet );
		Factory.setInput( 1, LinePoints[0] );
		
		var Dir = moi.vectorMath.makeVector( LinePoints[0], LinePoints[1] );
		
		Shift += i;
		Dir.scale( Shift );
	
		var EndPt = moi.vectorMath.createPoint( LinePoints[0].x, LinePoints[0].y, LinePoints[0].z );
		EndPt.add( Dir );
		
		Factory.setInput( 2, EndPt );
		Factory.update();
		Factory.commit();
	}
	
	// Remove the point objects.
	moi.geometryDatabase.removeObjects( Points );
}

DoShiftArray();
