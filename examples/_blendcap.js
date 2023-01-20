
function DoBlendCap()
{
	var edges = moi.geometryDatabase.getSelectedObjects().getEdges();
	
	if ( edges.length != 1 || !edges.item(0).isClosed )
	{
		moi.ui.alert( 'Select one closed edge before running this command' );
		return;
	}

	var edge = edges.item(0);
	
	// Create a point at the start of the edge, and then use arraycurve to generate
	// the midpoint of the edge.
	
	var pt_factory = moi.command.createFactory( 'point' );
	pt_factory.setInput( 0, edge.getStartPt() );
		
	var array_factory = moi.command.createFactory( 'arraycurve' );
	array_factory.setInput( 0, pt_factory.calculate() ); // Objects
	array_factory.setInput( 1, edge );                   // Path
	array_factory.setInput( 2, 'NumItems' );             // Mode
	array_factory.setInput( 3, 2 );                      // Num items
	
	var midpt = array_factory.calculate();
	
	
	// Split the edge into 2 pieces at the midpoint.
	
	var trim_factory = moi.command.createFactory( 'trim' );
	trim_factory.setInput( 0, edges ); // Objects to trim.
	trim_factory.setInput( 1, midpt ); // Cutting objects.
	
	trim_factory.generateFragments();
	trim_factory.finishedPickingFragments();

	// Assign a name to the edge so we can find its split up pieces after the trim and select them.

	var nametag = '$$_BlendCapEdge_$$';
	edge.name = nametag;
	
	trim_factory.update();
	var trim_res = trim_factory.getCreatedObjects().item(0);
	trim_factory.commit();
	
	var brep_edges = trim_res.getEdges();
	
	for ( var i = 0; i < brep_edges.length; ++i )
	{
		var thisedge = brep_edges.item(i);
		if ( thisedge.name == nametag )
		{
			thisedge.name = '';
			thisedge.selected = true;
		}
	}
	
	moi.command.execCommand( 'blend' );
}

DoBlendCap();
