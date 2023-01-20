#include "WaitForDialogDone.js"
#include "GetPoint.js"

/*
  Lumber
  12/21/2022, Larry Fahnoe, fahnoe@FahnoeTech.com

  A quick source of standard dimensional lumber. Intended to reduce
  errors due to typing incorrect dimensions. Actual dimensions are
  supplied in both inches and millimeters, then scaled to model units.
  
  Based on MoI's Box command.
*/

const version = '0.1';

// A modified MoI GetBoxExtrusion() with length as a parameter. If
// length is 0, the box factory will use the picked point, otherwise
// the picked point provides the +/- extrusion direction.
function xGetBoxExtrusion( factory, extrusionstartinput, rectframe, length )
{
    if ( rectframe == null )
	return false;

    var ui = moi.ui;

    var pointpicker = ui.createPointPicker();
    pointpicker.bindResultPt( factory.getInput(extrusionstartinput+1) );
    pointpicker.bindFunc( ui.commandUI.OnExtrusionPoint );
    
    pointpicker.restrictToLinePtDir( factory.extrusionBasePt, rectframe.zaxis, true );

    ui.commandUI.g_BoxFactory = factory;
    
    factory.setupBoxSnaps( pointpicker );

    ui.beginUIUpdate();
    ui.hideUI( 'LastRectPrompt' );
    ui.hideUI( 'WidthHeight' );
    ui.showUI( 'ExtrusionPrompt' );
    ui.showUI( 'ExtrusionInput' );
    ui.endUIUpdate();

    while ( 1 )
    {
	if ( !pointpicker.waitForEvent() )
	    return false;

	if ( pointpicker.event == 'finished' )
	{
	    break;
	}
    }
        
    // The pointpicker stores the extrusion in moi:ExtrusionInput, use
    // it to get +/- direction. Box factory uses picked point if
    // length is 0.
    var pickedExtrusion = ui.commandUI.extrusion.value;
    if ( pickedExtrusion < 0)
        length = -length;
    factory.setInput( extrusionstartinput, length );
    factory.update();

    return true;
}

// A modified MoI GetRectSecondPoint() with width and height as
// parameters. The two picked points supply the position and
// horizontal/vertical orientation while the passed width and height
// supply the size.
function xGetRectSecondPoint( factory, pointpicker, width, height  )
{
    var ui = moi.ui;

    ui.beginUIUpdate();
    ui.hideUI( 'FirstRectPrompt' );
    ui.showUI( 'LastRectPrompt' );
    ui.showUI( 'WidthHeight' );
    ui.endUIUpdate();

    factory.setInput( 0, pointpicker.ptframe );

    pointpicker.restrictToPlaneThroughPt( pointpicker.pt, false );
    pointpicker.disableVerticalStraightSnap = true;
    pointpicker.disableStraightSnapAngle( 0 );
    pointpicker.disableStraightSnapAngle( 90 );
    pointpicker.disableStraightSnapAngle( 180 );
    pointpicker.disableStraightSnapAngle( 270 );
    pointpicker.disableStraightSnapAngle( 360 );
    
    pointpicker.bindResultPt( factory.getInput(1) );
    pointpicker.bindResultOrientation( factory.getInput(0) );
    pointpicker.bindFunc( ui.commandUI.OnPoint );

    ui.commandUI.g_BasePt = pointpicker.pt;

    while ( 1 )
    {
	if ( !pointpicker.waitForEvent() )
	    return false;
	
	if ( pointpicker.event == 'finished' || pointpicker.event == 'done' )
	{
	    break;
	}
    }
    
    // Use the picked points to establish position and horizontal /
    // vertical orientation but size is supplied by the supplied width
    // and height values.
    var pickedWidth = ui.commandUI.width.value;
    var pickedHeight = ui.commandUI.height.value;
    if ( pickedWidth == 0 || pickedHeight == 0)
        return false;
    if ( pickedWidth < 0)
        width = -width;
    if ( pickedHeight < 0)
        height = -height;
    if ( Math.abs( pickedWidth) < Math.abs( pickedHeight)) // vertical
    {
        factory.setInput( 2, width );
        factory.setInput( 3, height );
    }
    else // horizontal: swap width & height
    {
        if ( pickedWidth < 0 && pickedHeight > 0 ||
             pickedWidth > 0 && pickedHeight < 0)
        {
            factory.setInput( 2, -height );
            factory.setInput( 3, -width );
        }
        else
        {
            factory.setInput( 2, height );
            factory.setInput( 3, width );
        }
    }
    factory.update();
    
    return true;
}

// A modified MoI GetRect() with width and height as parameters.
function xGetRect( factory, width, height )
{
	var pointpicker = moi.ui.createPointPicker();

	if ( !GetPoint( pointpicker ) )
		return false;
		
    return xGetRectSecondPoint( factory, pointpicker, width, height );
}

if ( WaitForDialogDone() )
{
    // Depending on model units, use scaled US or metric actual dimensions
    var width;
    var height;
    if ( moi.geometryDatabase.units.slice( -5) == 'eters')
    {
        width = moi.ui.commandUI.dimensions.value.split( 'x')[ 2] *
            moi.geometryDatabase.getUnitConversionScaleFactor( 'Millimeters', moi.geometryDatabase.units);
        height = moi.ui.commandUI.dimensions.value.split( 'x')[ 3] *
            moi.geometryDatabase.getUnitConversionScaleFactor( 'Millimeters', moi.geometryDatabase.units);
    }
    else
    {
        width = moi.ui.commandUI.dimensions.value.split( 'x')[ 0] *
            moi.geometryDatabase.getUnitConversionScaleFactor( 'Inches', moi.geometryDatabase.units);
        height = moi.ui.commandUI.dimensions.value.split( 'x')[ 1] *
            moi.geometryDatabase.getUnitConversionScaleFactor( 'Inches', moi.geometryDatabase.units);
    }

    var length = moi.ui.commandUI.extrudeLength.value;

    moi.ui.beginUIUpdate();
    moi.ui.hideUI( 'DimensionPrompt' );
    moi.ui.hideUI( 'InputContainer' );
    moi.ui.showUI( 'FirstRectPrompt' );
    moi.ui.endUIUpdate();

    var factory = moi.command.createFactory( 'box' );

    if ( xGetRect( factory, width, height )
         && xGetBoxExtrusion( factory, 4, factory.rectFrame, length ) )
    {
        factory.commit();
    }
}
