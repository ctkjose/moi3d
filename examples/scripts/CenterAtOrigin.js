
var objects = moi.geometryDatabase.getSelectedObjects();
	
var bbox = objects.getHighAccuracyBoundingBox();
	
var factory = moi.command.createFactory( 'move' );
factory.setInput( 0, objects );
factory.setInput( 1, bbox.center );
factory.setInput( 2, moi.view.getCPlane().origin );

factory.commit();
