/*
An antiprism is a uniform polyhedron consisting of 2 n-gon faces, rotated with respect to each other, connected by 2n equilateral triangles.  With practice, these antiprisms can easily be constructed by using Moi interactively.  The height can be constructed.

https://en.wikipedia.org/wiki/Antiprism

So far, this antiprism script creates only the vertex points, or else only a polyline of portions of the side triangles.
The minimum n-gon Side number is 2, which yields tetrahedron vertices.  This "n-gon" is "degenerate".
An n-gon Side number of 3, yields octahedron vertices.

Possible improvements:
1.  Use polygon factory to add top and bottom faces.
2.  Modify the script to create the triangular side faces, and/or top and bottom faces.
3.  Use circular array.
3.  Add code for a 3D convex hull, such as 3D Gift Wrap algorithm.

Moi javascript version by Brian McMillin, September 2, 2015.
*/

function Cancel( factories )
{
	for ( var i = 0; i < factories.length; ++i )
		factories[i].cancel();
		
	factories.length = 0;
}

function Commit( factories )
{
	for ( var i = 0; i < factories.length; ++i )
		factories[i].commit();
}

function  EvalPt( kpi_n, k, hvalue )
{
	// Define x, y, and z values.
	var x = Math.cos(kpi_n);	
	var y = Math.sin(kpi_n);
	var z = Math.pow(-1,k) * hvalue; 	
	return moi.vectorMath.createPoint( x, y, z );
}

function Update( ngon, buildtype, factories )
{
	Cancel( factories );
	var pi_n = Math.PI / ngon;
	var hvalue = Math.sqrt((Math.cos(pi_n) - Math.cos(2 * pi_n)) / 2);

	var startPt = EvalPt( 0, 0, hvalue);

	if ( buildtype == 'points' )
	{
		var pointfactory = moi.command.createFactory( 'point' );

		for (var k = 0; k < (2 * ngon); ++k )
		{
			var kpi_n = k * pi_n;
			var pt = EvalPt( kpi_n, k, hvalue);
			var pointfactory = moi.command.createFactory( 'point' );
			pointfactory.setInput( 0, pt );
			factories.push( pointfactory );
		}
	}	
	
	else
	{
		var factory = moi.command.createFactory( 'polyline' );	

		for (var k = 0; k < (2 * ngon); ++k )
		{
			var kpi_n = k * pi_n;
			var pt = EvalPt( kpi_n, k, hvalue);
			factory.createInput( 'point' );
			factory.setInput( factory.numInputs - 1, pt );
		}
		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, startPt );

		factories.push( factory );		
	}	
	
	for ( var i = 0; i < factories.length; ++i )
		factories[i].update();
}

function DoAntiPrism()
{
	// factories holds either vertex points, or else lines,
	// depending upon user selection.
	var factories = new Array();
	var UI = moi.ui.commandUI
	
	Update( UI.ngon.integerValue, UI.Build.value, factories );

	var dialog = moi.ui.commandDialog;

	while ( 1 )
	{
		if ( !dialog.waitForEvent() )
		{
			Cancel( factories );
			return;
		}
			
		if ( dialog.event == 'done' )
			break;
			
		if ( dialog.event == 'ngon' || dialog.event == 'Build' )
			Update( UI.ngon.integerValue, UI.Build.value, factories );
	}
			Commit( factories );
}

DoAntiPrism();
