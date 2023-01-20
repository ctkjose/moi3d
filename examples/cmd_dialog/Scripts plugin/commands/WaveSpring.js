//	November 21, 2012
//	WaveSpring script

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function EvalWaveSpring( t, radius, numwaves, height )
{
	// theta is the rotational angle parameter, (0 to 2pi) , to generate 360 degree profile.
	var theta;
	theta = Math.PI * 2.0 * t;
	// radius = radius of circle.
	// numwaves = number of sine waves.
	// height = z value.

	// Define x, y and z values.
	var x = radius * Math.cos( theta );
	var y = radius * Math.sin( theta );
	var z = height * Math.sin(numwaves * theta );	
		
	return moi.vectorMath.createPoint( x, y, z );
}

function Update()
{
	var factory = moi.command.createFactory( 'curve' );
 	var radius = moi.ui.commandUI.radius.numericValue;
	var numwaves = moi.ui.commandUI.numwaves.integerValue;
	var height = moi.ui.commandUI.height.numericValue;
	var numpoints = moi.ui.commandUI.numpoints.integerValue * numwaves;
	
	for ( var i = 0; i < numpoints; ++i )

	{
		var t = i / (numpoints - 1);
		
		var pt = EvalWaveSpring( t, radius, numwaves, height )		
		
		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, pt );
	}
	
	factory.update();
	
	return factory;
}

function DoWaveSpring()
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
			
		if ( dlg.event == 'radius' || dlg.event == 'numwaves' || dlg.event == 'height' || dlg.event == 'numpoints')
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

DoWaveSpring();
