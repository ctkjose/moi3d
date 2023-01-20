// config: norepeat

#include "GetObjects.js"

function Cancel( factories )
{
	for ( var i = 0; i < factories.length; ++i )
		factories[i].cancel();
		
	factories.length = 0;
}

function Commit( factories )
{
	for ( var i = 0; i < factories.length; ++i )
		factories[i].commit();
}

function Update( curves, numpoints, buildtype, closed, factories )
{
	Cancel( factories );

	if ( curves.length < 2 )
		return;
		
	if ( curves.length == 2 )
		closed = false;
		

	// Build points

	var points_for_crv = new Array( curves.length );
	
	for ( var iCrv = 0; iCrv < curves.length; ++iCrv )
	{
		crv = curves.item(iCrv);

		// Create point object to array.
		var pointfactory = moi.command.createFactory( 'point' );
		pointfactory.setInput( 0, crv.getStartPt() );
		var startpt = pointfactory.calculate();
		
		// Array it along the curve to produce a list of point objects.
		var arrayfactory = moi.command.createFactory( 'arraycurve' );
		arrayfactory.setInput( 0, startpt );     // Object list to array
		arrayfactory.setInput( 1, crv );        // Path curve for array
		arrayfactory.setInput( 2, 'NumItems' ); // Array mode
		arrayfactory.setInput( 3, numpoints );
		var arrayed_pts = arrayfactory.calculate();
		
		// The array contains all the newly created points, form a list with the start
		// point plus the arrayed ones in it.
		var pts = new Array();
		pts.push( startpt.item(0).pt );
		for ( var iPts = 0; iPts < arrayed_pts.length; ++iPts )
			pts.push( arrayed_pts.item(iPts).pt );
		
		points_for_crv[iCrv] = pts;
	}
	
	// Now go through and construct objects from the points.
	
	for ( var iSlice = 0; iSlice < numpoints; ++iSlice )
	{
		// Gather each "slice" of points up by grabbing the point from each curve.
	
		var pts = new Array();
		for ( var iCrv = 0; iCrv < curves.length; ++iCrv )
		{
			var crvpts = points_for_crv[iCrv];
			pts.push( crvpts[iSlice] );
		}
		
		if ( closed && buildtype != 'points' )
		{
			pts.push( pts[0] );		
		}
		
		if ( buildtype == 'points' )
		{
			// Build point objects.
			for ( var i = 0; i < pts.length; ++i )
			{
				var factory = moi.command.createFactory( 'point' );
				factory.setInput( 0, pts[i] );
				factories.push( factory );
			}
		}
		else if ( buildtype == 'polylines' || buildtype == 'curves' )
		{
			// Build polyline or interpolated curve.		
			
			var factory = moi.command.createFactory( buildtype == 'polylines' ? 'polyline' : 'interpcurve' );
			
			for ( var i = 0; i < pts.length; ++i )
			{
				factory.createInput( 'point' );
				factory.setInput( i, pts[i] );
			}
			
			factories.push( factory );		
		}
		else
		{
			// Build individual lines.
			for ( var i = 1; i < pts.length; ++i )
			{
				var factory = moi.command.createFactory( 'line' );
				factory.setInput( 0, pts[i-1] );
				factory.setInput( 1, pts[i] );
				factories.push( factory );		
			}
		}
	}	

	for ( var i = 0; i < factories.length; ++i )
		factories[i].update();
}

function LineWeb()
{
	var ObjectPicker = moi.ui.createObjectPicker();
	ObjectPicker.allowStandaloneCurves();
	if ( !GetObjects( ObjectPicker ) )
		return;

	var curves = ObjectPicker.objects;
	curves.sortBySelectionOrder();
	if ( curves.length < 2 )
		return;

	moi.ui.beginUIUpdate();
	moi.ui.hideUI( 'SelectPrompt' );
	moi.ui.showUI( 'OptionsPrompt' );
	moi.ui.showUI( 'Options' );
	
	if ( curves.length == 2 )
		moi.ui.hideUI( 'ClosedCheckbox' );
		
	moi.ui.endUIUpdate();

	var factories = new Array();
	
	Update( curves, moi.ui.commandUI.NumItems.integerValue, moi.ui.commandUI.Build.value, moi.ui.commandUI.ClosedCheckbox.value, factories );

	// Wait for cancel or done.
	var dialog = moi.ui.commandDialog;
	while ( 1 )
	{
		if ( !dialog.waitForEvent() )
		{
			Cancel( factories );
			return;
		}

		if ( dialog.event == 'done' )
			break;

		if ( dialog.event == 'NumItems' || dialog.event == 'Build' || dialog.event == 'ClosedCheckbox' )
			Update( curves, moi.ui.commandUI.NumItems.integerValue, moi.ui.commandUI.Build.value, moi.ui.commandUI.ClosedCheckbox.value, factories );
	}
	
	Commit( factories );
}

LineWeb();
