//	November 21, 2012
//	TriangularSpring script

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function EvalTriangleSpring( t, radius, numturns, height )
{
	// theta is the rotational angle parameter, (0 to 2pi) , to generate 360 degree profile.
	var theta;
	theta = Math.PI * 2.0 * t;
	var a;
	var b;
	a = radius * Math.exp(Math.sin(theta * numturns));
	b = radius * Math.exp(Math.cos(theta * numturns));
	// radius = .
	// numturns = number of turns.
	// height = adjust stretch along z axis.

	// Define x, y and z values.
	var x = a + b;
	var y = a - b;
	var z = height * theta;	
		
	return moi.vectorMath.createPoint( x, y, z );
}

function Update()
{
	var factory = moi.command.createFactory( 'curve' );
 	var radius = moi.ui.commandUI.radius.numericValue;
	var numturns = moi.ui.commandUI.numturns.integerValue;
	var height = moi.ui.commandUI.height.numericValue;
	var numpoints = moi.ui.commandUI.numpoints.integerValue * numturns;
	
	for ( var i = 0; i < numpoints; ++i )

	{
		var t = i / (numpoints - 1);
		
		var pt = EvalTriangleSpring( t, radius, numturns, height )		
		
		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, pt );
	}
	
	factory.update();
	
	return factory;
}

function DoTriangleSpring()
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
			
		if ( dlg.event == 'radius' || dlg.event == 'numturns' || dlg.event == 'height' || dlg.event == 'numpoints')
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

DoTriangleSpring();
