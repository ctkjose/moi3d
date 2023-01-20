//	DRAFT by Brian McMillin October 10, 2011.
//	Two of the Fresnel Integrals are based upon the areas of sin(x*x) and cos(x*x) waves.
//	Produces sine and cosine waves for curvature = 1.
//	Curvature = 2 for standard C(x) and S(x).
//	Curvature > 2 produces weird shapes.
//	0 < curvature < 1.0 produces other trig shapes.
//	Negative curvature and negative length do not do anything.
//	Negative yScale and xScale produce mirrored curves.
//  Modified from EulerScript and Michaels MoI scripts, ToroidalHelix, LineWeb, and SineWave.

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function Update(buildtype)
{
	var factory = moi.command.createFactory( 'interpcurve' );
//	var factory = moi.command.createFactory( 'curve' );

//	tLength is the arc length, for example tLength = 3.0.

	var yScale = moi.ui.commandUI.yScale.numericValue;
	var xScale = moi.ui.commandUI.xScale.numericValue;
	var tLength = moi.ui.commandUI.tLength.numericValue;
	var nValue = moi.ui.commandUI.nValue.numericValue;
	
//	number of integration intervals per one tLength, for example 100. (numpoints per one tLength = numintervals + 1)
	var numintervals = moi.ui.commandUI.numintervals.integerValue;	

//	There are two curves which must be integrated, to get the Fresnel values.
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

	var totalIntervals = tLength * numintervals;

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

		if ( buildtype == 'C_Fresnel' )
		{
			//	Fresnel S(x), cosine based.
			var x = xScale * u_xRightSlice;
			var y = yScale * sum_C;
			var z = 0.0;
		}
		else
		{
			//	Fresnel S(x), sine based.
			var x = xScale * u_xRightSlice;
			var y = yScale * sum_S;
			var z = 0.0;
		}

		pt = moi.vectorMath.createPoint( x, y, z );	

		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, pt );
	}

	factory.update();	

	return factory;
}

function FresnelCurves()
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
			
		if ( dlg.event == 'Build' || dlg.event == 'yScale' || dlg.event == 'xScale' || dlg.event == 'tLength' || dlg.event == 'nValue' ||  dlg.event == 'numintervals' )
		{
			factory.cancel();
			factory = Update(moi.ui.commandUI.Build.value);
		}
	}
	
	factory.commit();
}

FresnelCurves();