

var g_NumCopies = 40;

function UpdateMoveDeltas( i, move_deltas )
{
	if ( i < 20 )
	{
		move_deltas.x += 1 + (i*0.5);
	}
	else
	{
		move_deltas.x += 1 + ((40-i) * 0.5);
	}
}

function UpdateScaleFactors( i, scale_factors )
{
	if ( i < 20 )
	{
		scale_factors.x += 0.1;
	}
	else
	{
		scale_factors.x -= 0.1;
		scale_factors.y += 0.1;
	}
}

function UpdateRotateAngles( i, rotate_angles )
{
	if ( i < 20 )
	{
		rotate_angles.z += 10;
	}
	else
	{
		rotate_angles.z -= 10;
	}
}




function MoveObject( obj, center, deltas )
{
	var origin = moi.vectorMath.createPoint( 0.0, 0.0, 0.0 );
	var delta = moi.vectorMath.createPoint( deltas.x, deltas.y, deltas.z );

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


function RotateWithFrame( obj, angle, frame, center )
{
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

function RotateObject( obj, center, angles )
{
	if ( angles.x != 0.0 )
		obj = RotateWithFrame( obj, angles.x, moi.vectorMath.createRightFrame(), center );

	if ( angles.y != 0.0 )
		obj = RotateWithFrame( obj, angles.y, moi.vectorMath.createFrontFrame(), center );

	if ( angles.z != 0.0 )
		obj = RotateWithFrame( obj, angles.z, moi.vectorMath.createTopFrame(), center );

	return obj;
}


function ScaleWithDir( obj, factor, dir, center )
{
	var refpt = moi.vectorMath.createPoint( center.x + dir.x, center.y + dir.y, center.z + dir.z );

	var list = moi.geometryDatabase.createObjectList();
	list.addObject( obj );

	var factory = moi.command.createFactory( 'scale1d' );
	factory.setInput( 0, list );
	factory.setInput( 1, center );
	factory.setInput( 2, factor );
	factory.setInput( 3, refpt );
	var objs = factory.calculate();

	var newobj = objs.item(0);
	moi.geometryDatabase.addObject( newobj );
	moi.geometryDatabase.removeObject( obj );

	return newobj;
}

function ScaleObject( obj, center, factors )
{
	if ( factors.x != 1.0 )
		obj = ScaleWithDir( obj, factors.x, moi.vectorMath.createRightFrame().zaxis, center );
		
	if ( factors.y != 1.0 )
		obj = ScaleWithDir( obj, factors.y, moi.vectorMath.createFrontFrame().zaxis, center );
		
	if ( factors.z != 1.0 )
		obj = ScaleWithDir( obj, factors.z, moi.vectorMath.createTopFrame().zaxis, center );
		
	return obj;
}


function CopyObject( obj )
{
	var newobj = obj.clone();
	moi.geometryDatabase.addObject( newobj );
	return newobj;
}


function TransformObjects( func, objects, params )
{
	var center = objects.getHighAccuracyBoundingBox().center;
	var list = moi.geometryDatabase.createObjectList();
	
	for ( var i = 0; i < objects.length; ++i )
	{
		var obj = objects.item(i);
		obj = func( obj, center, params );
		list.addObject( obj );
	}

	return list;
}

function MoveObjects( objects, delta )
{
	return TransformObjects( MoveObject, objects, delta );
}

function RotateObjects( objects, angles )
{
	return TransformObjects( RotateObject, objects, angles );
}

function ScaleObjects( objects, factors )
{
	return TransformObjects( ScaleObject, objects, factors );
}

function CopyObjects( objects )
{
	return TransformObjects( CopyObject, objects, null );
}



function DoScriptArray()
{
	var source_objects = moi.geometryDatabase.getSelectedObjects();
	
	var move_deltas   = moi.vectorMath.createPoint( 0, 0, 0 );
	var scale_factors = moi.vectorMath.createPoint( 1, 1, 1 );
	var rotate_angles = moi.vectorMath.createPoint( 0, 0, 0 );
	
	for ( var i = 0; i < g_NumCopies; ++i )
	{
		var new_objects = CopyObjects( source_objects );
		
		UpdateMoveDeltas( i, move_deltas );
		new_objects = MoveObjects( new_objects, move_deltas );
		
		UpdateScaleFactors( i, scale_factors );
		new_objects = ScaleObjects( new_objects, scale_factors );
		
		UpdateRotateAngles( i, rotate_angles );
		new_objects = RotateObjects( new_objects, rotate_angles );
	}
}

DoScriptArray();
