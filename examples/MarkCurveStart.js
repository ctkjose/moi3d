// config: norepeat

#include "GetObjects.js"

function MarkOpenCurveStart()
{
	var objectpicker = moi.ui.createObjectPicker();
	objectpicker.allowCurves();
	if ( !GetObjects( objectpicker ) )
		return;
		
	var crvs = objectpicker.objects.getCurves();
	for ( var i = 0; i < crvs.length; ++i )
	{
		var crv = crvs.item(i);
		var start = crv.getStartPt();
		
		var factory = moi.command.createFactory( 'point' );
		factory.setInput( 0, start );
		factory.commit();	
	}
}

MarkOpenCurveStart();
