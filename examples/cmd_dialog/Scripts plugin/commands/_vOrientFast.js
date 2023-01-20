// config: norepeat
// vOrient (fast) v.1.0 - Max Smirnov. 2014

function vOrientFast()
{
	moi.ui.commandUI.prepareToRun();
	var clength = moi.ui.commandUI.vcurves.length;
	if ( clength >0 && moi.ui.commandUI.vbreps.length > 0 )
	{
		var cstart=0, cend=0;
		var step = Math.floor(clength/20);
		if ( step < 2000 ) step = 2000;
		do
		{
			cend = (cend+step > clength)?clength:cend+step;
			moi.ui.commandUI.orientVectors(cstart, cend);
			cstart = cend;
			moi.ui.commandUI.progressbar.value = Math.round(cstart/clength*100);
		} while (cend !== clength);
		moi.geometryDatabase.removeObjects(moi.ui.commandUI.vcurves);
	}
}

vOrientFast();
