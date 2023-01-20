// PointCoordinates is a simple script which displays an alert message with
// the X, Y, and Z coordinates of a picked point.
// It is a modification of point.js and point.htm script.

#include "GetPoint.js"

function alert( msg )
{
	moi.ui.commandUI.alert( msg );
}

function DoPoint()
{
	var pointpicker = moi.ui.createPointPicker();
	if ( !GetPoint( pointpicker ) )
		return;

	var PickedPt = pointpicker.pt;	
	var Xval = PickedPt.X
	var Yval = PickedPt.Y
	var Zval = PickedPt.Z

	alert( 'X = ' + Xval + '    Y = ' + Yval + '    Z = ' + Zval)	
}

DoPoint();
