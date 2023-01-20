#include "GetPoint.js"
#include "WaitForDialogDone.js"

function DoClothoid2pt()
{
	var ui = moi.ui;
	var vm = moi.vectorMath;   //abbreviation
	var pointpicker = ui.createPointPicker();
//	pointpicker.disableSnapToBasePt = true;
	
	if ( !GetPoint( pointpicker ) )
	return;

	var OtherPt = pointpicker.pt;	
	
	ui.beginUIUpdate();
	ui.hideUI( 'FirstPrompt' );
	ui.showUI( 'SecondPrompt' );
	ui.endUIUpdate();

//	Add 2 point selection behavior of GetCircle script.	
	pointpicker.restrictToPlaneThroughPt( pointpicker.pt, false );
	pointpicker.stickToSurfacesMode = 'max';
	pointpicker.disableVerticalStraightSnap = true;	
	
	if ( !GetPoint( pointpicker ) )
		return;
		
	var cplane = pointpicker.ptframe;
	var BasePt = pointpicker.pt;
	
//	Cannot have both points be picked in the 3d view, with the same world x,y values,
//	(with different z values.), or a nonfatal moi exception occurs.
	if ((BasePt.x == OtherPt.x) && (BasePt.y == OtherPt.y))
		return;
	
	ui.beginUIUpdate();
	ui.hideUI( 'SecondPrompt' );
	ui.showUI( 'ClothoidOptions' );
	ui.endUIUpdate();	

	var curvefactory = moi.ui.commandUI.Update(BasePt, OtherPt, cplane);
	var dlg = moi.ui.commandDialog;
	// Wait for any changes to the UI or cancel or done.	
	while ( 1 )
	{
		if ( !dlg.waitForEvent() )
		{
			curvefactory.cancel();
			return false;
		}
			
		if ( dlg.event == 'done' )
			break;
			
		if ( dlg.event == 'theta_start' || dlg.event == 'theta_end' || dlg.event == 'start_slider' || dlg.event == 'end_slider' || dlg.event == 'numintervals' )
		{
			curvefactory.cancel();
			curvefactory = moi.ui.commandUI.Update(BasePt, OtherPt, cplane);
		}
	}
	
	moi.ui.clearPickedPoints();	
	curvefactory.commit();
}

DoClothoid2pt();