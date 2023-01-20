// config: norepeat

#include "GetObjects.js"

function DoConnectPoints()
{
	var ui = moi.ui;
	var vm = moi.vectorMath;
	var gd = moi.geometryDatabase;

	var objectpicker = ui.createObjectPicker();
	objectpicker.allowPointObjects();
	if ( !GetObjects( objectpicker ) )
		return;

	var pts = objectpicker.objects;
		
	ui.beginUIUpdate();
	ui.hideUI( 'SelectPrompt' );
	ui.showUI( 'TolerancePrompt' );
	ui.showUI( 'ToleranceOptions' );
	ui.endUIUpdate();
	
	while ( 1 )
	{
		if ( !ui.commandDialog.waitForEvent() )
			return false;
			
		if ( ui.commandDialog.event == 'done' || ui.commandDialog.event == 'tolinput' )
			break;
	}
		
	var tol = 0.0;
	
	try { tol = ui.commandUI.tolinput.numericValue; } catch(e) { }
	
	if ( tol == 0.0 )
		return;
		
	var flags = new Array( pts.length );
	
	for ( var i = 0; i < pts.length; ++i )
	{
		for ( var j = i + 1; j < pts.length; ++j )
		{
			var pti = pts.item(i);
			var ptj = pts.item(j);
			
			if ( vm.distance( pti.pt, ptj.pt ) < tol )
			{
				var factory = moi.command.createFactory( 'line' );
				factory.setInput( 0, pti.pt );
				factory.setInput( 1, ptj.pt );
				factory.commit();
				
				flags[i] = true;
				flags[j] = true;
			}
		}
	}

	for ( var i = 0; i < pts.length; ++i )
	{
		if ( !flags[i] )
			pts.item(i).selected = false;
	}
}

DoConnectPoints();
