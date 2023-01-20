// vSpray v.1.1 - Max Smirnov. 2014

function vSpray()
{
	if ( !moi.ui.commandUI.init() ) return;
	while ( 1 )
	{
		if ( !moi.ui.commandUI.pointstreampicker.waitForEvent() )	{  return; }		
		if ( moi.ui.commandUI.pointstreampicker.event == 'finished' ) { break;  }
	}
}

vSpray();
