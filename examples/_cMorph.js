// config: norepeat
// Morph between two curves v.1.1 - Max Smirnov. 2013
#include "GetObjects.js"

function DoMorph()
{
	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowCurves();
	objectpicker.min = 2;
	
	if ( !GetObjects( objectpicker ) ) { return }
	if ( objectpicker.objects.numCurves !== 2 ) { return }
	
	var curvesF = moi.command.createFactory( 'rebuildcurve' );
	curvesF.setInput( 0, objectpicker.objects );
	curvesF.setInput( 1, 'Refit' );
	curvesF.setInput( 2, 0.001 );
	var curves = curvesF.calculate();
	var closedCurves = curves.item(0).isClosed && curves.item(1).isClosed;
	
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectionPrompt' );
	moi.ui.showUI( 'MorphOptions' );
	moi.ui.endUIUpdate();
	
	var lastnum = 0;
	var commandDialog = moi.ui.commandDialog;
	var arrayF = moi.command.createFactory( 'arraydir' );
	var planeF =  closedCurves?moi.command.createFactory( 'extrude' ):moi.command.createFactory( 'plane3pts' );
	var lineF = closedCurves?moi.command.createFactory( 'circle3pt' ):moi.command.createFactory( 'line' );
	var flowF = moi.command.createFactory( 'flow' );
	var loftF = moi.command.createFactory( 'loft' );
	loftF.setInput( 0, curves );
	loftF.setInput( 2, 'Loose' );
	loftF.setInput( 3, false );
	loftF.setInput( 4, false );
	var lineV, arrayV, planeV, loftV = loftF.calculate();
	var sft = 10000;
	
	while ( 1 )
	{
		if (lastnum !== moi.ui.commandUI['curvesNum'].value)
		{
			if (closedCurves)
			{
				lineF.setInput( 0, moi.VectorMath.createPoint(sft, sft+1, sft));
				lineF.setInput( 1, moi.VectorMath.createPoint(sft, sft-1, sft));
				lineF.setInput( 2, moi.VectorMath.createPoint(sft, sft, sft+1));
				lineV = lineF.calculate();
				planeF.setInput( 0, lineV);
				planeF.setInput( 2, moi.ui.commandUI['curvesNum'].value+1 );
				planeF.setInput( 5, false );
			}
			else
			{
				lineF.setInput( 0, moi.VectorMath.createPoint(sft, sft, sft));
				lineF.setInput( 1, moi.VectorMath.createPoint(sft, sft+1, sft));
				lineV = lineF.calculate();
				planeF.setInput( 0, moi.VectorMath.createPoint(sft, sft, sft));
				planeF.setInput( 1, moi.VectorMath.createPoint( sft+moi.ui.commandUI['curvesNum'].value+1, sft, sft));
				planeF.setInput( 2, moi.VectorMath.createPoint(sft, sft+1, sft));
			}
			planeV = planeF.calculate();
			arrayF.setInput( 0, lineV);
			arrayF.setInput( 1, moi.ui.commandUI['curvesNum'].value+1);
			arrayF.setInput( 2, moi.VectorMath.createPoint(sft, sft, sft));
			arrayF.setInput( 3, moi.VectorMath.createPoint(sft+1, sft, sft));
			arrayF.setInput( 5, 'Offset, Count');
			arrayV = arrayF.calculate();
			
			lastnum = moi.ui.commandUI['curvesNum'].value;
			moi.GeometryDatabase.addObjects( arrayV );
			planeV.Item(0).hidden = true;
			loftV.Item(0).hidden = true;
			moi.GeometryDatabase.addObject( planeV.Item(0) );
			moi.GeometryDatabase.addObject( loftV.Item(0) );
			flowF.setInput( 0, arrayV );
			flowF.setInput( 1, planeV.Item(0) );
			flowF.setInput( 2, loftV.Item(0) );
			flowF.update();
			moi.GeometryDatabase.removeObjects( arrayV );
			moi.GeometryDatabase.removeObject( planeV.Item(0) );
			moi.GeometryDatabase.removeObject( loftV.Item(0) );
			lastnum = moi.ui.commandUI['curvesNum'].value;
		}
		
		if ( !commandDialog.waitForEvent() ) { return }
		if ( commandDialog.event === 'done' ) { break }
	}
		flowF.commit();
}

DoMorph();