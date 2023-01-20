// deCasteljau  v.1.0 - Max Smirnov. 2014
function deCasteljau() 
{ 
	if ( !moi.ui.commandUI.init() ) return;
	while ( true )
	{
		moi.ui.commandDialog.waitForEvent();
		e  = moi.ui.commandDialog.event;
		if ( e == 'cancel' ) { moi.ui.commandUI.cancel(); return; }
		if ( e == 'done' ) { moi.ui.commandUI.done(); return; }
		if ( e == 't' || e == 'tSlider' ) { }
	}
}
deCasteljau();