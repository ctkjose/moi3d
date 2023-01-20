function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}
//	alert ("to here 1");

function EvalPolyKnot3_1( t2, len, mir )
{
	var t = len * t2;	
	var x = t * (t-1) * (t+1);
	var y = t*t * (t-1.15) * (t + 1.15);
	var z = mir * (t*t - 1.056445 * 1.056445) * (t*t - 0.644893 * 0.644893) * t;

	return moi.vectorMath.createPoint( x, y, z );
}

function EvalPolyKnot4_1( t2, len, mir )
{
	var t = 2 * len * t2;	
	var x = t * (t-2) * (t+2);
	var y = t*t*t * (t-2.1) * (t + 2.1);
	var z = mir * (t*t - 2.176385 * 2.176385) * (t*t - 1.83588 * 1.83588) * (t*t - 0.8956385*0.8956385) * t;

	return moi.vectorMath.createPoint( x, y, z );
}

function Update()
{
	var factory = moi.command.createFactory( 'curve' );
	var numpoints = moi.ui.commandUI.numpoints.integerValue;
	var len = moi.ui.commandUI.len.numericValue;
	var knottype = moi.ui.commandUI.Build.value
	var mir = 1.0 ;//Change cheirality (left-handed vs right-handed)
	if ( moi.ui.commandUI.MirrorCheckbox.value )
	{
		mir = -1.0 ;
	}

	for ( var i = 0; i < numpoints; ++i )
	{
//		var t = i / (numpoints - 1);
//		Adjust the range of t2 from (0...1), to (-1...0...+1).
		var t2 = (i - (numpoints-1)/2) / (numpoints - 1)/2;

		if ( knottype == '3_1' )
		{
		var pt = EvalPolyKnot3_1( t2, len, mir );		
		}

		if ( knottype == '4_1' )
		{
		var pt = EvalPolyKnot4_1( t2, len, mir );
		}
/*		else if ( knottype == '5_1' )
		{
		var pt = EvalPolyKnot5_1( t2, len, mir );
		}
		else
		{
		var pt = EvalPolyKnot5_2( t2, len, mir );
		}
*/
		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, pt );
	}
	
	factory.update();
	
	return factory;
}

function DoPolynomialKnot()
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
			
		if ( dlg.event == 'len' || dlg.event == 'numpoints' || dlg.event == 'MirrorCheckbox' || dlg.event == 'Build' )
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

DoPolynomialKnot();
