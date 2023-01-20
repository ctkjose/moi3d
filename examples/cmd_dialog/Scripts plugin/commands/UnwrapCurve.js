// config: norepeat

#include "GetObjects.js"

function LengthSq( v )
{
	return (v.x * v.x) + (v.y * v.y) + (v.z * v.z);
}

function Normalize( v )
{
	var lensq = LengthSq( v );
	if ( lensq > 1.0e-12 )
		v.scale( 1.0 / Math.sqrt(lensq) );	
}

function UnwrapCurve( crv )
{
	// Create a line segment beneath the curve that is of the same length as the curve, put the
	// line flat on the x/y plane with its midpoint at the projection of the midpoint between
	// the curve's ends.
	
	var startpt = crv.getStartPt();
	var endpt = crv.getEndPt();
	
	// Project start/end points to x/y plane by setting z = 0.
	startpt.z = endpt.z = 0.0;
	
	var midpt = moi.vectorMath.average( startpt, endpt );
	
	
	// The direction of the line will be the direction between the start and end points.
	var dir = moi.vectorMath.makeVector( startpt, endpt );
	Normalize( dir );
	if ( LengthSq(dir) < 1.0e-3 )
		dir.set( 1.0, 0.0, 0.0 );
	
	var len = crv.getLength();
	
	dir.scale( len / -2.0 );
	
	var linea = moi.vectorMath.add( midpt, dir );
	
	dir.scale( -1.0 );
	
	var lineb = moi.vectorMath.add( midpt, dir );
	
	var factory = moi.command.createFactory( 'line' );
	factory.setInput( 0, linea );
	factory.setInput( 1, lineb );
	var output = factory.calculate();
	factory.cancel();
	
	var line = output.item(0);
	line.copyPropertiesFrom( crv );
	
	moi.geometryDatabase.addObject( line );
}

function DoUnwrap()
{
	var ui = moi.ui;

	// Get the 3D curves to use.
	var objectpicker = ui.createObjectPicker();
	objectpicker.allowCurves();
	if ( !GetObjects( objectpicker ) )
		return;

	var curves = objectpicker.objects;
	for ( var i = 0; i < curves.length; ++i )
	{
		var crv = curves.item(i);
		UnwrapCurve( crv );	
	}
}

DoUnwrap();
