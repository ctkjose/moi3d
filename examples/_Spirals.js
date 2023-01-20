// ArchimedeanSpirals by Brian McMillin September, 2014
// The family of Archimedean Spirals has the polar equation r = a * Theta(power(b)).
// The script avoids using b=1/n, to avoid division by 0 if n=0.
// b = the tightness of the Whorls.
// For Archimedes' spiral, b = 1.  Its inversion is the hyperbolic spiral, b=-1.
// For Fermat's spiral, b = 1/2.  Its inversion is the lituus, b=-1/2.
// Other values of b yield different curves.
// The minimum tightness is set to -1.0, because lower values hung up Moi.  If b < -1, b = -1 
// The maximum tightness is set to +3.0.
// Fermat's spiral is also known as the parabolic spiral.
// The hyperbolic spiral is also known as the reciprocal spiral.
// If b = 0, whorls of "circle(s)" forms. (On top of itself)
// The "circle" is not quite as perfect as a Moi Nurbs circle.
// UPDATE 9-13-2014: Max Smirnov made 3 major improvements.
// 1.  Corrected for possible divide by zero, for theta = 0.
// 2.  Greatly reduced the flickering of the two sliders.
// 3.  Clicking on one of the 4 spiral types, switches the spiral to that type.

#include "GetPoint.js"

function ArchimedeanSpirals()
{
	var pointpicker = moi.ui.createPointPicker();
	if ( !GetPoint( pointpicker ) )
	return;

	var centerPt = pointpicker.pt;

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectPrompt' );
	moi.ui.showUI( 'OptionsPrompt' );
	moi.ui.showUI( 'Options' );
	moi.ui.endUIUpdate();
	
	var factory = moi.ui.commandUI.Update(centerPt);

	var dlg = moi.ui.commandDialog;
	
	while ( 1 )
	{
		if ( !dlg.waitForEvent() )
		{
			factory.cancel();
			return false;
		}
			
		if ( dlg.event == 'done' )
			break;
			
		if ( dlg.event == 'scale' || dlg.event == 'Whorls' || dlg.event == 'numpoints' || dlg.event == 'tight' || dlg.event == 'tightslider' || dlg.event == 'startAngle' || dlg.event == 'angleslider' || dlg.event == 'clockwise' || dlg.event == 'spinit'  )
		{
			factory.cancel();
			factory = moi.ui.commandUI.Update(centerPt);
			moi.ui.commandUI.updating = false;
		}
	}
	factory.commit();
}

ArchimedeanSpirals();
