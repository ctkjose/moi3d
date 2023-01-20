#include "GetObjects.js"

function DoNudge()
{
	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowEditPoints();
	if ( !GetObjects( objectpicker, true ) )
		return;
		
	var objects = objectpicker.objects;
	if ( objects.length == 0 )
		return;
		
	var factory = moi.command.createFactory( 'move' );
	factory.setInput( 0, objects );
	
	var axis = 'x';
	var dist = 1.0;

	// Get the parameters that were included when this command was executed.
	var params = moi.command.getCommandLineParams();
	
	if ( params.search( /left/i ) != -1 )
	{
		// The parameters contain the word "left" in it.
		dist = -dist;
	}
	else if ( params.search( /zup/i ) != -1 )
	{
		// The parameters contain the word "zup" in it.
		axis = 'z';
	}
	else if ( params.search( /zdown/i ) != -1 )
	{
		// The parameters contain the word "zdown" in it.
		axis = 'z';
		dist = -dist;
	}
	else if ( params.search( /up/i ) != -1 )
	{
		// The parameters contain the word "up" in it.
		axis = 'y';
	}
	else if ( params.search( /down/i ) != -1 )
	{
		// The parameters contain the word "down" in it.
		axis = 'y';
		dist = -dist;
	}
	
	// We've got the direction set, now see if there were any parameters to modify the step size.
	
	if ( params.search( /large/i ) != -1 )
	{
		// The parameters contained the word "large" in it.
		dist *= 10.0;
	}
	else if ( params.search( /small/i ) != -1 )
	{
		// The parameters contained the word "small" in it.
		dist /= 10.0;
	}

	// Now we've got everything, we can perform the move.
	
	// Create 2 points, these will default to 0,0,0.
	var basept = moi.vectorMath.createPoint();
	var offsetpt = moi.vectorMath.createPoint();

	// Set up the offset point.
	offsetpt[axis] = dist;
	
	factory.setInput( 1, basept );
	factory.setInput( 2, offsetpt );
	factory.commit();
}

DoNudge();
