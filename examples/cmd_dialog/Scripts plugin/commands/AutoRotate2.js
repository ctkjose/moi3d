// config: norepeat

function DoAutoRotate()
{
	var rotation_angle = 0.5;		//  the default rotation amount per .rotate command.
	var direction = 'left';				// the default rotation direction.

	moi.ui.beginUIUpdate();
	moi.ui.showUI( 'TitleContainer' );
	moi.ui.showUI( 'RotationAngleContainer' );
	moi.ui.showUI( 'DirectionContainer');
	moi.ui.showUI( 'StartStopContainer');
	moi.ui.showUI('QuitContainer');
	moi.ui.showUI( 'CancelContainer' );
	moi.ui.endUIUpdate();

	moi.ui.commandUI['angleinput'].numericValue = rotation_angle;  // set initial numericinput box value.

	var startstop = true;
	var exit_now = false;

	// rotate
	while (1)
	{
		startstop = moi.ui.commandUI.GetStartStop() ;
		exit_now = moi.ui.commandUI.GetExit() ;

		if (startstop)
		{	
			while (1)
				{		
					rotation_angle = moi.ui.commandUI['angleinput'].numericValue;
					direction =  moi.ui.commandUI.GetDirection();
					startstop = moi.ui.commandUI.GetStartStop() ;
					exit_now = moi.ui.commandUI.GetExit() ;

					moi.ui.mainWindow.viewpanel.getViewport('3D').rotate( direction, rotation_angle );

					if (!startstop  || exit_now)
						break;
				}
		}

		if (exit_now)
			break;
	}
}

DoAutoRotate();
