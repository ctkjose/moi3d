//	DRAFT by Brian McMillin September 7, 2011
//	Heart Script (The parametric equations are fromWolfram)
//  (Modified from Michaels ToroidalHelix script, MoI program)

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function EvalHeart5( t, aValue )
{
	var theta;
	var z = 0.0;

	// aValue is a number which changes size of heart.
	
	// theta is the rotational angle parameter, (-pi to pi) , to generate heart profile.
	theta = Math.PI * ((2 * t) - 1);

	// Define x and y values.
	var x = aValue * 16 * Math.sin( theta ) * Math.sin( theta ) * Math.sin( theta ) ;
	var y = aValue * (13 * Math.cos( theta ) - 5 * Math.cos( 2 * theta) - 2 * Math.cos( 3 * theta) - Math.cos( 4 * theta ));
			
	return moi.vectorMath.createPoint( x, y, z );
}

function Update()
{
	var factory = moi.command.createFactory( 'curve' );

	var aValue = moi.ui.commandUI.aValue.numericValue;
	
	var numpoints = moi.ui.commandUI.numpoints.integerValue;	

	for ( var i = 0; i < numpoints; ++i )

	{
		var t = i / (numpoints - 1);
		
		var pt = EvalHeart5( t, aValue );		
		
		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, pt );
	}
	
	factory.update();
	
	return factory;
}

function DoHeart5()
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
			
		if ( dlg.event == 'aValue' || dlg.event == 'numpoints' )
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

DoHeart5();
