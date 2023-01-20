//	SquircleZ2D creates a half of a superellipse, between two selected points.

//	The two points must have either different x values, or different y values.
//	Height will be in the Z direction, and may have some y component.

//	For two points with very nearly the same x values, and/or very nearly
//	the same y values, there may be some strange behavior in 3D view.

//	This script is a modification of the superellipse2D script.
//	Brian McMillin March 4, 2013.  Uses code from other MoI javascripts.

//	References:
//	http://paulbourke.net/geometry/superellipse/
//	http://mathworld.wolfram.com/Superellipse.html


#include "GetPoint.js"

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function CrossProduct( v0, v1 )
{
	var x = (v0.y * v1.z) - (v0.z * v1.y);
	var y = (v0.z * v1.x) - (v0.x * v1.z);
	var z = (v0.x * v1.y) - (v0.y * v1.x);
	return moi.vectorMath.createPoint( x, y, z );
}

function EvalSquircle( t, P1, P2, dist, height, rangeValue )
{
	phi = Math.PI * 1.0	* t ;
	
	var cphi = Math.cos( phi );
	csign = Sign( cphi );
	cphi = Math.abs(cphi);

	var sphi = Math.sin( phi );
	ssign = Sign( sphi );
	sphi = Math.abs(sphi);
	
//	Define x, y and z values, in catFrame.
	var x = P2.x - (dist / 2) + csign * (dist / 2) * Math.pow(cphi, rangeValue);
	var y = 0.0
	var z = ssign * height * Math.pow(sphi, rangeValue);		
	return moi.vectorMath.createPoint( x, y, z );
}

function Sign( number )
{
	if ( number > 0)
	{
    return 1;
	} 
	else if (number < 0)
	{
    return -1;
  }
	else
	{
    return 0;
	}
}

function Update(BasePt, OtherPt, dist)
{
	var dist = dist;	
	var ui = moi.ui;
	var vm = moi.vectorMath;
	var catFlag = false;
	var sfactory = moi.command.createFactory( 'interpcurve' );
	var height = ui.commandUI.height.numericValue;
	var rangeValue = ui.commandUI.shape.numericValue;
	rangeValue = Math.abs(rangeValue);
	if (rangeValue == 0.0)
	{
	rangeValue = 0.01;
	}
	var numpoints = ui.commandUI.numpoints.integerValue;	

//	The Point with the smaller x value is to be P1.
	if ( BasePt.x < OtherPt.x )
	{
		var P1 = BasePt;
		var P2 = OtherPt;
	}
	else if ( BasePt.x > OtherPt.x )
	{
		var P1 = OtherPt;
		var P2 = BasePt;	
	}
//	If x values are the same, point with smaller y value is to be P1.	
	else if ( BasePt.y < OtherPt.y) 
	{
		var P1 = BasePt;
		var P2 = OtherPt;
	}
	else if ( BasePt.y > OtherPt.y )
	{
		var P1 = OtherPt;
		var P2 = BasePt;	
	}		

//	The world coordinate frame is defined as the regular Moi screen frame.	
//	The catFrame has the new cat_x-axis along P1 and P2.
//	The catFrame has the new cat_y-axis orthogonal, starting at P1.
//	The curve will start at P2, and end at P1.
//	Setting catFlag = true will signal that the catFrame be formed.
//	(The catFrame will always be formed, so the flag is not necessary,
//	but the flag is kept, in case some other situation is added.)	
	var catFlag = true;
//	The points are calculated in catFrame coordinates, between P2 and P1.
//	Then the points are converted back into world coordinates, and the 
//	(interp)curve factory created in the MoI geometry database, and
//	displayed on the screen.	

//	The catFrame FrameOrigin is at P1
//	P1 = (P1.x, P1.y, P1.z)
//	P2 = (P2.x, P2.y, P2.z)
//	The newXdir, for the catFrame, is the vector from P1 to P2.
	var newXdir = vm.makeVector( P1, P2);
//	newYdir is the cross product of Z and newXdir, orthogonal to newXdir.	
	var Z = vm.createPoint(0,0,1); 
	var newYdir = CrossProduct ( Z, newXdir);
//	Create the new catFrame coordinate frame.
	var catFrame = vm.createFrame( P1, newXdir, newYdir ); 
	var worldP1 = P1;  //save P1.
	
//	To convert to catFrame point, from world frame point :
	var cF_x = catFrame.distancex(P1);
	var cF_y = catFrame.distancey(P1);
	var cF_z = catFrame.distancez(P1);
	P1 = vm.createpoint(cF_x,cF_y,cF_z);	

	cF_x = catFrame.distancex(P2);
	cF_y = catFrame.distancey(P2);
	cF_z = catFrame.distancez(P2);
	P2 = vm.createpoint(cF_x,cF_y,cF_z);
//	This is the end of the catFrame creation.  P1 and P2 are given in
//	catFrame coordinates with z = 0, and can be processed just like
//	coordinates in the xy plane, except the xi,yi,zi points need to
//	be translated back to worldFrame coordinates before added to the
//	catFactory.	

//	worldP1 will be used, instead of i = numpoints which can cause the final
//	point to be very slightly off.
	
	for ( var i = 0; i < numpoints; ++i )
	{
		var t = i / (numpoints);
		var catPt = EvalSquircle( t, P1, P2, dist, height, rangeValue ) ;

//	To convert to worldframe point, from catFrame point:
//	(for example:) var worldPoint = catFrame.evaluate(cF.x, cF.y, cF.z);
	if (catFlag)
	{
	catpt = catFrame.evaluate(catPt.x, catPt.y, catPt.z);
	}
		
		sfactory.createInput( 'point' );
		sfactory.setInput( sfactory.numInputs - 1, catpt );
	}

//	Add the more accurate, final point of the curve.
	catpt = worldP1
	sfactory.createInput( 'point' );
	sfactory.setInput( sfactory.numInputs - 1, catpt );	
	
	sfactory.update();	
	return sfactory;
}

function DoSquircleZ2D()
{

	var ui = moi.ui;
	var pointpicker = ui.createPointPicker();
	pointpicker.disableSnapToBasePt = true;
	
	if ( !GetPoint( pointpicker ) )
		return;

	var BasePt = pointpicker.pt;
	
	ui.commandUI.g_BasePt = BasePt;
	pointpicker.bindFunc( moi.ui.commandUI.OnGetDistancePoint );

	ui.beginUIUpdate();
	ui.hideUI( 'FirstPrompt' );
	ui.showUI( 'SecondPrompt' );
	ui.endUIUpdate();

	if ( !GetPoint( pointpicker ) )
		return;	
		
	var OtherPt = pointpicker.pt;	
	var dist = moi.vectorMath.distance( BasePt, OtherPt );
	
	ui.beginUIUpdate();
	ui.hideUI( 'SecondPrompt' );
	ui.showUI( 'SquircleOptions' );
	ui.endUIUpdate();	

//	The two points must have different x values OR different y values.

	if ( BasePt.x != OtherPt.x )
	{
	}
	else if ( BasePt.y != OtherPt.y )
	{
	}
	else
	{
	alert ("x values must differ, OR z values must differ")
		return;
	}	
	
	var sfactory = Update(BasePt, OtherPt, dist);	
	var dlg = ui.commandDialog;

	// Wait for any changes to the UI or cancel or done.	
	while ( 1 )
	{
		if ( !dlg.waitForEvent() )
		{
			sfactory.cancel();
			return false;
		}
			
		if ( dlg.event == 'done' )
			break;
			
		if ( dlg.event == 'height' || dlg.event == 'rangeVal' || dlg.event == 'shapeslider' || dlg.event == 'numpoints' )
		{
			sfactory.cancel();
			sfactory = Update(BasePt, OtherPt, dist);
		}
	}
	
	moi.ui.clearPickedPoints();	
	sfactory.commit();
}

DoSquircleZ2D();