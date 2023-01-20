//  Rhodonea curve script.  These are a type of hypotrochoid.
//  Brian McMillin, December 2, 2011

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function EvalRhodonea( t, a_value, k_value, theta_multiple )
{
	var theta;
	var z = 0.0;

	// a_value   = scale factor.
	// k_value   = a shape parameter.
	// theta_multiple = the number of trips around the circle
	// theta is the rotational angle parameter, (0 to 2pi) , to generate 360 degree profile.
	theta = Math.PI * 2.0 * t * theta_multiple;

	// Define x and y values.
	// x = a_value * cos(t) * sin(k_value * t)
	// y = a_value * sin(t) * sin(k_value * t)

	var x = a_value * Math.cos( theta ) * Math.sin(k_value * theta );
	var y = a_value * Math.sin( theta ) * Math.sin(k_value * theta );
	
	return moi.vectorMath.createPoint( x, y, z );
}

function Update()
{
	var factory = moi.command.createFactory( 'interpcurve' );
//	var factory = moi.command.createFactory( 'curve' );

	var a_value = moi.ui.commandUI.a_value.numericValue;
	var k_value = moi.ui.commandUI.k_value.numericValue;
	var theta_multiple = moi.ui.commandUI.theta_multiple.integerValue;
	var numpoints = moi.ui.commandUI.numpoints.integerValue * theta_multiple;
	
	for ( var i = 0; i < numpoints; ++i )

	{
		var t = i / (numpoints - 1);
		
		var pt = EvalRhodonea( t, a_value, k_value, theta_multiple );	
		
		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, pt );
	}
	
	factory.update();
	
	return factory;
}

function DoRhodonea()
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
			
		if ( dlg.event == 'a_value' || dlg.event == 'k_value' || dlg.event == 'theta_multiple' || dlg.event == 'numpoints' )
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

DoRhodonea();
