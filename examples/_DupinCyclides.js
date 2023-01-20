//	DRAFT by Brian McMillin December 20, 2013
//	DupinCyclides is a script to be run in the MoI program.
//	Modified the UmbilicTorus script, which was modified from Michaels LineWeb
//	script and the ToroidalHelix script.

//	aValue corresponds to the major radius of a torus. (c = 0)
//	a <= c,           c*c = a*a + b*b.
//	cValue is the distance from the origin, to the center of the two sweep rail circles.
//	bValue is calculated.
//	muValue is the minor radius of a torus. (c = 0)
//	(muValue + cValue), and absvalue of (muValue - cValue), are the
//	radii of the two principal circles of the cyclide.
//	A ringed cyclide has c < mu <= a.
//	A spindle cyclide has mu > a.
//	A 1horn or 2horn cyclide has 0 < mu <= a.

//	Note that using sweep,(no boxes checked), with two circles as profiles in the xz plane,
//	and two circles as rails in the xy plane, will produce what looks like
//	a Duprin cyclide, without using this script.

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

	// theta (v) rotational angle parameter, (0 to 2pi), u held constant.
	// psi (u) is also a rotational angle parameter, (0 to 2pi).
	// For each value of u, one deltoid is created around a circle.
function EvalCyclide( tu, tv, aValue, bValue, cValue, muValue )
{
	var theta;
	var psi;
	theta = Math.PI * 2.0 * tu;
	psi = Math.PI * 2.0 * tv;
	var costheta = Math.cos(theta);
	var cospsi = Math.cos(psi);
	var sintheta = Math.sin(theta);
	var sinpsi = Math.sin(psi);
	var denom = aValue - cValue*costheta*cospsi;
		
	// Define x, y, and z values.
	var x = (muValue*(cValue-aValue*costheta*cospsi) + bValue*bValue*costheta) / denom;
	var y = (bValue*sintheta * (aValue-muValue*cospsi)) / denom;
	var z = (bValue*sinpsi * (cValue*costheta - muValue)) / denom; 	
	return moi.vectorMath.createPoint( x, y, z );
}

function EvalCyclide2( tu, tv, aValue, bValue, cValue, muValue )
{
	var theta;
	var psi;
	theta = Math.PI * 2.0 * tv;
	psi = Math.PI * 2.0 * tu;
	var costheta = Math.cos(theta);
	var cospsi = Math.cos(psi);
	var sintheta = Math.sin(theta);
	var sinpsi = Math.sin(psi);
	var denom = aValue - cValue*costheta*cospsi;
		
	// Define x, y, and z values.
	var x = (muValue*(cValue-aValue*costheta*cospsi) + bValue*bValue*costheta) / denom;
	var y = (bValue*sintheta * (aValue-muValue*cospsi)) / denom;
	var z = (bValue*sinpsi * (cValue*costheta - muValue)) / denom; 	
	return moi.vectorMath.createPoint( x, y, z );
}

function Update( aValue, cValue, muValue, uDensity, vDensity, numpoints, factories )
{
	Cancel( factories );
	aValue = Math.abs(aValue);
	if (cValue >= aValue)
		cValue = aValue - 0.1;
	var bValue = Math.sqrt(aValue*aValue-cValue*cValue)	
//	NOTE, factory declaration does NOT go here.  It goes 4 lines down.
	for (var j = 0; j < (uDensity - 1); ++j )
	{
	var factory = moi.command.createFactory( 'interpcurve' );
//	var factory = moi.command.createFactory( 'curve' );
	var tu = j / (uDensity - 1);

		for ( var i = 0; i < numpoints; ++i )
		{
			var tv = i / (numpoints - 1);
		
			var pt = EvalCyclide( tu, tv, aValue, bValue, cValue, muValue );		
		
			factory.createInput( 'point' );
			factory.setInput( factory.numInputs - 1, pt );
		}

		factories.push( factory );
//	The next line is a test addition, display the current factory, (one curve).  It works well...
		factory.update();
	}
	
//	Now plot the other circles. 	
	for (var j = 0; j < (vDensity - 1); ++j )
	{
	var factory = moi.command.createFactory( 'interpcurve' );
//	var factory = moi.command.createFactory( 'curve' );
	var tu = j / (vDensity - 1);

		for ( var i = 0; i < numpoints; ++i )
		{
			var tv = i / (numpoints - 1);
		
			var pt = EvalCyclide2( tu, tv, aValue, bValue, cValue, muValue );		
		
			factory.createInput( 'point' );
			factory.setInput( factory.numInputs - 1, pt );
		}

		factories.push( factory );
//	The next line is a test addition, display the current factory, (one curve).  It works well...
		factory.update();
	}	
	
		for ( var i = 0; i < factories.length; ++i )
		{
			factories[i].update();
		}	
}

function DoDupinCyclide()
{
	var vcurves = new Array();
	var factories = new Array();
	// factories is (simply) a regular javascript array which holds the output of several factory "calls" //Call Update() function (with a capital U).
	
	Update( moi.ui.commandUI.aValue.numericValue, moi.ui.commandUI.cValue.numericValue, moi.ui.commandUI.muValue.numericValue, moi.ui.commandUI.uDensity.integerValue, moi.ui.commandUI.vDensity.integerValue, moi.ui.commandUI.numpoints.integerValue, factories );

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
			
		if ( dialog.event == 'aValue' || dialog.event == 'cValue' || dialog.event == 'muValue' || dialog.event == 'uDensity' || dialog.event == 'vDensity' || dialog.event == 'numpoints' )
			Update( moi.ui.commandUI.aValue.numericValue, moi.ui.commandUI.cValue.numericValue, moi.ui.commandUI.muValue.numericValue, moi.ui.commandUI.uDensity.integerValue, moi.ui.commandUI.vDensity.integerValue, moi.ui.commandUI.numpoints.integerValue, factories );
	}
// Tells MoI: Do Not remove geometry during cleanup.	
			Commit( factories );
}

DoDupinCyclide();
