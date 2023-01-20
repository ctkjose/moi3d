// config: norepeat
// vClone v.0.9 - Max Smirnov. 2014
#include "GetObjects.js"
#include "GetOrientation.js"

function vClone()
{
	var objectpicker = moi.ui.createObjectPicker();
	if ( !GetObjects( objectpicker ) )	return;		
	moi.ui.commandUI.sobjects = objectpicker.objects;
	
	var AlignBaseToObjects = true;
	var AlignBaseFlipZ = true;
	try { AlignBaseToObjects = moi.command.getOption( 'AlignBaseToObjects' ); } catch(e) {}
	try { AlignBaseFlipZ = moi.command.getOption( 'AlignBaseFlipZ' ); } catch(e) {}
	moi.ui.commandUI.FlipAlignedZAxis.value = AlignBaseFlipZ;
	moi.ui.commandUI.OrientationPickerAlignToObjects.value = AlignBaseToObjects;
	
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectPrompt' );
	moi.ui.showUI( 'BasePrompt1' );
	moi.ui.showUI( 'OrientOptions' );
	moi.ui.endUIUpdate();

	var picker = moi.ui.createOrientationPicker();
	picker.noDefaultFrame = true;
	if ( !GetOrientation( picker, 'BasePrompt1', 'BasePrompt2' ) ) return;
		
	moi.ui.commandUI.baseframe = picker.frame;
	
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'BasePrompt1' );
	moi.ui.hideUI( 'BasePrompt2' );
	moi.ui.hideUI( 'OrientOptions' );
	moi.ui.showUI( 'VectorPrompt' );
	moi.ui.showUI( 'Checkbox1' );
	moi.ui.endUIUpdate();

	var vectorpicker = moi.ui.createObjectPicker();
	vectorpicker.allowCurves();
	if ( !GetObjects( vectorpicker ) )	return;
	moi.ui.commandUI.vcurves = vectorpicker.objects;

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'VectorPrompt' );
	moi.ui.hideUI( 'Checkbox1' );
	moi.ui.showUI( 'progress' );
	moi.ui.showUI( 'progressinfo' );
	moi.ui.endUIUpdate();
	
	var clength = moi.ui.commandUI.vcurves.length;
	if ( clength >0 )
	{
		var cstart=0, cend=0;
		var step = Math.floor(clength/10);
		if ( step < 2000 ) step = 2000;
		
		moi.ui.commandUI.progressinfo.innerHTML = "Processing ..";
		do
		{
			cend = (cend+step > clength)?clength:cend+step;
			moi.ui.commandUI.cloneObjects(cstart, cend);
			cstart = cend;
			moi.ui.commandUI.progressbar.value = Math.round(cstart/clength*100);
		} while (cend !== clength);
		
		moi.ui.commandUI.progressinfo.innerHTML = "almost done ...";
	}
}
vClone();
