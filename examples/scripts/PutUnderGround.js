
var objects = moi.geometryDatabase.getSelectedObjects();
	
var bbox = objects.getHighAccuracyBoundingBox();

var minpt = bbox.max;
var groundpt = moi.vectorMath.createPoint( minpt.x, minpt.y, 0 );
	
var factory = moi.command.createFactory( 'move' );
factory.setInput( 0, objects );
factory.setInput( 1, minpt );
factory.setInput( 2, groundpt );

factory.commit();
