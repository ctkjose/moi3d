//	DRAFT March 31, 2011
//	Hypocycloid planet gear profile of cycloid drive

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function EvalHypocycloid( t, cylradius1, cylRadius2, numlobes, eccentricity )
{
	var psi;
	var theta;
	var z = 0.0;

	// cylradius1   = r = radius of one cylindrical roller.
	// cylRadius2   = R = radius to center of all cylindrical rollers.
	// numlobes     = number of lobes, (or cylindrical rollers, or teeth, or balls.)
	// numlobes - 1 = number of lobes of the epicycloid profile. (Not used here.)
	// numlobes + 1 = number of lobes of hypocycloid profile.
	// eccentricity = distance between centers of epicycloid gear and cylindrical ring, or else
	//				  distance between centers of cylindrical gear, and hypocycloid ring.
	// u = cylRadius2 / (eccentricity * numlobes)	  = Trochoid ratio.  Keep u > 1
	// deltaT	  = Tip clearance for manufacturing, or Equidistant offset profile.


	// theta is the rotational angle parameter, (0 to 2pi) , to generate 360 degree profile.
	theta = Math.PI * 2.0 * t;

	// psi is an angle calculated from surface meshing, or instant velocity center.
	psi  = Math.atan( ( Math.sin( ( numlobes + 1.0) * theta ) ) / ( cylRadius2 / ( eccentricity * numlobes ) - Math.cos( ( numlobes + 1.0 ) * theta )));

	// Define x and y values.
	var x = cylRadius2 * Math.cos( theta ) + cylradius1 * Math.cos( theta + psi ) + eccentricity * Math.cos( numlobes * theta ) ;
	var y = cylRadius2 * Math.sin( theta ) + cylradius1 * Math.sin( theta + psi ) - eccentricity * Math.sin( numlobes * theta );
	
		
	return moi.vectorMath.createPoint( x, y, z );
}

function Update()
{
	var factory = moi.command.createFactory( 'curve' );

	var cylradius1 = moi.ui.commandUI.cylradius1.numericValue;
	var cylRadius2 = moi.ui.commandUI.cylRadius2.numericValue;
	var numlobes   = moi.ui.commandUI.numlobes.integerValue;
	var eccentricity = moi.ui.commandUI.eccentricity.integerValue;
	var numpoints = moi.ui.commandUI.numpoints.integerValue * numlobes;
	
	for ( var i = 0; i < numpoints; ++i )

	{
		var t = i / (numpoints - 1);
		
		var pt = EvalHypocycloid( t, cylradius1, cylRadius2, numlobes, eccentricity  );		
		
		factory.createInput( 'point' );
		factory.setInput( factory.numInputs - 1, pt );
	}
	
	factory.update();
	
	return factory;
}

function DoHypocycloid()
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
			
		if ( dlg.event == 'cylradius1' || dlg.event == 'cylRadius2' || dlg.event == 'numlobes' || dlg.event == 'numpoints' )
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

DoHypocycloid();
