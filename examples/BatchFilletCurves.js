#include "GetObjects.js"
#include "WaitForDialogDone.js"

function FilletCurveCorners( crv, radius )
{
	var crvlist = moi.geometryDatabase.createObjectList();
	crvlist.addObject( crv );

	var vertflags = moi.createList();
	var segs = crv.getSubObjects();
	for ( var i = 0; i < segs.length; ++i )
		vertflags.add( true );

	var factory = moi.command.createFactory( 'fillet' );
	factory.setInput( 0, crvlist );
	factory.setInput( 2, vertflags );
	factory.setInput( 3, radius );
	factory.setInput( 4, 'circular' );

	factory.update();
	factory.commit();
}

function DoFillet()
{
	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowCurves();
	
	if ( !GetObjects( objectpicker ) )
		return;
		
	var objects = objectpicker.objects;
	
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectPrompt' );
	moi.ui.showUI( 'RadiusPrompt' );
	moi.ui.showUI( 'FilletOptions' );
	moi.ui.endUIUpdate();

	if ( !WaitForDialogDone() )
		return;

	var radius = moi.ui.commandUI.radiusinput.value;

	for ( var i = 0; i < objects.length; ++i )
	{
		var crv = objects.item(i);
		FilletCurveCorners( crv, radius );
	}
}

DoFillet();
