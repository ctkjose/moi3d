// Subdivision beta9  - Max Smirnov. 2015
function Subdivision() 
{ 
	var cancel = moi.command.getCommandLineParams();
	if ( cancel !=='') moi.command.registerCommandSpecificShortcutKey( cancel );
	if ( !moi.ui.commandUI.init() ) return;
	if ( moi.ui.commandUI.m.nakedCornersNum >0 ) { moi.ui.beginUIUpdate(); moi.ui.showUI( 'cornersCheckbox' ); moi.ui.endUIUpdate();} 
	while ( true )
	{
		moi.ui.commandDialog.waitForEvent();
		e  = moi.ui.commandDialog.event;
		if ( e == 'cancel' || e==cancel ) { moi.ui.commandUI.restoreState(); return 0; }
		if ( e == 'done' ) { moi.ui.commandUI.FinalizeSubdiv(); moi.ui.commandUI.joinSurfaces(); return 1; }
		if ( e == 'smooth' || e == 'smoothSlider'  || e == 'preserveCorners' ) { moi.ui.commandUI.lastalpha = -1; }
	}
}
Subdivision();