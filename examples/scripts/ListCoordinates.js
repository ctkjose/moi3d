// Gather up a list of the x,y,z coordinates of point objects and endpoints of
// curves and copy the list as text to the clipboard.

var str = '';

function AddNumber( num )
{
	// Use 6 decimal places.
	str = str + num.toFixed(6);
}

function AddCoordinate( pt )
{
	AddNumber( pt.x, str );
	str = str + ",";
	AddNumber( pt.y, str );
	str = str + ",";
	AddNumber( pt.z, str );
	str = str + "\r\n";
}

var pts = moi.geometryDatabase.getSelectedObjects().getPoints();
for ( var i = 0; i < pts.length; ++i )
{
	var ptobj = pts.item(i);
	AddCoordinate( ptobj.pt );
}

var crvs = moi.geometryDatabase.getSelectedObjects().getCurves();
for ( var i = 0; i < crvs.length; ++i )
{
	var crv = crvs.item(i);
	AddCoordinate( crv.getStartPt() );
	AddCoordinate( crv.getEndPt() );
}

moi.copyTextToClipboard( str );
