#include "GetCircle.js"
#include "GetPoint.js"

function DoIntersect2Circles()
{
	// Get the first circle.
	var factory1 = moi.command.createFactory( 'circle' );
	if ( !GetCircle( factory1, false ) )
		return;
		
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'RadiusPrompt' );
	moi.ui.hideUI( 'RadiusOptions' );
	moi.ui.showUI( 'CenterPrompt' );
	moi.ui.endUIUpdate();

	moi.ui.clearPickedPoints();

	// Get the second circle.		
	var factory2 = moi.command.createFactory( 'circle' );
	if ( !GetCircle( factory2, false ) )
		return;
	
	// Gather the 2 circles into an object list and pass them to the
	// intersect factory to have them intersected and get points generated.

	var circle1 = factory1.getCreatedObjects().item(0);
	var circle2 = factory2.getCreatedObjects().item(0);
	var circles = moi.geometryDatabase.createObjectList();
	circles.addObject( circle1 );
	circles.addObject( circle2 );
	
	var isectfactory = moi.command.createFactory( 'intersect' );
	isectfactory.setInput( 0, circles );
	var points = isectfactory.calculate();
	
	if ( points.length != 2 )
		return;
		
	var pt1 = points.item(0).pt;
	var pt2 = points.item(1).pt;
	
	
	// Now we want to start up a pointpicker get a point.
		
	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'RadiusPrompt' );
	moi.ui.hideUI( 'RadiusOptions' );
	moi.ui.hideUI( 'CenterPrompt' );
	moi.ui.showUI( 'PointPrompt' );
	moi.ui.endUIUpdate();
		
	moi.ui.clearPickedPoints();
		
	var pointpicker = moi.ui.createPointPicker();
	pointpicker.addSnapPoint( pt1, '' );
	pointpicker.addSnapPoint( pt2, '' );
	pointpicker.finishOnMouseDown = true;
	if ( !GetPoint( pointpicker ) )
		return;
		
	// Finally, create the point that was closest to the clicked point.
	
	var dist1 = moi.vectorMath.distance( pointpicker.pt, pt1 );
	var dist2 = moi.vectorMath.distance( pointpicker.pt, pt2 );
	
	var pt = dist1 < dist2 ? pt1 : pt2;
	
	var ptfactory = moi.command.createFactory( 'point' );
	ptfactory.setInput( 0, pt );
	ptfactory.commit();
}

DoIntersect2Circles();
