
#include "GetObjects.js"

function Lerp( low, high, t )
{
	return low + (high-low)*t;
}

function RandLerp( low, high )
{
	return Lerp( low, high, Math.random() );
}

function MoveObject( obj, move_dist, move_x, move_y, move_z )
{
	var dx = !move_x ? 0.0 : RandLerp( -move_dist, move_dist );
	var dy = !move_y ? 0.0 : RandLerp( -move_dist, move_dist );
	var dz = !move_z ? 0.0 : RandLerp( -move_dist, move_dist );

	var origin = moi.vectorMath.createPoint( 0.0, 0.0, 0.0 );
	var delta = moi.vectorMath.createPoint( dx, dy, dz );

	var list = moi.geometryDatabase.createObjectList();
	list.addObject( obj );

	var factory = moi.command.createFactory( 'move' );
	factory.setInput( 0, list );
	factory.setInput( 1, origin );
	factory.setInput( 2, delta );
	var objs = factory.calculate();

	var newobj = objs.item(0);
	moi.geometryDatabase.addObject( newobj );
	moi.geometryDatabase.removeObject( obj );

	return newobj;
}

function MoveObjects( objects, move_dist, move_x, move_y, move_z )
{
	var list = moi.geometryDatabase.createObjectList();
	
	for ( var i = 0; i < objects.length; ++i )
	{
		var obj = objects.item(i);
		obj = MoveObject( obj, move_dist, move_x, move_y, move_z );
		list.addObject( obj );
	}

	return list;
}

function RotateWithFrame( obj, rotate_angle, frame, center )
{
	var angle = RandLerp( -rotate_angle, rotate_angle );
	frame.origin = center;

	var list = moi.geometryDatabase.createObjectList();
	list.addObject( obj );

	var factory = moi.command.createFactory( 'rotate' );
	factory.setInput( 0, list );
	factory.setInput( 1, frame );
	factory.setInput( 2, angle );
	var objs = factory.calculate();

	var newobj = objs.item(0);
	moi.geometryDatabase.addObject( newobj );
	moi.geometryDatabase.removeObject( obj );

	return newobj;
}

function RotateObject( obj, rotate_angle, rotate_x, rotate_y, rotate_z )
{
	var center = obj.getBoundingBox().center;

	if ( rotate_x )
		obj = RotateWithFrame( obj, rotate_angle, moi.vectorMath.createRightFrame(), center );

	if ( rotate_y )
		obj = RotateWithFrame( obj, rotate_angle, moi.vectorMath.createFrontFrame(), center );

	if ( rotate_z )
		obj = RotateWithFrame( obj, rotate_angle, moi.vectorMath.createTopFrame(), center );

	return obj;
}

function RotateObjects( objects, rotate_angle, rotate_x, rotate_y, rotate_z )
{
	var list = moi.geometryDatabase.createObjectList();
	
	for ( var i = 0; i < objects.length; ++i )
	{
		var obj = objects.item(i);
		obj = RotateObject( obj, rotate_angle, rotate_x, rotate_y, rotate_z )
		list.addObject( obj );
	}

	return list;
}

function ScaleObject( obj, scale_min, scale_max, scale_x, scale_y, scale_z )
{
	var factor = RandLerp( scale_min, scale_max );

	if ( factor < 0.000001 )
		return obj;

	var center = obj.getBoundingBox().center;
	var list = moi.geometryDatabase.createObjectList();
	list.addObject( obj );

	var numaxes = scale_x + scale_y + scale_z;

	var factory;

	if ( numaxes == 3 )
	{
		factory = moi.command.createFactory( 'scale' );
		factory.setInput( 0, list );
		factory.setInput( 1, center );
		factory.setInput( 2, factor );
	}
	else if ( numaxes == 2 )
	{
		var frame;

		if ( scale_x && scale_y )
			frame = moi.vectorMath.createTopFrame();
		else if ( scale_x && scale_z )
			frame = moi.vectorMath.createFrontFrame();
		else if ( scale_y && scale_z )
			frame = moi.vectorMath.createRightFrame();
		else
			return;

		frame.origin = center;

		factory = moi.command.createFactory( 'scale2d' );
		factory.setInput( 0, list );
		factory.setInput( 1, frame );
		factory.setInput( 2, factor );
	}
	else if ( numaxes == 1 )
	{
		var dir = moi.vectorMath.createPoint( scale_x ? 1 : 0, scale_y ? 1 : 0, scale_z ? 1 : 0 );
		var refpt = moi.vectorMath.createPoint( center.x + dir.x, center.y + dir.y, center.z + dir.z );

		factory = moi.command.createFactory( 'scale1d' );
		factory.setInput( 0, list );
		factory.setInput( 1, center );
		factory.setInput( 2, factor );
		factory.setInput( 3, refpt );
	}
	else
	{
		return;
	}

	var objs = factory.calculate();

	var newobj = objs.item(0);
	moi.geometryDatabase.addObject( newobj );
	moi.geometryDatabase.removeObject( obj );

	return newobj;
}

function ScaleObjects( objects, scale_min, scale_max, scale_x, scale_y, scale_z )
{
	var list = moi.geometryDatabase.createObjectList();
	
	for ( var i = 0; i < objects.length; ++i )
	{
		var obj = objects.item(i);
		obj = ScaleObject( obj, scale_min, scale_max, scale_x, scale_y, scale_z );
		list.addObject( obj );
	}

	return list;
}

function DoRandomize()
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

	var dlg = moi.ui.commandDialog;
	
	while ( 1 )
	{
		if ( !dlg.waitForEvent() )
			return false;
			
		if ( dlg.event == 'done' )
			break;
	}

	var enable_move = moi.ui.commandUI.enable_move.value;
	var enable_rotate = moi.ui.commandUI.enable_rotate.value;
	var enable_scale = moi.ui.commandUI.enable_scale.value;

	var move_dist = moi.ui.commandUI.movedist.value;
	var move_x = moi.ui.commandUI.move_x.value;
	var move_y = moi.ui.commandUI.move_y.value;
	var move_z = moi.ui.commandUI.move_z.value;

	var rotate_angle = moi.ui.commandUI.rotateangle.value;
	var rotate_x = moi.ui.commandUI.rotate_x.value;
	var rotate_y = moi.ui.commandUI.rotate_y.value;
	var rotate_z = moi.ui.commandUI.rotate_z.value;

	var scale_min = moi.ui.commandUI.scalemin.value;
	var scale_max = moi.ui.commandUI.scalemax.value;
	var scale_x = moi.ui.commandUI.scale_x.value;
	var scale_y = moi.ui.commandUI.scale_y.value;
	var scale_z = moi.ui.commandUI.scale_z.value;

	if ( enable_move && move_dist != 0 && (move_x || move_y || move_z) )
		objects = MoveObjects( objects, move_dist, move_x, move_y, move_z );

	if ( enable_scale && !(scale_min == 0 && scale_max == 0) && !(scale_min == 1 && scale_max == 1) && (scale_x || scale_y || scale_z) )
		objects = ScaleObjects( objects, scale_min, scale_max, scale_x, scale_y, scale_z );

	if ( enable_rotate && rotate_angle != 0 && (rotate_x || rotate_y || rotate_z) )
		objects = RotateObjects( objects, rotate_angle, rotate_x, rotate_y, rotate_z );

}

DoRandomize();
