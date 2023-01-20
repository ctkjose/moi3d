// config: norepeat

#include "GetObjects.js"

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function CreateCircle( radius, offset )
{
	// Create a circle of the specified radius. Position it way off away from the origin
	// so that it will be away from the rail curves and auto-place mode for the sweep will
	// kick in.

	var circlefactory = moi.command.createFactory( 'circle' );
	
	var frame = moi.vectorMath.createFrame(
		moi.vectorMath.createPoint( -10000 + offset, -10000, -10000 ),
		moi.vectorMath.createPoint( 1, 0, 0 ),
		moi.vectorMath.createPoint( 0, 1, 0 ) );
	
	circlefactory.setInput( 0, true ); // Tell circle factory that number is a radius (not diameter).
	circlefactory.setInput( 1, frame );
	circlefactory.setInput( 3, radius );
	var objects = circlefactory.calculate();
	
	return objects.item(0);
}

function WrapWithObjectList( obj )
{
	// Create an object list and fill it with the given object. Some things require an object
	// list for input and can't handle a single object instead right now.
	
	var list = moi.geometryDatabase.createObjectList();
	list.addObject( obj );
	return list;
}

function BuildSweep( rail, radius, endradius )
{
	// Build a sweep tube around the given rail with the specified radius.

	// Create a sweep factory.
	var factory = moi.command.createFactory( 'sweep' );

	// Fill in the rail on the factory.
	factory.setInput( 1, WrapWithObjectList(rail) );
	
	// Also these options need to be set on the factory.
	factory.setInput( 5, 'freeform' ); // Twist option.
	factory.setInput( 7, true );       // Cap ends option.

	var profiles = moi.geometryDatabase.createObjectList();

	// Create a circle for the sweep profile curve.
	var circle = CreateCircle( radius, 0.0 );
	if ( !circle )
		return false;
		
	profiles.addObject( circle );
		
	if ( endradius > 0.0 )
	{
		// Making a tapered sweep, place an additional profile for it.
		var endcircle = CreateCircle( endradius, (radius + endradius) * 2 );
		if ( !endcircle )
			return false;
			
		profiles.addObject( endcircle );
	}
		
	// Add it to the factory.
	factory.setInput( 0, profiles );
	
	// The sweep can now be generated.
	templist = factory.calculate();
	if ( !templist || templist.length != 1 )
		return false;
	
	return templist.item(0);
}

function BuildPipe( rail, r1, r2, end_r1, end_r2 )
{
	// Build a pipe object around the given rail, using the specified radius values.
	// r2, end_r1, and end_r2 can optionally be 0 if you don't want a hollow pipe.

	if ( r1 <= 0.0 )
		return false;

	// Swap values if necessary, so that r2 is the smallest one.		
	if ( r2 > 0.0 && r2 > r1 )
	{
		var temp = r1;
		r1 = r2;
		r2 = temp;
	}
	
	if ( end_r2 != 0 && end_r2 > end_r1 )
	{
		var temp = end_r1;
		end_r1 = end_r2;
		end_r2 = temp;
	}

	// Build the outer sweep.
	var sweep1 = BuildSweep( rail, r1, end_r1 );
	if ( !sweep1 )
		return false;
		
	// Build the inner sweep if making a hollow pipe.
	var sweep2 = false;
	if ( r2 > 0.0 )
	{
		sweep2 = BuildSweep( rail, r2, end_r2 );
		if ( !sweep2 )
			return false;
	}
	
	// If we're only using an outer radius, then it is done.
	if ( sweep1 && !sweep2 )
		return sweep1;

	// If there is an outer and an inner radius, then we have 2 sweeps and we
	// want to boolean difference the inner one away from the outer one.
	
	var boolfactory = moi.command.createFactory( 'booleandifference' );
	boolfactory.setInput( 0, WrapWithObjectList(sweep1) );
	boolfactory.setInput( 1, WrapWithObjectList(sweep2) );
	
	var result = boolfactory.calculate();
	if ( !result || result.length != 1 )
		return false;
		
	return result.item(0);
}

function RemovePipes( pipes )
{
	// Remove the pipes from the geometry database.

	var gd = moi.geometryDatabase;
	
	for ( var i = 0; i < pipes.length; ++i )
	{
		if ( pipes[i] )
		{
			gd.removeObject( pipes[i] );
			pipes[i] = false;
		}
	}
}

function Update( pipes, rails, Tapered, OuterRadius1, InnerRadius1, OuterRadius2, InnerRadius2 )
{
	if ( !Tapered )
		OuterRadius2 = InnerRadius2 = 0.0;
		
	var gd = moi.geometryDatabase;

	RemovePipes( pipes );

	if ( OuterRadius1 <= 0.0 )
		return;
	
	for ( var i = 0; i < rails.length; ++i )
	{
		pipes[i] = BuildPipe( rails.item(i), OuterRadius1, InnerRadius1, OuterRadius2, InnerRadius2 );
		
		if ( pipes[i] )
			gd.addObject( pipes[i] );
	}
}

function GetValue( name )
{
	var val = 0.0;
	
	var input = moi.ui.commandUI[name];
	if ( input.value != '' )
	{
		try	{
			val = input.numericValue;
		} catch(e){}
	}
	
	return val;
}

function DoPipe()
{
	// First get the rails to be used.

	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowCurves();
	
	if ( !GetObjects( objectpicker ) )
		return;
		
	var rails = objectpicker.objects;
	
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectionPrompt' );
	moi.ui.showUI( 'OptionsPrompt' );
	moi.ui.showUI( 'PipeOptions' );
	moi.ui.endUIUpdate();
	
	var NeedUpdate = true;

	var Tapered = moi.ui.commandUI.Tapered.value;
	
	var OuterRadius1 = GetValue( 'OuterRadius1' );
	var InnerRadius1 = GetValue( 'InnerRadius1' );
	var OuterRadius2 = GetValue( 'OuterRadius2' );
	var InnerRadius2 = GetValue( 'InnerRadius2' );

	// Hold the current set of created pipes in an array.
	var pipes = new Array();
	for ( var i = 0; i < rails.length; ++i )
		pipes[i] = false;
	
	var dlg = moi.ui.commandDialog;
	
	while ( 1 )
	{
		if ( !dlg.waitForEvent() )
		{
			RemovePipes( pipes );
			return;
		}
			
		if ( dlg.event == 'done' )
			break;
		
		if ( dlg.event == 'OuterRadius1' )
		{
			OuterRadius1 = GetValue( dlg.event );
			NeedUpdate = true;
		}
		else if ( dlg.event == 'InnerRadius1' )
		{
			InnerRadius1 = GetValue( dlg.event );
			NeedUpdate = true;
		}
		else if ( dlg.event == 'OuterRadius2' )
		{
			OuterRadius2 = GetValue( dlg.event );
			NeedUpdate = true;
		}
		else if ( dlg.event == 'InnerRadius2' )
		{
			InnerRadius2 = GetValue( dlg.event );
			NeedUpdate = true;
		}
		else if ( dlg.event == 'Tapered' )
		{
			Tapered = moi.ui.commandUI.Tapered.value;
			NeedUpdate = true;
		}
		else if ( dlg.event == 'Update' )
		{
			Update( pipes, rails, Tapered, OuterRadius1, InnerRadius1, OuterRadius2, InnerRadius2 );
			NeedUpdate = false;
		}
	}
	
	if ( NeedUpdate )
		Update( pipes, rails, Tapered, OuterRadius1, InnerRadius1, OuterRadius2, InnerRadius2 );
}

DoPipe();
