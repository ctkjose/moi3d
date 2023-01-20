
#include "GetObjects.js"
#include "WaitForDialogDone.js"

function ScaleObject( obj, factor )
{
	var center = obj.getBoundingBox().center;
	var list = moi.geometryDatabase.createObjectList();
	list.addObject( obj );

	var factory = moi.command.createFactory( 'scale' );
	factory.setInput( 0, list );
	factory.setInput( 1, center );
	factory.setInput( 2, factor );
	factory.commit();
}

function DoIndividualScale()
{
	var objectpicker = moi.ui.createObjectPicker();
	if ( !GetObjects( objectpicker ) )
		return;
		
	var objects = objectpicker.objects;
		
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectPrompt' );
	moi.ui.showUI( 'OptionsPrompt' );
	moi.ui.showUI( 'options' );
	moi.ui.endUIUpdate();
	
	if ( !WaitForDialogDone() )
		return;
		
	var scalefactor = moi.ui.commandUI.factor.value;
		
	for ( var i = 0; i < objects.length; ++i )
	{
		var obj = objects.item(i);
		ScaleObject( obj, scalefactor );
	}
}

DoIndividualScale();
