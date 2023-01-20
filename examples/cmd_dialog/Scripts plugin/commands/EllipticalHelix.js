//EllipticalHelix script for MoI, by Brian McMillin, 8/15/2012
//Modified the canted helix script, based upon Michaels ToroidalHelix script.
function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function EvalEllipticalHelix( t, rx, ry, kz )
{
	var theta;

	theta = Math.PI * 2.0 * t;

	var x = rx * Math.cos( theta );
	var y = ry * Math.sin( theta );
	var z = kz * t ;
	
	return moi.vectorMath.createPoint( x, y, z );
}

function Update()
{
	var factory = moi.command.createFactory( 'interpcurve' );

	var rx = moi.ui.commandUI.rx.numericValue;
	var ry = moi.ui.commandUI.ry.numericValue;
	var kz = moi.ui.commandUI.kz.numericValue;
	var numcoils = moi.ui.commandUI.numcoils.integerValue ;
	var numpoints = moi.ui.commandUI.numpoints.integerValue ;
	
	for ( var j = 0; j < numcoils; ++j )
	{
		var coil_number = j;
			for ( var i = 0; i < numpoints; ++i )
		{
			var t = coil_number + i / (numpoints - 1);
		
			var pt = EvalEllipticalHelix( t, rx, ry, kz )		
		
			factory.createInput( 'point' );
			factory.setInput( factory.numInputs - 1, pt );
		}
	}
	factory.update();
	
	return factory;
}

function DoEllipticalHelix()
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
			
		if ( dlg.event == 'rx' || dlg.event == 'ry' || dlg.event == 'kz' || dlg.event == 'numcoils'|| dlg.event == 'numpoints' )
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

DoEllipticalHelix();
