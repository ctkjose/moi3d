// MultiIso+ v.1.0 - Max Smirnov, Michael Gibson. 2015
#include "GetObject.js"
function DoMultiIso()
{
	var objectpicker = moi.ui.createObjectPicker();
	
	objectpicker.allowEdgeCurves();
	if ( !GetObject(objectpicker)) return;		
	if ( !moi.ui.commandUI.setEdge(objectpicker.objects.item(0))) return;
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectPrompt' );
	moi.ui.showUI( 'OptionsPrompt' );
	moi.ui.showUI( 'Options' );
	moi.ui.endUIUpdate();
	
	moi.ui.commandUI.init();
	
	while ( true )
	{
		moi.ui.commandDialog.waitForEvent();
		e  = moi.ui.commandDialog.event;
		if ( e == 'cancel' ) { moi.ui.commandUI.cancel(); return; }
		if ( e == 'done' ) { moi.ui.commandUI.done(); return; }
		if ( e == 'isocount' || e == 'isocountSlider' || e == 'dir') {  moi.ui.commandUI.lastc =-1;}
	}
}

DoMultiIso();
