#include "GetCircle.js"

var factory = moi.command.createFactory( 'circle' );

moi.ui.bindUIToInput( 'vertical', 'value', factory.getInput(4) );

if ( GetCircle( factory, true ) )
{
	if ( !factory.getInput(4).getValue() ) // if not vertical
	{
		// Rotate frame 90 degrees clockwise so the seam is located at the south point.	
		var frame = factory.getInput(1).getValue();
		frame.set(
			frame.origin.x, frame.origin.y, frame.origin.z,
			-frame.yaxis.x, -frame.yaxis.y, -frame.yaxis.z,
			frame.xaxis.x, frame.xaxis.y, frame.xaxis.z );
		
		factory.update();	
	}

	factory.commit();
}
