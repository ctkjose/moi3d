//	SuperShape3D MoI script (3D version) 
//	Supershapes by Paul Borke http://paulbourke.net/geometry/supershape
//	http://en.wikipedia.org/wiki/Superformula
//	DRAFT by Brian McMillin December 6, 2011
//  (Modified from Michaels LineWeb script and ToroidalHelix script, MoI program)

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

function EvalShape3D( a_1, b_1, tu, tv, n1_1, n2_1, n3_1, m_1, n1_2, n2_2, n3_2, m_2 )
{
	var uValue;
	var vValue;
//	Considering the 3D form to be created as a spherical shape, like the earth,
//  uValue = angle theta = longitude.   -PI <= uValue <= PI , horizontal east/west angle on the sphere.
//	vValue = angle phi = latitude.    -PI/2 <= vValue <= PI/2, (one trip from South pole, (-PI/2), to North pole, (Pi/2)).
//	For each fractional longitude uValue from -PI to PI. (360 degrees.), calculate the x,y,z points for one vertical latitude curve, 
//	for all the vValues(s) starting at the South pole, (-PI/2), and ending at the North pole, (PI/2).

	uValue = Math.PI * ((2.0 * tu) - 1.0); // commented out 360 degrees, switch to 180 degrees.
//	uValue(s) in the range of (0 to pi), yield half of the spherical shape, which may loft better.
//	uValue = Math.PI * (tu);

	//	vValue = Math.PI * (tv) - Math.PI/2 = Math.PI * (tv - 0.5);
	vValue = Math.PI * (tv - 0.5);

	var raux1
	var raux2
	var r1
	var r2
	raux1 = Math.pow(Math.abs(1/a_1*Math.abs(Math.cos(m_1*uValue/4))),n2_1) + Math.pow(Math.abs(1/a_1*Math.abs(Math.sin(m_1*uValue/4))),n3_1)
	r1 = Math.pow(Math.abs(raux1),(-1/n1_1))

	raux2 = Math.pow(Math.abs(1/b_1*Math.abs(Math.cos(m_2*vValue/4))),n2_2) + Math.pow(Math.abs(1/b_1*Math.abs(Math.sin(m_2*vValue/4))),n3_2)
	r2 = Math.pow(Math.abs(raux2),(-1/n1_2))	
	
	// Define x, y, and z values.
	var x = r1*Math.cos(uValue)*r2*Math.cos(vValue);
	var y = r1*Math.sin(uValue)*r2*Math.cos(vValue) ;
	var z = r2*Math.sin(vValue);		
	return moi.vectorMath.createPoint( x, y, z );
}

function Update( a_1, b_1, n1_1, n2_1, n3_1, m_1, n1_2, n2_2, n3_2, m_2, uDensity, numpoints, factories )
{
	Cancel( factories );
	for (var i = 0; i < uDensity; ++i )
	{
	var factory = moi.command.createFactory( 'interpcurve' );
//	var factory = moi.command.createFactory( 'curve' );
	var tu = i / (uDensity - 1);
		for ( var j = 0; j < numpoints; ++j )
		{
			var tv = j / (numpoints - 1);
		
			var pt = EvalShape3D( a_1, b_1, tu, tv, n1_1, n2_1, n3_1, m_1, n1_2, n2_2, n3_2, m_2);		
		
			factory.createInput( 'point' );
			factory.setInput( factory.numInputs - 1, pt );
		}
//	Save the current factory, (one curve).
		factories.push( factory );
//	The next line is a test addition, display the current factory, (one curve).  It works well...
		factory.update();
//	Each factory curve displayed remains on the screen, (for now), but factories must be updated and "commit"ed later on. 
	}
//	The next 4 lines are a test move, out of the above i and j loops.  Much better performance...
	for ( var k = 0; k < factories.length; ++k )
		{
			factories[k].update();
		}	
}

function DoSuperShape3D()
{
	var ucurves = new Array();
	var factories = new Array();
	// factories is (simply) a regular javascript array which holds the output of several factory "calls" //Call Update() function (with a capital U).
	
			Update( moi.ui.commandUI.a_1.numericValue, moi.ui.commandUI.b_1.numericValue, moi.ui.commandUI.n1_1.numericValue, moi.ui.commandUI.n2_1.numericValue, 
			moi.ui.commandUI.n3_1.numericValue, moi.ui.commandUI.m_1.numericValue, moi.ui.commandUI.n1_2.numericValue, moi.ui.commandUI.n2_2.numericValue,
			moi.ui.commandUI.n3_2.numericValue, moi.ui.commandUI.m_2.numericValue, moi.ui.commandUI.uDensity.integerValue, moi.ui.commandUI.numpoints.integerValue, factories );

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
			
		if ( dialog.event == 'a_1' || dialog.event == 'b_1' || dialog.event == 'n1_1' || dialog.event == 'n2_1' || dialog.event == 'n3_1' || dialog.event == 'm_1' 
			|| dialog.event == 'n1_2' || dialog.event == 'n2_2' || dialog.event == 'n3_2' || dialog.event == 'm_2' || dialog.event == 'uDensity' || dialog.event == 'numpoints' )
			Update( moi.ui.commandUI.a_1.numericValue, moi.ui.commandUI.b_1.numericValue, moi.ui.commandUI.n1_1.numericValue, moi.ui.commandUI.n2_1.numericValue, 
			moi.ui.commandUI.n3_1.numericValue, moi.ui.commandUI.m_1.numericValue, moi.ui.commandUI.n1_2.numericValue, moi.ui.commandUI.n2_2.numericValue,
			moi.ui.commandUI.n3_2.numericValue, moi.ui.commandUI.m_2.numericValue, moi.ui.commandUI.uDensity.integerValue, moi.ui.commandUI.numpoints.integerValue, factories );
	}
// Tells MoI: Do Not remove geometry during cleanup.	
			Commit( factories );
}

DoSuperShape3D();
