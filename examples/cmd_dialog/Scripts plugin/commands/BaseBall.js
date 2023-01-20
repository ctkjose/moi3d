//	DRAFT by Brian McMillin September 26, 2011
//	BaseBall script, Parametric equations are from article Designing a Baseball Cover, by Richard B. Thompson.
//	http://www.geofhagopian.net/MAM/DesigningBaseballCover.pdf
//	The power of MoI enables one eighth of seam to suffice.
//  (Modified from Michaels ToroidalHelix script, MoI program)

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function EvalBallCurve( t, R, x_o, y_o, b_o )
{

//	t is a fraction ranging from 0 to numpoints-1.
//	_tx ranges from (-x_o to x_o).  ("t" in the source article)
	var _tx;
	_tx = x_o * ((2 * t) - 1);

//	h(x) is the quarter-circular shaped region.
//	There are an unlimited number of possible equations, but
//	this one is close to a regulation balls seam shape.	
	var _hx;
	_hx = (((y_o - b_o) / x_o) * _tx) + b_o ;
	var _h_neg_x;
	_h_neg_x = (((b_o - y_o) / x_o) * _tx) + b_o ;
	
//	_fx has two definitions, one for range (-x_o to < 0), second for range (0 to x_o). (f(x) in the source article)
	var _fx;

	if (_tx < 0.0)
	{
		_fx = Math.sqrt((R * R) - (_tx * _tx) - (_h_neg_x * _h_neg_x));
	}
	else
	{
		_fx = _hx;
	}
	
	// Define x, y, and z values.
	var x = _tx;
	var y = _fx;
	var z = Math.sqrt((R * R) - (_tx * _tx) - (_fx * _fx));

	return moi.vectorMath.createPoint( x, y, z );
}

function Update()
{
//	var factory = moi.command.createFactory( 'curve' );
	var factory = moi.command.createFactory( 'interpcurve' );

//	Circumference and Radius of Baseball, (sphere), in inches. (See wikipedia)
	var C = 9.125;
//	Radius = 1.45229 +/-
	var R = C / (2.0 * Math.PI);
//	b_o is the value of y, (or z), for a point on the seam, when x = 0.
	var b_o = R / (Math.sqrt(2));

//	Minimum Arc distance between seams.
	var S = 1.1875;	
//	Values for x_o and y_o at S endpoint. (simple trigonometry)
	var x_o = R * Math.cos(S / (2 * R));
	var y_o = R * Math.sin(S / (2 * R));
	
	var numpoints = moi.ui.commandUI.numpoints.integerValue;	

	for ( var i = 0; i < numpoints; ++i )
	{
		var t = i / (numpoints - 1);
		
		var pt = EvalBallCurve( t, R, x_o, y_o, b_o );		
		
		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, pt );
	}
	
	factory.update();
	
	return factory;
}

function BaseBall()
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
			
		if (  dlg.event == 'numpoints' )
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

BaseBall();
