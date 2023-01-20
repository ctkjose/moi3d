/* 
 *	SpherePoints+  v.1.0.  Brian McMillin, Max Smirnov. 2014.
 *	The original Python implementation is here: http://www.softimageblog.com/archives/115
 *	This is an unofficial script, modified from the Fibonacci script, which modified
 *	Michaels ToroidalHelix, and LineWeb scripts.
 */
 
function DoSpherePoints()
{
	var dialog = moi.ui.commandDialog;
	var pointsList = moi.ui.commandUI.calcPoints(moi.ui.commandUI.numpoints.value, moi.ui.commandUI.radius.value);
	var linesList = moi.ui.commandUI.calcPoints(0);
	moi.geometryDatabase.addObjects(pointsList);
	
	while ( true )
	{
		if ( moi.ui.commandUI.LinesCheckbox.value) 
		{ 
			if (linesList.length !== pointsList.length) linesList = moi.ui.commandUI.getLines ( pointsList );
			moi.geometryDatabase.addObjects(linesList);
		}	
		dialog.waitForEvent();
		if ( dialog.event === 'done' ) break;
				
		if ( dialog.event === 'LinesCheckbox' ) moi.geometryDatabase.removeObjects(linesList);
		else if ( dialog.event === 'numpoints' || dialog.event === 'numpointsSlider' || dialog.event === 'radius' || dialog.event === 'radiusSlider' )
		{
			moi.geometryDatabase.removeObjects(pointsList); 
			moi.geometryDatabase.removeObjects(linesList); 
			pointsList = moi.ui.commandUI.calcPoints (moi.ui.commandUI.numpoints.value, moi.ui.commandUI.radius.value);
			if (dialog.event === 'radius' || dialog.event === 'radiusSlider' ) { linesList = moi.ui.commandUI.calcPoints(0); }
			moi.geometryDatabase.addObjects(pointsList);
		}
		else
		{
			moi.geometryDatabase.removeObjects(pointsList);
			moi.geometryDatabase.removeObjects(linesList);
			return;
		}
	}
}
DoSpherePoints();