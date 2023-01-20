//	DRAFT by Brian McMillin September 29, 2011
//	BoysSurface script
//  (Modified from PillowWeb Script, mod from Michaels LineWeb script and ToroidalHelix script, MoI program)
//	Discouvered by Werner Boy in 1901, see Wikipedia


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

function EvalBoy( tu, tv, zValue )
{
	var uValue;
	var vValue;
	// zValue scales _z.

	// vValue is the (v) rotational angle parameter, (0 to pi) , to generate one curve, uValue held constant.
	// uValue also ranges from (0 to pi).
	vValue = Math.PI * (tv);
	uValue = Math.PI * (tu);
	//The following is one (of several) of the parametric equations, from the internet.
	//In loose math syntax, big X = X(u,v) = cos(u) * sin(v).
	//						big Y = Y(u,v) = sin(u) * sin(v).
	//						big Z = Z(u,v) = cos(v).
	//						little _x = f(u,v).
	// 						little _y = g(u,v).
	// 						little _z = h(u,v).
	var X = Math.cos(uValue) * Math.sin(vValue);
	var Y = Math.sin(uValue) * Math.sin(vValue);
	var Z = Math.cos(vValue);
	// Define x, y, and z values.
	var _x = 0.5 * ((2 * X * X) - (Y * Y) - (Z * Z) + 2 * Y * Z * ((Y * Y) - (Z * Z)) + Z * X * ((X * X) - (Z * Z)) + X * Y * ((Y * Y) -(X * X)));
	var _y = (Math.sqrt(3) / 2) * ((Y * Y) - (Z * Z) + (Z * X * ((Z * Z) - (X * X)) + X * Y * ((Y * Y) - (X * X))));
	var _z = zValue * ((X + Y + Z) * ((X + Y + Z) * (X + Y + Z) * (X + Y + Z) + 4 * (Y - X) * (Z - Y) * (X - Z)));		
	return moi.vectorMath.createPoint( _x, _y, _z );
}

function Update( zValue, uDensity, numpoints, factories )
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
		
			var pt = EvalBoy( tu, tv, zValue );		
		
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

function DoBoysSurface()
{
	var vcurves = new Array();
	var factories = new Array();
	// factories is (simply) a regular javascript array which holds the output of several factory "calls" //Call Update() function (with a capital U).
	
	Update( moi.ui.commandUI.zValue.numericValue, moi.ui.commandUI.uDensity.integerValue, moi.ui.commandUI.numpoints.integerValue, factories );

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
			
		if ( dialog.event == 'zValue' || dialog.event == 'uDensity' || dialog.event == 'numpoints' )
			Update( moi.ui.commandUI.zValue.numericValue, moi.ui.commandUI.uDensity.integerValue, moi.ui.commandUI.numpoints.integerValue, factories );
	}
// Tells MoI: Do Not remove geometry during cleanup.	
			Commit( factories );
}

DoBoysSurface();
