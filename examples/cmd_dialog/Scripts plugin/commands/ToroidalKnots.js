
function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function EvalToroidalKnots( t, radius1, radius2, p, numturns )
{
	var theta;

	// First an angle around the smaller radius.
	theta = Math.PI * 2.0 * numturns * t;
	var r = radius2 * Math.cos( theta );
	var z = radius2 * Math.sin( theta );

	// Move that over by the radius of the torus.
	r += radius1;

	// Now angle around the torus revolve axis. p times
	theta = Math.PI * 2.0 * p * t;
	var x = r * Math.cos( theta );
	var y = r * Math.sin( theta );
		
	return moi.vectorMath.createPoint( x, y, z );
}

function Update()
{
	var factory = moi.command.createFactory( 'curve' );

	var radius1 = moi.ui.commandUI.radius1.numericValue;
	var radius2 = moi.ui.commandUI.radius2.numericValue;
	var p = moi.ui.commandUI.p.integerValue;
	var numturns = moi.ui.commandUI.numturns.integerValue;
	var numpoints = moi.ui.commandUI.numpoints.integerValue * numturns;
	
	for ( var i = 0; i < numpoints; ++i )
	{
		var t = i / (numpoints - 1);
		
		var pt = EvalToroidalKnots( t, radius1, radius2, p, numturns );		
		
		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, pt );
	}
	
	factory.update();
	
	return factory;
}

function DoToroidalKnots()
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
			
		if ( dlg.event == 'radius1' || dlg.event == 'radius2' || dlg.event == 'p' || dlg.event == 'numturns' || dlg.event == 'numpoints' )
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

DoToroidalKnots();
