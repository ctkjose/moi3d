// Radial pattern v.1.3 - Max Smirnov (RUS) 2015
// config: norepeat
#include "GetPoint.js"

function rPattern()
{
	var vp = moi.ui.getLastClickedViewport();
	var vpv = (vp)?vp.cplane:moi.VectorMath.createTopFrame();
	
	var pointpicker = moi.ui.createPointPicker();
	if ( !GetPoint( pointpicker ) ) return;
	moi.ui.commandUI.bplane = pointpicker.ptframe;

	moi.ui.commandUI.init(moi.geometryDatabase.getSelectedObjects(), vpv);
	
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'PickPrompt' );
	moi.ui.hideUI( 'CancelContainer' );
	moi.ui.showUI( 'OptionsPrompt' );
	moi.ui.showUI( 'PatternOptions' );
	moi.ui.showUI( 'DoneCancelContainer' );
	moi.ui.endUIUpdate();

	var dialog = moi.ui.commandDialog;

	while ( true )
	{
		moi.ui.commandDialog.waitForEvent();
		var e  = moi.ui.commandDialog.event;
		if ( e === 'cancel' ) { moi.geometryDatabase.removeObjects( moi.ui.commandUI.pattern ); return; }
		if ( e === 'done' ) { return }
		moi.ui.commandUI.lastCount=-1;
	}
}

rPattern();
