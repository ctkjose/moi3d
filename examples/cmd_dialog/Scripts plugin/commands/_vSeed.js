// config: norepeat
// vSeed v.1.1 - Max Smirnov. 2014
#include "WaitForDialogDone.js"

function vSeed()
{
	moi.ui.commandUI.prepareToRun();
	if ( moi.ui.commandUI.vcurves.length === 0 ) return;
	if (!WaitForDialogDone()) return;
	
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'buttons' );
	moi.ui.showUI( 'progress' );
	moi.ui.endUIUpdate();
	moi.ui.commandUI.prepareVector();
	
	if ( moi.ui.commandUI.surfaces.length > 0 ) moi.ui.commandUI.vcurves.addObject(moi.ui.commandUI.surfaces.item(0));
	
	var cstart=0, cend=0;
	var clength = moi.ui.commandUI.vcurves.length;
	var step = Math.floor(clength/20);
	if ( step < 5 ) step = 5;
	do 
	{	cend = (cend+step > clength)?clength:cend+step;
		moi.ui.commandUI.seedVectors(cstart, cend);
		cstart = cend;
		moi.ui.commandUI.progressbar.value = Math.round(cstart/clength*100);
	} while (cend !== clength);
	
	moi.ui.commandUI.progressbar.value = 100;
}

vSeed();