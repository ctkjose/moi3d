// Save instances v.1.0 - Max Smirnov (RUS) 2014
#include "WaitForDialogDone.js"
function processInstances()
{
	if ( moi.geometryDatabase.getSelectedObjects().getCurves().length === 0 ) return;
	if (!WaitForDialogDone()) return;
 	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'buttons' );
	moi.ui.showUI( 'progress' );
	moi.ui.endUIUpdate();
	var startTime = new Date(); /* засекаем время */
	moi.ui.commandUI.prepareToRun();
	
	var filename = moi.geometryDatabase.currentFileNameDir + moi.ui.commandUI.hfilename.value+'.csv';
	var clength = moi.ui.commandUI.clength;
	
	var units =[]; units['mm']=1;   units['cm']=10;   units['m']=1000;   units['km']=1000000;   units['in']=25.4;   units['ft']=304.8;   units['mi']=1609344;
	var unitsconvert = units[moi.geometryDatabase.unitsShortLabel]/units[moi.ui.commandUI.hunits.value];
		
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var file = moi.filesystem.openFileStream( filename, 'w' );
	var cstart=0, cend=0;
	var step = Math.floor(clength/20);
	if ( step < 2000 ) step = 2000;
	
	do
	{
		cend = (cend+step > clength)?clength:cend+step;
		moi.ui.commandUI.saveInstances(cstart, cend, file, unitsconvert);
		cstart = cend;
		moi.ui.commandUI.progressbar.value = Math.round(cstart/clength*100);
	} while (cend !== clength);

	/* гонг */
	moi.ui.commandUI.progressbar.value = 100;
	file.close();
	/*статистика */
	var fulltime =  (new Date() - startTime) / 1000;
	moi.ui.alert("Processed: "+ clength + " objects in "+fulltime+" seconds\rPerformance: "+Math.floor(clength/fulltime)+ " objects per second\r\rSaved to: "+filename);
	
	/* уф, наконец-то закончили */
}
processInstances();