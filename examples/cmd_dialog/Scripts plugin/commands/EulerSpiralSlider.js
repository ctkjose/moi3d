//	EulerSpiralSliderBeta1.1 script.  This is a modification of previous Euler Spiral script, to 
//	incorporate a slider for the curvature parameter.
//	Getting the slider to work required a huge amount of Michaels input, more than just "assistance."
//	(See Slider topic on MoI forum.)
//	Other than the slider, The script does the same thing as the original.
//	(Slider uses an onvaluechange, which should be removable in future MoI releases.)  

//	DRAFT by Brian McMillin December 1, 2011
//	Euler's Spiral, also known as Cornu's Spiral, Fresnel Spiral, Clothoid. (And Spiros.)
//	This uses generalized formula.  Non-generalized formula uses sin(u*u) and cos(u*u). 
//  (Modified from Michaels ToroidalHelix script, MoI program)
//  Also see http://processingjs.nihongoresources.com/spiro/   (Mike Kamermans site)
//	Additional verbose notes attached.
//	This script is way over-commented, due to the very confusing mathematics. :)

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function Update()
{
	var factory = moi.command.createFactory( 'interpcurve' );
//	var factory = moi.command.createFactory( 'curve' );

//	aScale changes Scale of Spiral, for example aScale = 10.0.
//	tLength is the arc length of the spiral, for example tLength = 3.0.
//	nValue affects change (acceleration) of curvature for example nValue = 2 for non-generalized Euler's Spiral.
	var aScale = moi.ui.commandUI.aScale.numericValue;
	var tLength = moi.ui.commandUI.tLength.numericValue;
	var nValue = moi.ui.commandUI.nValue.numericValue;

	var z = 0.0;
	
//	number of integration intervals per one tLength, for example 100. (numpoints per one tLength = numintervals + 1)
	var numintervals = moi.ui.commandUI.numintervals.integerValue;	

//	There are two curves which must be integrated, to get the Fresnel values (Euler's curve values).
//	Initialize area under sin(u*u) curve and area under cos(u*u). 
	var sum_S = 0.0;
	var sum_C = 0.0;

//	Trapezoidal rule: Integral_a_to_b of f(x)dx ~= (b-a) * 0.5 * (f(a) + f(b)), (for one interval).
//	Composite Trapezoidal rule repeats for all intervals.
//	Initialize function_of_a, the left hand side of the intervals.
	var f_of_a_S = 0.0;
	var f_of_a_C = 0.0;

//  Width of trapezoid interval (b-a) for integration (area), for example 1/100.
	var width = 1 / (numintervals);

//	totalIntervals +1 is total number of points, for all (say 3) tLengths.  For example 301.	
//	totalIntervals is also the total number of trapezoidal area intervals, or steps.  (not counting the zero-ith one which has zero area.)
	var totalIntervals = tLength * numintervals;

//  For example, i = (0,1,2,...300).
//	The u_xRightSlice values are the x values of the points of the sin(u*u), and cos(u*u) curves.
//	The u_xRightSlice are also the fractional t lengths along Euler's spiral.
//	An extra area, (= zero), is calculated for u_xRightSlice = 0, because an Euler's curve point is needed at x = 0.
//  u_xRightSlice = (0, 1/100, 2/100, 3/100, ... 300/100).


//	Had to add a point at origin, with the next 3 lines, as the composite trapezoid numerical integration
//	formula below did not create a point at (0,0,0), which it should have.  Why point not created ???
	var pt = moi.vectorMath.createPoint( 0, 0, 0 );
	factory.createInput( 'point' );
	factory.setInput( factory.numInputs - 1, pt );

		for ( var i = 0; i <= totalIntervals; ++i )
	{
		var u_xRightSlice = i / numintervals;

		var f_of_b_S = Math.sin( Math.PI/nValue * Math.pow(u_xRightSlice,nValue));
		var f_of_b_C = Math.cos( Math.PI/nValue * Math.pow(u_xRightSlice,nValue));

		sum_S += width * 0.5 * (f_of_a_S + f_of_b_S);
		sum_C += width * 0.5 * (f_of_a_C + f_of_b_C);
	
		//	Save function_of_b as function_of_a, for next interval calculation.
		f_of_a_S = f_of_b_S;
		f_of_a_C = f_of_b_C;

// Rieman Sums (used during debugging.)
//		sum_S += width * Math.sin( Math.PI / 2 * Math.pow(u_xRightSlice,2));
//		sum_C += width * Math.cos( Math.PI / 2 * Math.pow(u_xRightSlice,2));		
		
		//	Scale Euler's curve.
		var x = aScale * sum_S;
		var y = aScale * sum_C;
		var z = 0.0;
//		z = u_xRightSlice; // This made a corkscrew effect during debugging.
		
		pt = moi.vectorMath.createPoint( x, y, z );	

		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, pt );

	}

//	Note, the next alert line was used in debugging.
//	alert("to here3")

	factory.update();	

//alert("to here4")	
	return factory;
}

function EulerSpiral()
{
	var factory = Update();

	var dlg = moi.ui.commandDialog;
	
	while ( 1 )
	{
		if ( !dlg.waitForEvent() )
		{
			factory.cancel();
			return false;
		}
			
		if ( dlg.event == 'done' )
			break;
			
		if ( dlg.event == 'aScale' || dlg.event == 'tLength' || dlg.event == 'nValue' || dlg.event == 'curve_slider' ||  dlg.event == 'numintervals' )
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

EulerSpiral();