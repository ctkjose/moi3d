// DistortCurves v.1.0 - Max Smirnov, Michael Gibson. 2014
function DistortCurves()
{
	if ( !moi.ui.commandUI.init() ) { return; }
	while ( 1 )
	{
		moi.ui.commandDialog.waitForEvent();
		var e  = moi.ui.commandDialog.event;
		if ( e == 'cancel' ) { moi.ui.commandUI.done( false ); break; }
		if ( e == 'done' ) { moi.ui.commandUI.done( true ); break; }
		if ( e == 'distx' || e == 'disty' || e == 'distz' ) { moi.ui.commandUI.lastdistort = -1; }
		if ( e == 'rebuild' || e == 'rebuildnumpoints' ) { moi.ui.commandUI.initpoints(); }
	}
}
DistortCurves();