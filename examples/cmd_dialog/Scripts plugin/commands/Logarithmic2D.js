//	DRAFT by Brian McMillin September 24, 2011
//	LogarithmicSpiral2D script, also known as EquiAngular spiral, Bernoulli's Spiral, GoldenSpiral, Spira Mirabilis.
//  (Modified from Michaels ToroidalHelix script, MoI program)

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function EvalLogCurve( t, aValue, bValue, Coil_Number )
{
	var theta;
	var z = 0.0;

	// aValue changes Size of Spiral.
	// bValue needs to be small. It changes how fast the spiral opens up.
	// If bValue is too big, run out of numpoints before completing spiral...
	// Coil_Number determines number of "rotations"
	
	// theta is the rotational angle parameter, (0 to Coil_Number * 2 * pi) , to generate logarithmic spiral.
	theta = Math.PI * 2 * Coil_Number * t;

	// Define x and y values.
	var x = aValue * Math.cos(theta) * Math.exp(bValue * theta);
	var y = aValue * Math.sin(theta) * Math.exp(bValue * theta);

//	var expValue = bValue * theta;
//	var x = aValue * Math.cos(theta) * Math.pow(Math.E,expValue);
//	var y = aValue * Math.sin(theta) * Math.pow(Math.E,expValue);
	
	return moi.vectorMath.createPoint( x, y, z );
}

function Update()
{
	var factory = moi.command.createFactory( 'curve' );

	var aValue = moi.ui.commandUI.aValue.numericValue;
	
	var bValue = moi.ui.commandUI.bValue.numericValue;

	var Coil_Number = moi.ui.commandUI.Coil_Number.integerValue;

	var numpoints = moi.ui.commandUI.numpoints.integerValue;	

	for ( var i = 0; i < numpoints; ++i )

	{
		var t = i / (numpoints - 1);
		
		var pt = EvalLogCurve( t, aValue, bValue, Coil_Number );		
		
		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, pt );
	}
	
	factory.update();
	
	return factory;
}

function LogarithmicSpiral()
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
			
		if ( dlg.event == 'aValue' || dlg.event == 'bValue' || dlg.event == 'Coil_Number' ||  dlg.event == 'numpoints' )
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

LogarithmicSpiral();
