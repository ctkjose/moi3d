// subdScale v.0.6 - Max Smirnov. 2015
function subdScale()
{
	moi.geometryDatabase.getSelectedObjects().setProperty('selected', 0);
	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowEditPoints();
	while ( true )
	{
		if (!objectpicker.waitForEvent()) return; 
		if (objectpicker.done()) break;
	}
	
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'Prompt' );
	moi.ui.hideUI( 'DoneCancelContainer' );
	moi.ui.endUIUpdate();
	
	objectpicker.objects.lockSelection();
	var objects = objectpicker.objects;
	moi.geometryDatabase.copyToClipboardCommand( objects );
	moi.geometryDatabase.pasteFromClipboard();
	var points = moi.geometryDatabase.getSelectedObjects().getPoints();
	moi.geometryDatabase.removeObjects(points);	
	if (points.length < 2) return;
	var originpt = moi.VectorMath.createPoint( 0, 0, 0 );
	for ( var p = 0; p<points.length; p++) {	originpt.x += points.item(p).pt.x;	originpt.y += points.item(p).pt.y;	originpt.z += points.item(p).pt.z; }
									originpt.x /= points.length;		originpt.y /= points.length;		originpt.z /= points.length;

	var factory = moi.command.createFactory( 'scale' );
	factory.setInput( 0, objects );	
	factory.setInput( 1, originpt );

	var pointpicker = moi.ui.createPointPicker();
	factory.setInput( 3, points.item(0).pt );
	
	pointpicker.restrictToLinePtPt( originpt, points.item(0).pt, true );
	pointpicker.bindResultPt( factory.getInput(4) );
	pointpicker.setBasePt( originpt );
		
	while ( true )
	{
		if ( !pointpicker.waitForEvent() ) return;
		if ( pointpicker.event == 'finished' ) break;
	}

	factory.update();
	factory.commit();
}
subdScale();