
function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function EvalSineWave( t, amplitude, length, numcycles )
{
	var z = 0.0;
	var y = Math.sin( t * Math.PI * 2.0 * numcycles ) * amplitude;
	var x = t * length * numcycles;
		
	return moi.vectorMath.createPoint( x, y, z );
}

function Update()
{
	var factory = moi.command.createFactory( 'curve' );

	var amplitude = moi.ui.commandUI.amplitude.numericValue;
	var length = moi.ui.commandUI.len.numericValue;
	var numcycles = moi.ui.commandUI.numcycles.integerValue;
	var numpoints = moi.ui.commandUI.numpoints.integerValue * numcycles;
	
	for ( var i = 0; i < numpoints; ++i )
	{
		var t = i / (numpoints - 1);
		
		var pt = EvalSineWave( t, amplitude, length, numcycles );		
		
		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, pt );
	}
	
	factory.update();
	
	return factory;
}

function DoSineWave()
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
			
		if ( dlg.event == 'amplitude' || dlg.event == 'len' || dlg.event == 'numcycles' || dlg.event == 'numpoints' )
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

DoSineWave();
