// config: norepeat

function DoAutoRotate()
{
	moi.ui.commandUI.Start();

	var dlg = moi.ui.commandDialog;
	
	while ( 1 )
	{
		if ( !dlg.waitForEvent() )
			return false;
			
		if ( dlg.event == 'quit' )
			break;
	}
}

DoAutoRotate();
