//	First DRAFT by Brian McMillin November 19 - 24, 2011
//	FibonacciSeed1 script for MoI program.
//	This version is for planar point layout.
//	"Cylindrical" pineapple layout, as well as "conical" pinecone layout, are possible with different programming.
//  Nature often uses the most irrational number, phi, or Phi, in plants, and elsewhere.
//	For one excellent explaination of the Fibonacci Numbers and Golden section in nature, see:
//	http://www.maths.surrey.ac.uk/hosted-sites/R.Knott/Fibonacci/fibnat2.html
//	This script may aid in producing shower heads, pineapples, flowers, pinecones, sunflowers...
//  Modified from Michaels ToroidalHelix script, MoI program, with point help from Fern script.
//	Also used parts of the LineWeb script, but the point scripting was pretty hard for me to grasp.
//	So this FibonacciSeed1 script may be poorly written, or buggy, but is seems to work ok.
//	Note: placing ths factories[i].update() up one line, into the for loop, makes for slow and continual redraw of points, when zoom out;
//	Version 1.1, November 27, 2011, added a starting seed number, "numFirstSeed", for a "donut_hole".
//	Maximum number of points which javascript seems to handle is about 14,000, so for a huge flower,
//	Repeat script with numFirstSeed = prior "numpoints" + 1.
 //	Establish a geometric shape for a seed, and place at the points?

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
	var factory = moi.command.createFactory( 'point' );
//	var factory = moi.command.createFactory( 'interpcurve' );
//	var factory = moi.command.createFactory( 'curve' );

//	numpoints = total number of seeds to plot.
	var numpoints = moi.ui.commandUI.numpoints.integerValue;
//	numFirstSeed = first seed to plot. (Normally = 1, but higher number leaves a "donut_hole.")
	var numFirstSeed = moi.ui.commandUI.numFirstSeed.integerValue;
	
//	phi = (sqrt(5) - 1) / 2 = 0.61803398874989484820458683436564 approximately.
	var phi = (Math.sqrt(5) - 1) / 2
	
	for ( var i = 0; i < numpoints; ++i )
	{
		//	seedID = 1,2,3,...,numpoints (for numFirstSeed = 1).	
		var seedID = numFirstSeed + i ;

		//	radius of seed number seedID is sqrt(seedID).
		var radius = Math.sqrt( seedID );

		//	theta = angle of seed from x_axis = 2 * pi * seedID * phi.
		var theta = 2.0 * Math.PI * seedID * phi ;

		// Define x, y and z values.
		var x = radius * Math.cos( theta );
		var y = radius * Math.sin( theta );
		var z = 0;
		
		var point = moi.vectorMath.createPoint( x, y, z );		
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

function DoFibonacci()
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
	
		if ( dialog.event == 'numpoints' || dialog.event == 'numFirstSeed' )
		{
				Update( factories );
				// factories = Update();
		}
	}
// Tells MoI: Do Not remove geometry during cleanup.	
			Commit( factories );
}

DoFibonacci();
