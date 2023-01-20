
function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

/*
function EvalToroidalHelix( t, radius1, radius2, numturns )
{
	var theta;

	// First an angle around the smaller radius.
	theta = Math.PI * 2.0 * numturns * t;
	var r = radius2 * Math.cos( theta );
	var z = radius2 * Math.sin( theta );

	// Move that over by the radius of the torus.
	r += radius1;

	// Now angle around the torus revolve axis.
	theta = Math.PI * 2.0 * t;
	var x = r * Math.cos( theta );
	var y = r * Math.sin( theta );
		
	return moi.vectorMath.createPoint( x, y, z );
}
*/

function Update()
{
	// Get input values
	var linkLength = moi.ui.commandUI.linkLength.numericValue;
	var linkHeight = moi.ui.commandUI.linkHeight.numericValue;
	var cornerRadius = moi.ui.commandUI.cornerRadius.numericValue;
	var profileRadius = moi.ui.commandUI.profileRadius.numericValue;
	var numLinks = moi.ui.commandUI.numLinks.integerValue;
	var recLength = linkLength - 2.0 * profileRadius;
	var recHeight = linkHeight - 2.0 * profileRadius;
	var z = 0.0;
	var cornerPt = moi.vectorMath.createPoint( recLength,recHeight,z );

// Make centerline of link
	var factory = moi.command.createFactory( 'rectangle' );	
	factory.setInput( 0, moi.vectorMath.createTopFrame() );	
	factory.setInput( 1, cornerPt );
	factory.setInput( 2, recLength );
	factory.setInput( 3, recHeight );
	factory.setInput( 4, true);
//	factory.setInput( 5,   ???   );
	factory.setInput( 6, cornerRadius );	
	factory.update();	

	return factory;
}

function DoChainLink()
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
			
		if ( dlg.event == 'linkLength' || dlg.event == 'linkHeight' || dlg.event == 'cornerRadius' || dlg.event == 'profileRadius' || dlg.event == 'numlinks' )
		{
			factory.cancel();
			factory = Update();
		}
	}
	
	factory.commit();
}

DoChainLink();
