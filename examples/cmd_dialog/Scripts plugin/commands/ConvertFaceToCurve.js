
var faces = moi.geometryDatabase.getSelectedObjects().getFaces();

var output_curves = moi.geometryDatabase.createObjectList();

for ( var iface = 0; iface < faces.length; ++iface )
{
	var face = faces.item(iface);
	var loops = face.getLoops();
	
	for ( var iloop = 0; iloop < loops.length; ++iloop )
	{
		var edges = loops.item(iloop);
		
		// If there is only one edge for this boundary, duplicate it since join will not generate any output for that.
		if ( edges.length == 1 )
		{
			var crv = edges.item(0).clone();
			moi.geometryDatabase.addObject( crv );
			output_curves.addObject( crv );
		}
		else
		{
			var joinfactory = moi.command.createFactory( 'join' );
			joinfactory.setInput( 0, edges );
			joinfactory.update();
			
			var result = joinfactory.getCreatedObjects();
			for ( var j = 0; j < result.length; ++j )
			output_curves.addObject( result.item(j) );
			
			joinfactory.commit();
		}
	}
}

if ( faces.length > 0 )
{
	var delfactory = moi.command.createFactory( 'delete' );
	delfactory.setInput( 0, faces );
	delfactory.commit();
}

output_curves.setProperty( 'selected', true );
