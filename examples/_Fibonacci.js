// _FibonacciFermat01 script by Brian McMillin, April 24, 2015.
// This script creates the Fibonacci Sunflower seed layout, and the
// Fermat spiral which passes through the seed points.
// Fast program style is based upon Hilbert script, as improved by Max Smirnov.
// The Fermat spiral curve works for several thousand seeds.
// For seed points only, 100,000 seeds worked.

function DoFiboFermat()
{
	// Show the initial result.
	moi.ui.commandUI.Update();

	// Wait for any changes to the UI or cancel or done.
	var dlg = moi.ui.commandDialog;	
	while ( 1 )
	{
		if ( !dlg.waitForEvent() )
		{
			moi.ui.commandUI.Cancel();
			return false;
		}
			
		if ( dlg.event == 'done' )
			break;
			
		if (  dlg.event == 'numSeeds' || dlg.event == 'numFirstSeed' || dlg.event == 'numpoints' || dlg.event == 'showFCurve' )
			moi.ui.commandUI.Update();
	}
}

DoFiboFermat();
