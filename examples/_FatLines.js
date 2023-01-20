// FatLines v.0.6 Max Smirnov 2015
function FatLines()
{
	if ( !moi.ui.commandUI.init() ) return;
	while ( true )
	{
		moi.ui.commandDialog.waitForEvent();
		var e  = moi.ui.commandDialog.event;
		if ( e === 'cancel' ) { moi.ui.commandUI.cancel(); return; }
		if ( e === 'done' ) { moi.ui.commandUI.done(); return; }
		if ( e === 'lineType') moi.ui.commandUI.lastwidth = 0;
		moi.ui.commandUI.updategeometry();
	}
}
FatLines();