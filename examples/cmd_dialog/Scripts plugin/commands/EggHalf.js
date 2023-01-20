//	DRAFT by Brian McMillin September 6, 2011
//	Egg Script (The parametric equations are those of Tadao Itou,)
//  (Modified from Michaels ToroidalHelix script, MoI program)

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function EvalEggHalf( t, aValue, bValue )
{
	var theta;
	var z = 0.0;

	// aValue and bValue are numbers which change the shape of the egg.
	// bValue = 0.78 * aValue gives the most egglike shape)
	// theta is the rotational angle parameter, (0 to pi) , to generate half of an egg profile.
	theta = Math.PI * t;

	// Define x and y values.
	var x = aValue * Math.cos( theta ) ;
	var y = bValue * Math.cos( theta/4 ) * Math.sin( theta );
			
	return moi.vectorMath.createPoint( x, y, z );
}

function Update()
{
	var factory = moi.command.createFactory( 'curve' );

	var aValue = moi.ui.commandUI.aValue.numericValue;
	var bValue = moi.ui.commandUI.bValue.numericValue;
	var numpoints = moi.ui.commandUI.numpoints.integerValue;	

	for ( var i = 0; i < numpoints; ++i )

	{
		var t = i / (numpoints - 1);
		
		var pt = EvalEggHalf( t, aValue, bValue );		
		
		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, pt );
	}
	
	factory.update();
	
	return factory;
}

function DoEggHalf()
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
			
		if ( dlg.event == 'aValue' || dlg.event == 'bValue' || dlg.event == 'numpoints' )
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

DoEggHalf();
