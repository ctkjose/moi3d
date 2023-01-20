// Cloth simulation v.0.96 - Max Smirnov. 2014
// config: norepeat noautolaunch

#include "GetObjects.js"

function ClothSimulation()
{
	moi.ui.commandUI.objectpicker.allowBReps();
	moi.ui.commandUI.objectpicker.min = 1;
	
	if ( !GetObjects( moi.ui.commandUI.objectpicker ) ) { return }
	if ( (moi.ui.commandUI.objectpicker.objects.numSingleFaceBReps !== 1) || (moi.ui.commandUI.objectpicker.objects.item(0).getEdges().length) !==4 ) { moi.ui.alert("1 surface, 4 edges"); return; }

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SurfacePrompt' );
	moi.ui.showUI( 'NetSizeOptions' );
	moi.ui.endUIUpdate();
	
	moi.ui.commandUI.initMain();
	moi.ui.commandUI.updatePoints(1);
	do 
	{	moi.ui.commandDialog.waitForEvent();
		if ( moi.ui.commandDialog.event === 'cancel' ) { moi.geometryDatabase.removeObjects(moi.ui.commandUI.pointsGrid); return;}
	} while (moi.ui.commandDialog.event !== 'done');
	moi.ui.commandUI.updatePoints(0);
	moi.ui.commandUI.calcAveregeDistance();
	
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'NetSizeOptions' );
	moi.ui.showUI( 'AncorPrompt' );
	moi.ui.showUI( 'progressinfo' );
	moi.ui.endUIUpdate();
	
	moi.ui.commandUI.objectpicker.resetAllow();
	moi.ui.commandUI.objectpicker.allowPointObjects();
	moi.ui.commandUI.objectpicker.allowBReps();
	moi.ui.commandUI.objectpicker.min = 0;
	moi.ui.commandUI.surfacePt.hidden = true;
	GetObjects( moi.ui.commandUI.objectpicker );
	if ( moi.ui.commandUI.objectpicker.event !== 'done')
	{ 
		moi.geometryDatabase.removeObjects(moi.ui.commandUI.pointsGrid);
		moi.ui.commandUI.surfacePt.hidden = false;
		moi.ui.commandUI.surfacePt.selected  = true;
		return;
	}
	
	moi.ui.commandUI.loadObstacles();
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'AncorPrompt' );
	moi.ui.showUI( 'AnimOptions' );
	moi.ui.commandUI.progressinfo.innerHTML = 'Press Done to start';
	moi.ui.endUIUpdate();
	
	while ( 1 )
	{ 
		moi.ui.commandDialog.waitForEvent();
		e  = moi.ui.commandDialog.event; 
		if ( e === 'done' ) { break; }
		if ( e === 'cancel' )
		{ 
			moi.geometryDatabase.removeObjects(moi.ui.commandUI.pointsGrid);
			moi.ui.commandUI.surfacePt.hidden = false;
			moi.ui.commandUI.surfacePt.selected  = true;
			return;
		}
	}
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'DoneCancel' );
	moi.ui.showUI( 'PauseOK' );
	moi.ui.endUIUpdate();
	moi.ui.commandUI.preparePins();
	moi.ui.commandUI.initCloth();
	
	while ( moi.ui.commandUI.runAnimation ) { moi.ui.commandUI.calcFrame(); }
	
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'PauseOK' );
	moi.ui.hideUI( 'AnimOptions' );
	moi.ui.showUI( 'VideoPlayer' );
	moi.ui.showUI( 'DoneCancel' );
	moi.ui.endUIUpdate();
	moi.ui.commandUI.updateCurves(1);
	do
	{	moi.ui.commandDialog.waitForEvent();
		if ( moi.ui.commandDialog.event === 'cancel' ) { moi.geometryDatabase.removeObjects(moi.ui.commandUI.objList); break; }
	} while (moi.ui.commandDialog.event !== 'done');
	
	moi.ui.commandUI.updateCurves(0);
	moi.ui.commandUI.surfacePt.hidden = false;
	moi.ui.commandUI.surfacePt.selected  = true;
}

ClothSimulation();