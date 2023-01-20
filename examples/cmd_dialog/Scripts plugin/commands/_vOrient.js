// config: norepeat
// vOrient v.1.0 - Max Smirnov. 2014
function vOrient()
{
	moi.ui.commandUI.prepareToRun();
	var clength = moi.ui.commandUI.vcurves.length;
	if ( clength >0 && moi.ui.commandUI.vbreps.length === 1 )
	{
		var cstart=0, cend=0;
		var step = Math.floor(clength/10);
		if ( step < 2000 ) step = 2000;
		
		moi.ui.commandUI.progressinfo.innerHTML = "Points";
		do
		{
			cend = (cend+step > clength)?clength:cend+step;
			moi.ui.commandUI.createPoints(cstart, cend);
			cstart = cend;
			moi.ui.commandUI.progressbar.value = Math.round(cstart/clength*100);
		} while (cend !== clength);
		
		cstart=0; cend=0; cnt=0; moi.ui.commandUI.progressbar.value = 0;
		moi.ui.commandUI.progressinfo.innerHTML = "Circles";
		do
		{
			cend = (cend+step > clength)?clength:cend+step;
			moi.ui.commandUI.createCircles(cstart, cend);
			cstart = cend;
			moi.ui.commandUI.progressbar.value = Math.round(cstart/clength*100);
		} while (cend !== clength);

		cstart=0; cend=0; cnt=0; moi.ui.commandUI.progressbar.value = 0;
		moi.ui.commandUI.progressinfo.innerHTML = "Vectors";
		do
		{
			cend = (cend+step > clength)?clength:cend+step;
			moi.ui.commandUI.rotateVectors(cstart, cend);
			cstart = cend;
			moi.ui.commandUI.progressbar.value = Math.round(cstart/clength*100);
		} while (cend !== clength);
		
		moi.ui.commandUI.progressinfo.innerHTML = "almost done ...";
		moi.geometryDatabase.removeObjects(moi.ui.commandUI.vpoints);
		moi.geometryDatabase.removeObjects(moi.ui.commandUI.vcircles);
		moi.geometryDatabase.removeObjects(moi.ui.commandUI.vcurves);
	}
}
vOrient();
