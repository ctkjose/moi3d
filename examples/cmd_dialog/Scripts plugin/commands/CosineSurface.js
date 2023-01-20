//	DRAFT by Brian McMillin September 29, 2011
//	CosineSurface script
//  (Modified from PillowWeb Script, mod from Michaels LineWeb script and ToroidalHelix script, MoI program)

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

function EvalCosineSurface( tu, tv, aValue, bValue )
{
	var uValue;
	var vValue;
	// aValue and bValue change size of surface.
	// vValue is the (v) rotational angle parameter, (-pi to pi) , to generate one curve, uValue held constant.
	vValue = Math.PI * ((2.0 * tv) - 1.0);
	// vValue in range of (0 to pi), yields half of the curve.
//	vValue = Math.PI * (tv);
	uValue = Math.PI * (tu);
	// Define x, y, and z values.
	var x = Math.cos(uValue);
	var y = bValue * Math.cos(vValue) ;
	var z = aValue * Math.cos(uValue + vValue);		
	return moi.vectorMath.createPoint( x, y, z );
}

function Update( aValue, bValue, uDensity, numpoints, factories )
{
	Cancel( factories );
//	NOTE, factory declaration does NOT go here.  It goes 4 lines down.
	for (var j = 0; j < uDensity; ++j )
	{
	var factory = moi.command.createFactory( 'interpcurve' );
//	var factory = moi.command.createFactory( 'curve' );
	var tu = j / (uDensity - 1);

		for ( var i = 0; i < numpoints; ++i )
		{
			var tv = i / (numpoints - 1);
		
			var pt = EvalCosineSurface( tu, tv, aValue, bValue );		
		
			factory.createInput( 'point' );
			factory.setInput( factory.numInputs - 1, pt );
		}

		factories.push( factory );

		for ( var i = 0; i < factories.length; ++i )
		{
			factories[i].update();
		}
	}
	
}

function DoCosineSurface()
{
	var vcurves = new Array();
	var factories = new Array();
	// factories is (simply) a regular javascript array which holds the output of several factory "calls" //Call Update() function (with a capital U).
	
	Update( moi.ui.commandUI.aValue.numericValue, moi.ui.commandUI.bValue.numericValue, moi.ui.commandUI.uDensity.integerValue, moi.ui.commandUI.numpoints.integerValue, factories );

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
			
		if ( dialog.event == 'aValue' || dialog.event == 'bValue' || dialog.event == 'uDensity' || dialog.event == 'numpoints' )
			Update( moi.ui.commandUI.aValue.numericValue, moi.ui.commandUI.bValue.numericValue, moi.ui.commandUI.uDensity.integerValue, moi.ui.commandUI.numpoints.integerValue, factories );
	}
// Tells MoI: Do Not remove geometry during cleanup.	
			Commit( factories );


}

DoCosineSurface();
