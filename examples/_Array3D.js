// Array3D v.0.7 - Max Smirnov 2015
function Array3D()
{
	var objectpicker = moi.ui.createObjectPicker();
	while ( true )
	{
		if (!objectpicker.waitForEvent()) return; 
		if (objectpicker.done()) break;
	}
	var objects = objectpicker.objects;
	if ( objects.length === 0 ) return;
	moi.ui.commandUI.init(objects);
	moi.ui.beginUIUpdate();   moi.ui.hideUI( 'Prompt' );   moi.ui.showUI( 'Options' );   moi.ui.endUIUpdate();
	
	var pointpicker = moi.ui.createPointPicker();	
	while ( true )
	{
		if (!pointpicker.waitForEvent() ) { moi.ui.commandUI.cancel(); return; }
		var e  = pointpicker.event;
		if ( e == 'finished' )
		{	
			if ( pointpicker.controlDown ) { moi.ui.commandUI.setNewBaseframe(pointpicker.ptframe); }
				else { moi.ui.commandUI.setNewTargetframe(pointpicker.ptframe); }
			moi.ui.clearPickedPoints();
		}
		if ( e == 'done' ) {  moi.ui.commandUI.done();  return; }
		if ( e == 'cancel' ) { moi.ui.commandUI.cancel(); return; }
		if ( e == 'adaptiveScaling' || e == 'mirrorX' || e == 'mirrorY' || e == 'mirrorZ' ) {  moi.ui.commandUI.liC=0; }
	}
}
Array3D();