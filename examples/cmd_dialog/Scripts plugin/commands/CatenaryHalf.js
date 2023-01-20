
function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function EvalCatenaryHalf( t, maxX, aParam )
{
	
	var theta;

	// Calculate Catenary from x = 0 to x = maxX.
	theta = maxX * t;
	
	// Catenary formula.
	var x = theta
	var y = aParam * (Math.exp(theta / aParam) + Math.exp(-theta / aParam)) / 2; 
	var z = 0.0
	
	return moi.vectorMath.createPoint( x, y, z );
}

function Update()
{
	var factory = moi.command.createFactory( 'curve' );

	var maxX = moi.ui.commandUI.maxX.numericValue;
	var aParam = moi.ui.commandUI.aParam.numericValue;

	var numpoints = moi.ui.commandUI.numpoints.integerValue * maxX;
	
	for ( var i = 0; i < numpoints; ++i )
	{
		var t = i / (numpoints - 1);
		
		var pt = EvalCatenaryHalf( t, maxX, aParam );		
		
		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, pt );
	}
	
	factory.update();
	
	return factory;
}

function DoCatenaryHalf()
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
			
		if ( dlg.event == 'maxX' || dlg.event == 'aParam' || dlg.event == 'numpoints' )
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

DoCatenaryHalf();
