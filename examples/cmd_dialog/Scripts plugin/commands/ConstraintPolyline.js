
function DoPolyline()
{
	var ui = moi.ui;

	var dialog = ui.commandDialog;

	while ( 1 )
	{
		if ( !dialog.waitForEvent() )
			return;

		if ( dialog.event == 'done' )
			break;
	}

	var curvefactory = moi.command.createFactory( 'polyline' );

	moi.command.setCommandSpecificUndo( true );

	var pointpicker = ui.createPointPicker();
	var numpoints = 0;
	var closed = false;

	ui.beginUIUpdate();
	ui.hideUI( 'ConstraintPrompt' );
	ui.hideUI( 'ConstraintOptions' );
	ui.showUI( 'StartPrompt' );
	ui.endUIUpdate();

	while ( true )
	{
		curvefactory.createInput( 'point' );
		var pointindex = curvefactory.numInputs - 1;

		pointpicker.clearBindings();
		pointpicker.bindResultPt( curvefactory.getInput(pointindex) );

		var boolindex;
		var startpt = null;
		var previouspt = null;

		if ( numpoints > 0 )
		{
			startpt = curvefactory.getInput(0).getValue();

			var previndex = pointindex - 1;
			previouspt = curvefactory.getInput(previndex).getValue();

			if ( numpoints == 1 )
				pointpicker.bindBasePt( curvefactory.getInput(previndex) );
		}

		ui.beginUIUpdate();

		if ( numpoints == 0 )
		{
			ui.hideUI( 'NextPrompt' );
			ui.showUI( 'StartPrompt' );

		}
		else
		{
			ui.hideUI( 'StartPrompt' );
			ui.showUI( 'NextPrompt' );

		}

		ui.endUIUpdate();

		pointpicker.clearSnapPoints();
		if ( numpoints >= 3 )
			pointpicker.addSnapPoint( startpt, ui.getText('Closed snap') );

		pointpicker.resetOnMouseLeave = (numpoints > 1);

		++numpoints;

		var exit = false;
		var undo = false;

		pointpicker.bindFunc( ui.commandUI.ConstraintPoint );

		while ( 1 )
		{
			if ( !pointpicker.waitForEvent() )
			{
				exit = true;
				break;
			}

			if ( pointpicker.event == 'undo' )
			{
				if ( numpoints > 1 )
				{
					numpoints -= 2;
					curvefactory.removeLastInput();
					curvefactory.removeLastInput();

					pointpicker.clearCurrentSnaps();

					ui.removeLastPickedPoint();
					curvefactory.update();

					undo = true;

					break;
				}

				continue;
			}


			if ( pointpicker.event == 'done' )
			{
				exit = true;
				break;
			}

			if ( pointpicker.event == 'finished' )
				break;
		}

		if ( exit )
			break;

		if ( undo )
			continue;

		if ( previouspt != null && moi.vectorMath.pointsWithinTolerance( previouspt, pointpicker.pt ) )
		{
			--numpoints;
			curvefactory.removeLastInput();

			ui.removeLastPickedPoint();
		}

		if ( numpoints >= 4 && moi.vectorMath.pointsWithinTolerance( startpt, pointpicker.pt ) )
		{
			closed = true;
			break;
		}
	}

	if ( !closed && numpoints > 0 )
	{
		--numpoints;
		curvefactory.removeLastInput();

		curvefactory.update();
	}

	if ( numpoints < 2 )
	{
		curvefactory.cancel();
		moi.command.cancel();
	}
	else if ( pointpicker.event == 'cancel' )
	{
		if ( pointpicker.cancelReason == 'newcommandstarting' )
			curvefactory.commit();
		else
			curvefactory.cancel();
	}
	else
	{
		curvefactory.commit();
	}
}

DoPolyline();
