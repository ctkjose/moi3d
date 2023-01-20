// config: norepeat noautolaunch
// subdSplit v0.95 - Max Smirnov. 2015

function subdSplit() 
{ 
	if ( !moi.ui.commandUI.init() ) return;
	if ( !moi.ui.commandUI.facemode ) { moi.ui.beginUIUpdate(); moi.ui.showUI( 'Mirror' ); moi.ui.endUIUpdate(); }
	var pointpicker = moi.ui.createPointPicker();
	pointpicker.restrictToObject(moi.ui.commandUI.edge);
	pointpicker.disableObjectSnap = true;
	pointpicker.bindFunc(moi.ui.commandUI.bindSlider);

	while ( true )
	{
		if (!pointpicker.waitForEvent() ) break;
		var p  = pointpicker.event;
		if ( p == 'finished' || p == 'done' ) { moi.ui.commandUI.done(); return; }
		if ( p == 'cancel' ) { moi.ui.commandUI.cancel(); return; }
		if ( p == 'parameter' || p == "mirrorFlag" ) { moi.ui.commandUI.lastparameter=0; moi.ui.commandUI.updategeometry() }
	}
	moi.ui.commandUI.cancel();
}
subdSplit();