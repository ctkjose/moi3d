//  BraidedBands script by Brian McMillin, 6/27/2015
//  These Knots are commonly known as "Turk's-Head knots"
//  Reference: http://www.mi.sanu.ac.rs/vismath/pennock1/index.html
//  http://www.mi.sanu.ac.rs/vismath/pennock/index.html

//  Equations are used for two types, Disk, and Cylindrical (Tubular), which may be manipulated into each other.
//  Definitions:
//  A Bight is a scallop or curve of the rope or cord, at the rim of the knot,
//  where the cord changes direction.  The count of the Bights can be made at
//  the top rim, or the bottom rim of a cylinder, or the outer or inner rim of a disk.
//  Bights is a column count, or a radial column count, and is >= 2.

//  A Lead is the number of revolutions the cord makes around the center of the disk or cylinder, for one Ply only.
//  The Lead is a ""row count.""  Leads is >= 2, for a knot, or no knot will occur, or an unknot.

//  The Ply count is the number of "parallel" strands of cord in the knot.

//  The GCD (Greatest Common Divisor)of (Bights, Leads) must be equal to 1, or multiple cords will be needed for the knot.

//  The mathematical knot is a closed curve, and can be a pattern for a physically braided knot.
//  The physically braided knot is one rope or cord, woven in "parallel" Ply's, with two ends.
 
// theta, an angle parameter, varies fractionally from 0 to 2*PI
// Note, angle varies from 0 to 2*PI*Leads, but the Leads in the denominator
// of Bights/Leads, cancels the * Leads, leaving theta.

// Cylindrical coordinates are converted to Cartesian coordinates.

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

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

// theta, an angle parameter, varies fractionally from 0 to 2*PI
function EvalTurkHeadTube(theta, qBights, pLeads, cordDiam, MidRadius, tubeHeight, tubeZStart, signChange)
{
	var r0 = MidRadius - signChange * cordDiam * Math.sin(qBights * (pLeads - 1) * theta);
	var theta2 = theta * pLeads;
	var z = tubeZStart + signChange * tubeHeight * Math.cos(qBights * theta);
	var x = r0 * Math.cos(theta2);
	var y = r0 * Math.sin(theta2);
	return moi.vectorMath.createPoint( x, y, z );
}

// theta, an angle parameter, varies fractionally from 0 to 2*PI
function EvalTurkHeadDisk(theta, qBights, pLeads, cordDiam, MidRadius, signChange)
{
	var r0 = MidRadius + signChange * Math.cos(qBights * theta)
	var theta2 = theta * pLeads;
	var z = signChange * cordDiam * Math.sin(qBights * (pLeads - 1) * theta);
	var x = r0 * Math.cos(theta2);
	var y = r0 * Math.sin(theta2);
	return moi.vectorMath.createPoint( x, y, z );	
}

function Update(qBights, pLeads, cordDiam, MidRadius, tubeHeight, tubeZStart, numpoints, disk, mirrorIt, factories)
{
	Cancel( factories );
	var factory = moi.command.createFactory( 'interpcurve' );
	var twoPI = Math.PI * 2.0;
	tubeHeight /= 2; //The cosine amplitude is HALF the tubeHeight.

	//Mirror curve by changing +/-
	var signChange = 1.0;
	if ( mirrorIt )
		signChange = -1.0;
	
	if ( disk )
	{
		for ( var i = 0; i < numpoints; ++i )
		{
			var t = i / (numpoints - 1 );
			var theta = twoPI * t;			
			var pt = EvalTurkHeadDisk(theta, qBights, pLeads, cordDiam, MidRadius, signChange);
			factory.createInput( 'point' );
			factory.setInput( factory.numInputs - 1, pt );
		}
		factories.push( factory );
	}	
	
	else
	{
		for ( var i = 0; i < numpoints; ++i )
		{
			var t = i / (numpoints - 1 );
			var theta = twoPI * t;			
			var pt = EvalTurkHeadTube(theta, qBights, pLeads, cordDiam, MidRadius, tubeHeight, tubeZStart, signChange);
			factory.createInput( 'point' );
			factory.setInput( factory.numInputs - 1, pt );
		}
		factories.push( factory );		
	}
	
	for ( var i = 0; i < factories.length; ++i )
		factories[i].update();
}

function DoBraidedBand()
{
	var factories = new Array();
	var UI = moi.ui.commandUI;

	Update( UI.qBights.integerValue, UI.pLeads.integerValue, UI.cordDiam.numericValue, UI.MidRadius.numericValue, UI.tubeHeight.numericValue, UI.tubeZStart.numericValue , UI.numpoints.integerValue, UI.DiskCheckbox.value, UI.MirrorItCheckbox.value, factories);

	// Wait for cancel or done.
	var dlg = moi.ui.commandDialog;

	while ( 1 )
	{
		if ( !dlg.waitForEvent() )
		{
			Cancel( factories );
			return false;
		}
			
		if ( dlg.event == 'done' )
			break;
			
		if ( dlg.event == 'qBights' || dlg.event == 'pLeads' || dlg.event == 'cordDiam' || dlg.event == 'tubeHeight' || dlg.event == 'MidRadius' || dlg.event == 'tubeZStart' || dlg.event == 'numpoints' || dlg.event == 'DiskCheckbox' || dlg.event == 'MirrorItCheckbox' )
		{
		Update( UI.qBights.integerValue, UI.pLeads.integerValue, UI.cordDiam.numericValue, UI.MidRadius.numericValue, UI.tubeHeight.numericValue, UI.tubeZStart.numericValue , UI.numpoints.integerValue, UI.DiskCheckbox.value, UI.MirrorItCheckbox.value, factories);
		}
	}
	
	Commit( factories );
}

DoBraidedBand();
