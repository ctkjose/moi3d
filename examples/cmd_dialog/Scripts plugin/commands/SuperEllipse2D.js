//	SuperEllipse script, MoI. 
//	Includes Squircle.
//	Brian McMillin January 1, 2013.

//	References:
//	http://paulbourke.net/geometry/superellipse/
//	http://mathworld.wolfram.com/Superellipse.html

function EvalSuperEllipse( t, xRadius, yRadius, rangeValue )
{
	phi = Math.PI * 2.0 * t ;
	
	var cphi = Math.cos( phi );
	csign = Sign( cphi );
	cphi = Math.abs(cphi);

	var sphi = Math.sin( phi );
	ssign = Sign( sphi );
	sphi = Math.abs(sphi);
	
//	Define x, y and z values.
	x = csign * xRadius * Math.pow(cphi, rangeValue);
	y = ssign * yRadius * Math.pow(sphi, rangeValue);		
	z = 0.0;
	return moi.vectorMath.createPoint( x, y, z );
}

function Sign( number )
{
	if ( number > 0)
	{
    return 1;
	} 
	else if (number < 0)
	{
    return -1;
  }
	else
	{
    return 0;
	}
}

function Update()
{
	var factory = moi.command.createFactory( 'curve' );
	var xRadius = moi.ui.commandUI.xRadius.numericValue;
	var yRadius = moi.ui.commandUI.yRadius.numericValue;
	var rangeValue = moi.ui.commandUI.rangeValue.numericValue;
	rangeValue = Math.abs(rangeValue);
	if (rangeValue == 0.0)
	{
	rangeValue = 0.01;
	}
	
	
	
	var numpoints = moi.ui.commandUI.numpoints.integerValue;	
	var phi
	
	for ( var i = 0; i <= numpoints; ++i )
	{
		var t = i / (numpoints);
		var pt = EvalSuperEllipse( t, xRadius, yRadius, rangeValue ); 
		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, pt );
	}

	
//	End point fails to equal start due to power/trig rounding (?) So:	
//	Set end point equal to start point.
	var t = 0;
	var pt = EvalSuperEllipse( t, xRadius, yRadius, rangeValue );
	factory.createInput( 'point' );
	factory.setInput( factory.numInputs - 1, pt );
	factory.update();

	return factory;
}

function SuperEllipse2D()
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
			
		if ( dlg.event == 'xRadius' || dlg.event == 'yRadius' || dlg.event == 'rangeValue' || dlg.event == 'numpoints' )
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

SuperEllipse2D();