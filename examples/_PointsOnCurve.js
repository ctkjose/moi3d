// PointsOnCurve v.1.2b - Max Smirnov. 2013
function PlacePoints(curve, distance, mode)
{
	var pt, factory, dst, ppt, skipPoint = false;
	var points = moi.GeometryDatabase.createObjectList();
	var tlr = moi.GeometryDatabase.tolerance;
	var crv = moi.GeometryDatabase.createObjectList();
	crv.addObject(curve);
	if ( mode === 'Adaptive' )
	{
		factory = moi.command.createFactory( 'separate' );
		factory.setInput( 0, crv );
		factory.commit();
		var subcurves = moi.geometryDatabase.getSelectedObjects().getCurves();
		if ( subcurves.length === 0 )  subcurves = crv;
	}
	else { var subcurves = crv; }
	
	for (var f=0;  f < subcurves.length; ++f)
	{
		factory = moi.command.createFactory( 'point' );
		factory.setInput(0, subcurves.item(f).getStartPt());
		pt = factory.calculate();
		ppt = pt.item(0);
		points.addObject(pt.item(0));
		if ( mode === 'Exact' ) { dst =  distance } else { dst = subcurves.item(f).GetLength()/Math.ceil(subcurves.item(f).GetLength()/distance) }
		
		factory = moi.command.createFactory( 'arraycurve' );
		factory.setInput( 0, pt );
		factory.setInput( 1, subcurves.item(f) );
		factory.setInput( 2, 'Distance' );
		factory.setInput( 4,  dst );
		factory.setInput( 5, 'None' );
		pt = factory.calculate();
		
		for (var p=0;  p < pt.length-1; ++p) 
		{
			if (moi.ui.commandUI['skip'].value && mode === 'Adaptive') 	skipPoint = (( Math.round(pt.item(p).pt.x/tlr) === Math.round((ppt.pt.x+pt.item(p+1).pt.x)/2/tlr) ) && ( Math.round(pt.item(p).pt.y/tlr) === Math.round((ppt.pt.y+pt.item(p+1).pt.y)/2/tlr) ) && ( Math.round(pt.item(p).pt.z/tlr) === Math.round((ppt.pt.z+pt.item(p+1).pt.z)/2/tlr) ) ) ? true : false;
			if ( !skipPoint ) points.addObject(pt.item(p));
			ppt = pt.item(p);
		}
	}
	if ( pt.length > 0 )
	{	
		var WithinTolerance = (Math.round(subcurves.item(0).getStartPt().x/tlr - pt.item(p).pt.x/tlr) === 0 ) && (Math.round(subcurves.item(0).getStartPt().y/tlr - pt.item(p).pt.y/tlr) === 0 ) && (Math.round(subcurves.item(0).getStartPt().z/tlr - pt.item(p).pt.z/tlr) === 0 );
		if (  !curve.isClosed || !WithinTolerance ) points.addObject(pt.item(p));
		ppt = pt.item(p);
	}

	if ( mode === 'Adaptive' )
	{
		factory = moi.command.createFactory( 'join' );
		factory.setInput( 0, subcurves);
		factory.commit();
		moi.geometryDatabase.selectLastCreated();
		if ( moi.ui.commandUI['Polyline'].value )
		{
			moi.GeometryDatabase.removeObjects (moi.geometryDatabase.getSelectedObjects().getCurves());
		}
		else { moi.geometryDatabase.getSelectedObjects().getCurves().setProperty( 'selected', false); }
	}
	return points;
}

function PointsOnCurve()
{
	var curves = moi.geometryDatabase.getSelectedObjects().getCurves();	
	var clp='';
	if ( curves.length > 0 )
	{
		while ( 1 )
		{
			if ( !moi.ui.commandDialog.waitForEvent() )
				return;
				
			if ( moi.ui.commandDialog.event == 'done' )
				break;
		}
		moi.geometryDatabase.getSelectedObjects().getCurves().setProperty( 'selected', false);
		for (var s=0;  s < curves.length; ++s)
		{
			var pts = PlacePoints(curves.item(s), moi.ui.commandUI['PointDist'].value, moi.ui.commandUI['mode'].value );
			moi.GeometryDatabase.addObjects (pts);
			if ( moi.ui.commandUI['Labels'].value ) 
			{
				var vp = moi.ui.getActiveViewport();
				for ( var p=0; p<pts.length;++p)
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

			if ( moi.ui.commandUI['Copy'].value ) 	
			{
				for ( var p=0; p<pts.length;++p) { clp +=  Math.round(pts.item(p).pt.x*100)/100 + "\t" + Math.round(pts.item(p).pt.y*100)/100 + "\t" + Math.round(pts.item(p).pt.z*100)/100+ "\r\n"; }  
				if  (curves.item(s).isClosed)
				{
					clp +=  Math.round(pts.item(0).pt.x*100)/100 + "\t" + Math.round(pts.item(0).pt.y*100)/100 + "\t" + Math.round(pts.item(0).pt.z*100)/100+ "\r\n"; 
				}
				clp +=  "\r\n"; 
			}
			if ( moi.ui.commandUI['Polyline'].value )
			{
				var factory = moi.command.createFactory( 'curve' );	
				for ( var p=0; p<pts.length;++p) 
				{
					factory.createInput('point');	
					factory.setInput(factory.numInputs - 1, pts.item(p).pt);
					factory.createInput('bool');	
					factory.setInput(factory.numInputs - 1, true); 
				}
				if  (curves.item(s).isClosed)
				{
					factory.createInput('point');	
					factory.setInput(factory.numInputs - 1, pts.item(0).pt);
					factory.createInput('bool');	
					factory.setInput(factory.numInputs - 1, true);
				}
				factory.commit();		
			}
		}
		if ( moi.ui.commandUI['Polyline'].value ) { moi.GeometryDatabase.removeObjects(curves);  }
		if ( moi.ui.commandUI['Copy'].value ) { moi.copyTextToClipboard(clp); }
	}
}

PointsOnCurve();


