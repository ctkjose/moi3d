// SubdivClassic v0.6 - Max Smirnov. 2015
function SubdivClassic()
{
	if ( !moi.ui.commandUI.init() ) return;
	while ( true )
	{
		moi.ui.commandDialog.waitForEvent();
		e  = moi.ui.commandDialog.event;
		if ( e == 'done' )	{moi.ui.commandUI.done();	return; }
		if ( e == 'cancel' )	{moi.ui.commandUI.cancel();	return; }
	}
}
SubdivClassic();