// config: norepeat

#include "GetObjects.js"
#include "GetLine.js"

function NormalizeAngle( Angle )
{
	if ( Angle > 360.0 || Angle < -360.0 )
		Angle %= 360.0;
		
	if ( Angle < 0.0 )
		Angle += 360.0;
		
	return Angle;
}

function Update( factory, curves, points )
{
	factory.setInput( 4, moi.ui.commandUI.CapEnds.value );

	var StartAngle = moi.ui.commandUI.StartAngle.numericValue;
	var EndAngle = moi.ui.commandUI.EndAngle.numericValue;
	
	StartAngle = NormalizeAngle( StartAngle );
	EndAngle = NormalizeAngle( EndAngle );
	if ( EndAngle == 0.0 )
		EndAngle = 360.0;
	
	var Angle = ( StartAngle < EndAngle ? EndAngle - StartAngle : 360.0 - (StartAngle - EndAngle) );
	if ( Angle == 0.0 )
	{
		factory.cancel();
		return;
	}
	
	factory.setInput( 3, Angle );
	
	if ( StartAngle == 0.0 )
	{
		// Starting at angle 0, no rotation needed.
		factory.setInput( 0, curves );
		factory.update();
	}
	else
	{
		// Otherwise, rotate into starting place around axis.
		var rotater = moi.command.createFactory( 'rotateaxis' );
		
		rotater.setInput( 0, curves );
		rotater.setInput( 1, points[0] );
		rotater.setInput( 2, points[1] );
		rotater.setInput( 3, StartAngle );
		
		var rotatedcurves = rotater.calculate();
		
		// For v1 the inputs for revolve need to be added into the geometry database before
		// they can be used.
		moi.geometryDatabase.addObjects( rotatedcurves );
		
		factory.setInput( 0, rotatedcurves );
		factory.update();
		
		moi.geometryDatabase.removeObjects( rotatedcurves );
	}
}


function DoRevolve()
{
	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowCurves();
	
	if ( !GetObjects( objectpicker ) )
		return;
		
	var curves = objectpicker.objects;

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectionPrompt' );
	moi.ui.showUI( 'FirstLinePrompt' );
	moi.ui.endUIUpdate();
	
	var points = new Array();

	if ( !GetLine( points ) )
		return;

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SecondLinePrompt' );
	moi.ui.showUI( 'OptionsPrompt' );
	moi.ui.showUI( 'RevolveOptions' );
	moi.ui.endUIUpdate();


	var factory = moi.command.createFactory( 'revolve' );
		
	factory.disableUpdate( true );
		
	factory.setInput( 1, points[0] );
	factory.setInput( 2, points[1] );
	
	factory.disableUpdate( false );
	Update( factory, curves, points );
	
	var dlg = moi.ui.commandDialog;
	
	while ( 1 )
	{
		if ( !dlg.waitForEvent() )
			return false;
			
		if ( dlg.event == 'done' )
			break;
			
		if ( dlg.event == 'StartAngle' || dlg.event == 'EndAngle' || dlg.event == 'CapEnds' )
			Update( factory, curves, points );
	}
	
	factory.commit();
}

DoRevolve();
