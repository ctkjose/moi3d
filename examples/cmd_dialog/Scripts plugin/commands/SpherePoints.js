//	First DRAFT by Brian McMillin June 7, 2012
//	SpherePoints script for MoI program.
//	This script creates N points on a sphere which are approximately evenly distributed,
//  using a golden section spiral.
//	The original Python implementation is here: http://www.softimageblog.com/archives/115

//  This is an unofficial script, modified from the Fibonacci script, which modified
//  Michaels ToroidalHelix, and LineWeb scripts.

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

function Update( factories )
{
	Cancel( factories );
	var vM = moi.vectorMath;
//	numpoints = number of points to plot.
	var numpoints = moi.ui.commandUI.numpoints.integerValue;
	var inc = Math.PI * (3.0 - Math.sqrt(5.0));
	var off = 2.0 / numpoints;

	for ( var i = 0; i < numpoints; ++i )
	{
		var y = (i * off) - 1.0 + (off / 2);
		var radius = Math.sqrt(1 - y*y);
		var phi = i * inc;
		var x = Math.cos(phi) * radius;
		var z = Math.sin(phi) * radius;
		var point = vM.createPoint( x, y, z );		
		var factory = moi.command.createFactory( 'point' );
		factory.setInput( 0, point );
		factories.push( factory );
	}

	for ( var i = 0; i < factories.length; ++i )
		{
			factories[i].update();
		}

	return factories;
}

function DoSpiral()
{

	var factories = new Array();
	// factories is (simply) a regular javascript array which holds the output of several factory "calls" //Call Update() function (with a capital U).
	
	Update( factories );

//
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
	
		if ( dialog.event == 'numpoints' )
		{
				Update( factories );
				// factories = Update();
		}
	}
// Tells MoI: Do Not remove geometry during cleanup.	
			Commit( factories );
}

DoSpiral();
