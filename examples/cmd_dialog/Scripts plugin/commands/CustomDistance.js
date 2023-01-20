#include "GetPoint.js"
#include "WaitForDialogDone.js"

function DoDistance()
{
	var pointpicker = moi.ui.createPointPicker();
	pointpicker.disableSnapToBasePt = true;

	if ( !GetPoint( pointpicker ) )
		return;

	BasePt = pointpicker.pt;

	moi.ui.commandUI.g_BasePt = BasePt;
	pointpicker.bindFunc( moi.ui.commandUI.OnGetDistancePoint );

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'StartPrompt' );
	moi.ui.showUI( 'EndPrompt' );
	moi.ui.showUI( 'DistanceContainer' );
	moi.ui.endUIUpdate();

	var linefactory = moi.command.createFactory( 'line' );
	linefactory.setInput( 0, BasePt );

	pointpicker.bindBasePt( linefactory.getInput(0) );
	pointpicker.bindResultPt( linefactory.getInput(1) );

	if ( !GetPoint( pointpicker ) )
		return;

	var OtherPt = pointpicker.pt;
	var dist = moi.vectorMath.distance( BasePt, OtherPt );

	if ( dist > 0.0 )
	{
		var SetVal = moi.ui.commandUI.SetVal;
	
		SetVal( 'space', dist );
		SetVal( 'xdist', OtherPt.x - BasePt.x );
		SetVal( 'ydist', OtherPt.y - BasePt.y );
		SetVal( 'zdist', OtherPt.z - BasePt.z );

		moi.ui.beginUIUpdate();
		moi.ui.hideUI( 'EndPrompt' );
		moi.ui.hideUI( 'CancelContainer' );
		moi.ui.showUI( 'DoneContainer' );
		moi.ui.endUIUpdate();
	}else {
		return;
	}

	moi.ui.clearPickedPoints();
	linefactory.cancel();
	WaitForDialogDone();
}

DoDistance();
