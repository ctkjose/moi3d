// Dimensions v1.0 - Max Smirnov, Mik. 2015

function Dimensions() 
{ 
	var hotkeys = ["1", "2", "3", "4", "5", "6"];
	for ( var i in hotkeys ) moi.command.registerCommandSpecificShortcutKey(hotkeys[i]);
	
	moi.ui.commandUI.init();
	moi.ui.commandUI.initStyle();
	var curves = moi.geometryDatabase.getSelectedObjects().getCurves(); 
	if ( curves.length > 0 ) 
	{
		curves.setProperty("selected", 0);
		moi.ui.commandUI.updateCurvedArrows( curves );
		while ( true )
		{
			moi.ui.commandDialog.waitForEvent();
			var e  = moi.ui.commandDialog.event;
			if ( e == 'cancel' ) { moi.ui.commandUI.cancel(); curves.setProperty("selected", 1); return; }
			if ( e == 'done' ) { moi.ui.commandUI.done(); curves.setProperty("selected", 1); return; }
			if ( e == 'scale' || e == 'scaleSlider' ) { moi.ui.commandUI.scaleValues(); moi.ui.commandUI.updateCurvedArrows( curves ); }
			if ( e == 'arrowType' || e == 'textSize' || e == 'arrowLength' || e == 'arrowWidth' || e == 'lineWidth' || e == 'units' || e == 'unitsFlag' ) moi.ui.commandUI.updateCurvedArrows( curves );		
			if ( hotkeys.indexOf(e) > -1 ) { moi.ui.commandUI.arrowType.selectedIndex = hotkeys.indexOf(e); moi.ui.commandUI.updateCurvedArrows( curves );	}
		}
	}
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'DoneCancelContainer' );
	moi.ui.showUI( 'CancelContainer' );
	moi.ui.endUIUpdate();
	
	var pointpicker = moi.ui.createPointPicker();
	while ( true )
	{
		if (!pointpicker.waitForEvent() ) { moi.ui.commandUI.cancel(); return; }
		var p  = pointpicker.event;
		if ( hotkeys.indexOf(p) > -1 ) moi.ui.commandUI.arrowType.selectedIndex = hotkeys.indexOf(p); 	
		if ( p == 'done' ) { moi.ui.commandUI.cancel(); return; }
		if ( p == 'scale' || p == 'scaleSlider' ) moi.ui.commandUI.scaleValues();
		if ( p == 'finished' ) if ( (moi.ui.commandUI.arrowType.selectedIndex == 5 || pointpicker.controlDown ) && !moi.ui.commandUI.centerFlag)
		{
			moi.ui.beginUIUpdate();
			moi.ui.hideUI('arrowType');
			moi.ui.commandUI.changeLabels();
			moi.ui.showUI('arrowType');
			moi.ui.endUIUpdate();
			moi.ui.commandUI.centerFlag = true;
			moi.ui.commandUI.centerViewport = moi.ui.getViewportUnderMouse();
			moi.ui.commandUI.centerFrame = pointpicker.orientedptframe;
			moi.ui.commandUI.center = {pt : moi.VectorMath.createPoint(pointpicker.pt.x, pointpicker.pt.y, pointpicker.pt.z)};
			pointpicker.bindFunc(moi.ui.commandUI.drawCircle);
			pointpicker.disableVerticalStraightSnap = true;
		} else break;
	}
	moi.ui.commandUI.from = {pt : moi.VectorMath.createPoint(pointpicker.pt.x, pointpicker.pt.y, pointpicker.pt.z)};
	if (moi.ui.commandUI.centerFlag) if ( moi.VectorMath.distance(moi.ui.commandUI.center.pt, moi.ui.commandUI.from.pt) < 0.01 ) { moi.ui.commandUI.centerFlag = false; }
	pointpicker.clearBindings();
	if (moi.ui.commandUI.centerFlag) pointpicker.restrictToPlane( pointpicker.ptframe, true );
	pointpicker.bindFunc(moi.ui.commandUI.updateArrow);
	while ( true )
	{
		if (!pointpicker.waitForEvent() ) break;
		var p  = pointpicker.event;
		if ( p == 'done' ) break;
		if ( p == 'finished' ) { moi.ui.commandUI.done(); return; }
		if ( p == 'cancel' ) break;
		if ( p == 'scale' || p == 'scaleSlider' ) moi.ui.commandUI.scaleValues();
		if ( hotkeys.indexOf(p) > -1 ) { moi.ui.commandUI.arrowType.selectedIndex = hotkeys.indexOf(p); moi.ui.commandUI.updateArrow(pointpicker) }; 	
	}
	moi.ui.commandUI.cancel();
}
Dimensions();