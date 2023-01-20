#include "GetObjects.js"
#include "GetPoint.js"



function OffsetCurves( objects )
{
	var factory = moi.command.createFactory( 'offset' );
	factory.setInput( 0, objects );

	UpdateOffsetCurveUI( factory );

	// Bind the curvecorner select to the factory's corner input.
	moi.ui.bindUIToInput( 'curvecorner', 'value', factory.getInput(3) );
	
	// Bind the trim checkbox to the factory's trim input.
	moi.ui.bindUIToInput( 'curvetrim', 'value', factory.getInput(4) );
	
	// Bind the Both sides checkbox.
	moi.ui.bindUIToInput( 'curvebothsides', 'value', factory.getInput(6) );

	// Bind the Cap ends checkbox.
	moi.ui.bindUIToInput( 'curvecapends', 'value', factory.getInput(7) );	
	

	// If we're starting out in bydistance mode, initialize to the last used distance.
	if ( moi.ui.commandUI.curveoffsetmode.value == 'bydistance' )
		InitByDistanceMode( factory );

	moi.ui.commandUI.g_Factory = factory;
	
	var pointpicker = moi.ui.createPointPicker();
	
	// If there is a common plane to all the curves being offset, track points on that plane.
	var commonplane = factory.getCurvePlane();
	if ( commonplane != null )
		pointpicker.restrictToPlane( commonplane, true );

	while ( 1 )
	{
		pointpicker.clearBindings();
		pointpicker.bindResultFrame( factory.getInput(2) );

		// For through point mode, call OnCurvePoint to update the distance in the UI.
		if ( moi.ui.commandUI.curveoffsetmode.value == 'throughpt' )
			pointpicker.bindFuncPostUpdate( moi.ui.commandUI.OnCurvePoint );	
	
		if ( !pointpicker.waitForEvent() )
			return;

		if ( pointpicker.event == 'finished' )
			break;
			
		if ( pointpicker.event == 'curvedistanceinput' )
		{
			// When anything is entered into the distance input, switch to by distance mode.
			moi.ui.commandUI.curveoffsetmode.value = 'bydistance';
			
			var dist = moi.ui.commandUI.curvedistanceinput.value;
			
			factory.setInput( 1, dist );
			factory.update();
			
			SetLastCurveOffsetDistance( dist );
			UpdateOffsetCurveUI( factory );
		}
		else if ( pointpicker.event == 'curveoffsetmode' )
		{
			// The mode is being switched.
			
			// If we're switching to through point mode, then clear the distance
			// that was set on the factory. If we're switching to by distance mode
			// then do the by distance initialization.
		
			if ( moi.ui.commandUI.curveoffsetmode.value == 'throughpt' )
				factory.clearInput(1);
			else
				InitByDistanceMode( factory );
			
			factory.update();
			UpdateOffsetCurveUI( factory );
		}
	}
	
	factory.commit();
}

function GetNumSteps()
{
	var numsteps = moi.ui.commandUI.numstepsinput.value;
	if ( numsteps < 1 )
		numsteps = 1;
		
	return numsteps;	
}

function GetStepDistance()
{
	return moi.ui.commandUI.curvedistanceinput.value;
}

function GetTrim()
{
	return moi.ui.commandUI.curvetrim.value;
}

function GetBothSides()
{
	return moi.ui.commandUI.curvebothsides.value;
}

function CreateFactories()
{
	var factories = new Array();
	var numsteps = GetNumSteps();
	for ( var i = 0; i < numsteps; ++i )
		factories[i] = moi.command.createFactory( 'offset' );
	
	return factories;
}

function UpdateFactory( factory, objects, dist, pt, trim, bothsides )
{
	factory.setInput( 0, objects );  // Objects to offset.
	factory.setInput( 1, dist );     // Offset distance.
	factory.setInput( 2, pt );       // Offset through point or which-side point for by distance mode.
	factory.setInput( 3, 'sharp' );  // Corner type 'sharp' or 'round'.
	factory.setInput( 4, trim );     // true = trim curve results.
	factory.setInput( 5, false );    // Unused for curves, for solids true = flip solid direction
	factory.setInput( 6, bothsides); // true = offset curves to both sides.
	factory.setInput( 7, false );    // true = cap ends - add line segment between ends of open curves.
	
	factory.update();
}

function UpdateFactories( factories, objects, pt )
{
	var stepdist = GetStepDistance();
	var trim = GetTrim();
	var bothsides = GetBothSides();

	for ( var i = 0; i < factories.length; ++i )
		UpdateFactory( factories[i], objects, stepdist * (i+1), pt, trim, bothsides );
}

function CancelFactories( factories )
{
	for ( var i = 0; i < factories.length; ++i )
		factories[i].cancel();
		
	factories.length = 0;
}

function CommitFactories( factories )
{
	for ( var i = 0; i < factories.length; ++i )
		factories[i].commit();
}

function DoOffsetMultiStep()
{
	// Stage 1 - get the objects to offset.

	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowCurves();
	if ( !GetObjects( objectpicker ) )
		return;
		
	var objects = objectpicker.objects;
	
	
	// Stage 2 - pick a point for which side to offset towards.
	
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectPrompt' );
	moi.ui.hideUI( 'done' );
	moi.ui.showUI( 'CurveSidePrompt' );
	moi.ui.endUIUpdate();
	
	var pointpicker = moi.ui.createPointPicker();
	if ( !GetPoint( pointpicker ) )
		return;
	
	
	// Stage 3 - show the Offset options prompt, and we'll respond to changes in the UI controls
	// until either Done or Cancel is picked.
		
	var pt = pointpicker.ptFrame;
		
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'CurveSidePrompt' );
	moi.ui.showUI( 'OptionsPrompt' );
	moi.ui.showUI( 'CurveOptions' );
	moi.ui.showUI( 'done' );
	moi.ui.endUIUpdate();

	var dlg = moi.ui.commandDialog;
	
	// Create one offset factory for each step.
	var factories = CreateFactories();
	
	// Update them with the starting values.
	UpdateFactories( factories, objects, pt );
	
	while ( 1 )
	{
		if ( !dlg.waitForEvent() )
			return false; // Canceled, bail out without any commit.
			
		if ( dlg.event == 'done' )
			break; // Done pushed, break out of event loop and finish up.

		// If distance, trim or bothsides is edited, update with the new values.
		if ( dlg.event == 'curvedistanceinput' || dlg.event == 'curvetrim' || dlg.event == 'curvebothsides' )
			UpdateFactories( factories, objects, pt );
			
		// If number of steps is edited, it alters the number of factories being used, since
		// there is one factory for each step, so cancel it all out and create a new
		// factory array.
		if ( dlg.event == 'numstepsinput' )
		{
			CancelFactories( factories );
			factories = CreateFactories();
			UpdateFactories( factories, objects, pt );		
		}
	}
	
	// If we get to here we want to keep the current generated results, so commit the factories.
	CommitFactories( factories );
}

DoOffsetMultiStep();
