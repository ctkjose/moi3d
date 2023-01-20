#include "GetObjects.js"

function dotproduct( v0, v1 )
{
	return (v0.x * v1.x) + (v0.y * v1.y) + (v0.z * v1.z);
}

function intersect( start0, end0, start1, end1 )
{
	// Reference:
	// Geometric Tools for Computer Graphics
	// Philip J. Schneider, David H. Eberly
	// section 10.8.1
	
	var vm = moi.vectorMath;
	
	var dir0 = vm.makeVector( start0, end0 );
	var dir1 = vm.makeVector( start1, end1 );

	var u = vm.makeVector( start1, start0 );
	
	var a = dotproduct( dir0, dir0 );
	var b = dotproduct( dir0, dir1 );
	var c = dotproduct( dir1, dir1 );
	var d = dotproduct( dir0, u );
	var e = dotproduct( dir1, u );

	var det = (a * c) - (b * b);

	if ( det < 1.0e-12 )
		throw 'Lines are parallel';

	var invdet = 1.0 / det;
	var param = ( b * e - c * d ) * invdet;
	
	return vm.createPoint( start0.x + dir0.x * param, start0.y + dir0.y * param, start0.z + dir0.z * param );
}

function lengthsq( v )
{
	return dotproduct( v, v );
}

function normalize( v )
{
	var lensq = lengthsq( v );
	if ( lensq < 1.0e-12 )
		return; // degenerate
		
	var invlen = 1.0 / Math.sqrt(lensq);
	
	v.x *= invlen;
	v.y *= invlen;
	v.z *= invlen;
}

function DoBisectorLine()
{
	moi.geometryDatabase.deselectAll();

	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowCurves();
	objectpicker.min = objectpicker.max = 2;

	if ( !GetObjects( objectpicker ) )
		return;
		
	var lines = objectpicker.objects;
	if ( lines.length != 2 )
		return;
		
	lines.setProperty( 'selected', false );
		
	var start0 = lines.item(0).getStartPt();
	var end0 = lines.item(0).getEndPt();
	var start1 = lines.item(1).getStartPt();
	var end1 = lines.item(1).getEndPt();

	// Find the intersection point between the extended lines.

	try
	{
		var pt = intersect( start0, end0, start1, end1 );
	}
	catch(e)
	{
		// Lines do not intersect
		return;
	}

	var vm = moi.vectorMath;

	// Get the endpoint of each line that is furthest from the intersection.
	var p0 = (vm.distance(start0, pt) > vm.distance(end0, pt) ? start0 : end0);
	var p1 = (vm.distance(start1, pt) > vm.distance(end1, pt) ? start1 : end1);

	// Make a vector to each of those endpoints, and find the furthest distance
	// from the intersection point.
	
	var v0 = vm.makeVector( pt, p0 );
	var v1 = vm.makeVector( pt, p1 );
	
	var lensq0 = lengthsq( v0 );
	var lensq1 = lengthsq( v1 );
	var lensq = Math.max( lensq0, lensq1 );
	var len = Math.sqrt( lensq );

	// Add those together to make a median vector.
	normalize( v0 );
	normalize( v1 );
	var vmid = vm.add( v0, v1 );
	normalize( vmid );

	// Scale the median vector by the furthest distance and use it to place the endpoint.	
	vmid.x *= len;
	vmid.y *= len;
	vmid.z *= len;
	
	var endpt = vm.createPoint( pt.x + vmid.x, pt.y + vmid.y, pt.z + vmid.z );
	
	var linefactory = moi.command.createFactory( 'line' );
	linefactory.setInput( 0, pt );
	linefactory.setInput( 1, endpt );
	linefactory.commit();
}

DoBisectorLine();
