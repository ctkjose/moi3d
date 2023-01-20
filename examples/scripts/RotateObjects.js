// config: norepeat noautolaunch

#include "GetObjects.js"

function DoRotateObjects()
{
	var objectpicker = moi.ui.createObjectPicker();
	if ( !GetObjects( objectpicker ) )
		return;
		
	var objs = objectpicker.objects;
		
	// Set up a rotation of each object around its own centroid point.
	for ( var i = 0; i < objs.length; ++i )
	{
		var obj = objs.item(i);
		
		var objlist = moi.geometryDatabase.createObjectList();
		objlist.addObject( obj );
		
		// Objects to rotate.		
		var factory = moi.command.createFactory( 'rotate' );
		factory.setInput( 0, objlist );
		
		// Coordinate frame for rotation, the rotation will happen around z axis of the frame.
		var frame = moi.vectorMath.createTopFrame();
		frame.origin = obj.getBoundingBox(true).center;
		factory.setInput( 1, frame );
		
		// Angle to rotate by.
		factory.setInput( 2, 90.0 );
		
		factory.commit();
	}
}

DoRotateObjects();
