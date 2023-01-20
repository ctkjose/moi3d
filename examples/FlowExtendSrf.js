#include "GetObjects.js"

function CreatePlane( x, y, width, height )
{
	var frame = moi.vectorMath.createTopFrame();
	frame.origin = moi.vectorMath.createPoint( x, y, 0 );

	var factory = moi.command.createFactory( 'plane' );
	factory.setInput( 0, frame );
	factory.setInput( 2, width );
	factory.setInput( 3, height );
	
	var result_list = factory.calculate();
	factory.cancel();

	return result_list;
}

function Update( objects, factories )
{
	while ( factories.length != 0 )
		factories.pop().cancel();

	var base_plane = CreatePlane( 0, 0, 1, 1 ).item(0).getFaces().item(0);

	for ( var i = 0; i < objects.length; ++i )
	{
		var obj = objects.item(i);

		var umin = moi.ui.commandUI.umin.value;
		var umax = moi.ui.commandUI.umax.value;
		var vmin = moi.ui.commandUI.vmin.value;
		var vmax = moi.ui.commandUI.vmax.value;

		var extended_plane = CreatePlane( -umin, -vmin, 1 + umin + umax, 1 + vmin + vmax );

		var factory = moi.command.createFactory( 'flow' );
		factory.setInput( 0, extended_plane ); // objects to deform
		factory.setInput( 1, base_plane );     // base object
		factory.setInput( 2, obj );			   // target object
		factory.setInput( 3, false );           // delete inputs
		factory.setInput( 7, false );          // swap uv
		factory.setInput( 8, false );          // Flip U
		factory.setInput( 9, false );          // Flip V
		factory.setInput( 10, false );         // Flip normal
		factory.setInput( 11, false );         // Projective
		factory.setInput( 12, false );         // Straight for projective

		factory.update();
		factories.push( factory );
	}
}

function Commit( objects, factories )
{
	var deleteinputs = moi.ui.commandUI.deleteinputs.value;

	for ( var i = 0; i < factories.length; ++i )
	{
		factories[i].commit();
		var obj = objects.item(i);

		if ( deleteinputs && obj.getParentBRep().isSingleFaceBRep )
			moi.geometryDatabase.removeObject( obj.getParentBRep() );
	}
}

function DoFlowExtendSrf()
{
	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowFaces();
	objectpicker.autoFaceDrillDown = true;
	if ( !GetObjects( objectpicker ) )
		return;

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectObjectsPrompt' );
	moi.ui.showUI( 'OptionsPrompt' );
	moi.ui.showUI( 'Options' );
	moi.ui.endUIUpdate();

	var objects = objectpicker.objects;
	var factories = [];
	
	Update( objects, factories );


	var dlg = moi.ui.commandDialog;
	
	while ( 1 )
	{
		if ( !dlg.waitForEvent() )
			return false;
			
		if ( dlg.event == 'done' )
			break;

		if ( dlg.event == 'umin' || dlg.event == 'umax' || dlg.event == 'vmin' || dlg.event == 'vmax' )
			Update( objects, factories );
	}

	Commit( objects, factories );
}

DoFlowExtendSrf();
