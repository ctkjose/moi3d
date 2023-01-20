// config: norepeat

#include "GetObjects.js"
#include "GetPoint.js"

function DoCopyToPt()
{
	var objectpicker = moi.ui.createObjectPicker();
//	objectpicker.allowEditPoints();
	
	if ( !GetObjects( objectpicker ) )
		return;
		
	var objects = objectpicker.objects;

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectObjectsPrompt' );
	moi.ui.showUI( 'BasePointPrompt' );
	moi.ui.endUIUpdate();

	
	var pointpicker = moi.ui.createPointPicker();
	if ( !GetPoint( pointpicker ) )
		return;
		
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'BasePointPrompt' );
	moi.ui.showUI( 'TargetPointsPrompt' );
	moi.ui.showUI( 'DeleteOptions' );
	moi.ui.endUIUpdate();

	if ( !GetObjects( objectpicker ) )
		return;
		
	var points = objectpicker.objects.getPoints();

	for ( var i = 0; i < points.length; ++i )
	{
		var factory = moi.command.createFactory( 'copy' );
	
		factory.setInput( 0, objects );
		factory.setInput( 1, pointpicker.pt );
		factory.setInput( 2, points.item(i).pt );
		
		factory.commit();
	}

	// Remove the point objects.
	if ( moi.ui.commandUI.deletepts.value )
	{	
		moi.geometryDatabase.removeObjects( points );
	}

}

DoCopyToPt();
