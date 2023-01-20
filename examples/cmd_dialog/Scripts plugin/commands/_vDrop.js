// config: norepeat
// vDrop v.1.1 - Max Smirnov. 2014
function vDrop()
{
	moi.ui.commandUI.prepareToRun();
	var clength = moi.ui.commandUI.vcurves.length;
	if ( clength === 0 || moi.ui.commandUI.vbreps.length === 0 ) return;
	
	var cstart=0, cend=0;
	var step = Math.floor(clength/10);
	if ( step < 1000 ) step = 1000;
	do
	{
		cend = (cend+step > clength)?clength:cend+step;
		moi.ui.commandUI.dropCurves(cstart, cend);
		cstart = cend;
		moi.ui.commandUI.progressbar.value = Math.round(cstart/clength*100);
	} while (cend !== clength);
	moi.geometryDatabase.removeObjects(moi.ui.commandUI.vcurves);
}
vDrop();
