
// We can't store a global variable between invocations within this script
// itself because this script instance is torn down after it executes. But
// we can store it on the HTML window object of one of the UI panels, in this
// case we'll just grab the command bar panel.

var commandbar = moi.ui.getUIPanel( 'moi://ui/CommandBar.htm' );

var IsFullScreen = false;

// If it is available on the command bar, grab it.
if ( commandbar.IsFullScreen != undefined )
	IsFullScreen = commandbar.IsFullScreen;

// Flip it and store it into the command bar's window object.
IsFullScreen = !IsFullScreen;
commandbar.IsFullScreen = IsFullScreen;


// Now go through each UI panel and hide or show it.

var UIPanels = moi.ui.getUIPanels();

for ( var i = 0; i < UIPanels.length; ++i )
{
	var panel = UIPanels.item(i);
	var body = panel.document.body;

	if ( panel.document.URL == 'moi://ui/BrowserPane.htm' )
	{
		if ( moi.ui.browserPosition == 'Inside' )
			continue;

		if ( !moi.ui.showBrowserPane )
			continue;		
	}
	else if ( panel.document.URL == 'moi://ui/ViewControls.htm' )
	{
		continue;
	}
			
	body.style.display = (IsFullScreen ? 'none' : 'block' );
}

// For some types of changes, the window has to be notified that it
// needs to re-layout the UI.
moi.ui.mainWindow.contentChanged();
