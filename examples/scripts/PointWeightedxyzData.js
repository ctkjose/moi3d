function GetCurveControlPoints(curve)
{
	var gd = moi.geometryDatabase;
	var obj = gd.getObjects();
	obj.setProperty( 'showPoints', false); 
	curve.showPoints = true; 
	gd.selectAll();
	obj.setProperty( 'selected', false);
	
	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowEditPoints();
	objectpicker.done();
	gd.copyToClipboardCommand( objectpicker.objects );
	gd.pasteFromClipboard();	
	var points = gd.getSelectedObjects();
	gd.removeObjects(points);			
	
	curve.showPoints = false; 
	return points;
}

var curves = moi.geometryDatabase.getObjects().getCurves();	
for ( var f = 0; f < curves.length; ++f)
{
	pts = GetCurveControlPoints(curves.item(f));
	for ( var p = 0; p < pts.length; ++p)
	{
		var factory = moi.command.createFactory( 'text' );
		factory.setInput(0, moi.VectorMath.createFrame ( pts.item(p).pt) );
		factory.setInput(1, ' xyz('+ Math.round(pts.item(p).pt.x*10)/10 + ', ' + Math.round(pts.item(p).pt.y*10)/10 + ', ' + Math.round(pts.item(p).pt.z*10)/10+ ')');
		factory.setInput(2, 'Arial');
		factory.setInput(5, 'curves' );
		factory.setInput(6, 0.5);
		factory.setInput(7, 1);
		factory.commit();
	}
}