//config: norepeat
//Nuts and bolts. v.0.96 Martin, Max Smirnov 2015.06.21
function boltsAndNuts()
{
	while ( true )
	{
		moi.ui.commandUI.build( true );
		moi.ui.commandDialog.waitForEvent();
		var e  = moi.ui.commandDialog.event;
		
		if ( e == 'headFlag' && ( moi.ui.commandUI.threadLength.value == moi.ui.commandUI.shankLength.value )) { moi.ui.commandUI.shankRebuild = true;  }
		if ( e == 'headFlag' && ( moi.ui.commandUI.nutDistance.value > 0 )) { moi.ui.commandUI.nutRebuild = true;  }
		if ( e == 'shankFlag' ) { moi.ui.commandUI.headRebuild = true; moi.ui.commandUI.nutRebuild = true;  }
		if ( e == 'nutFlag' ) if (moi.ui.commandUI.shankFlag.value) { moi.ui.commandUI.nutRebuild = true;} else { moi.ui.commandUI.headRebuild = true;}
		if ( (e == 'washersFlag' || e == 'washerHeight') && moi.ui.commandUI.nutDistance.value > 0) if (moi.ui.commandUI.shankFlag.value) { moi.ui.commandUI.nutRebuild = true;} else { moi.ui.commandUI.headRebuild = true;}
		if ( e == 'chamferAngleSlider' || e == 'chamferAngleBox' ) { moi.ui.commandUI.headRebuild = true; moi.ui.commandUI.nutRebuild = true;  }
		if ( e == 'chamferDepthSlider' || e == 'chamferDepthBox' ) { moi.ui.commandUI.headRebuild = true; moi.ui.commandUI.nutRebuild = true;  }
		
		if ( e == 'nutWrenchSize' ) { moi.ui.commandUI.nutRebuild = true;  }
		if ( e == 'nutHeight' ) { moi.ui.commandUI.nutRebuild = true; moi.ui.commandUI.headRebuild = true;  }
		if ( e == 'nutDiameter' ) { moi.ui.commandUI.nutRebuild = true; }
		if ( e == 'nutDistance' ) { moi.ui.commandUI.shankRebuild = true; moi.ui.commandUI.nutRebuild = true; moi.ui.commandUI.headRebuild = true; }
		
		if ( e == 'headWrenchSize' ) { moi.ui.commandUI.headRebuild = true;  }
		if ( e == 'headHeight' ) { moi.ui.commandUI.headRebuild = true;  }
		
		if ( e == 'shankDiameter' ) { moi.ui.commandUI.shankRebuild = true;  }
		if ( e == 'shankLength' ) { moi.ui.commandUI.shankRebuild = true; moi.ui.commandUI.headRebuild = true; if (moi.ui.commandUI.nutDistance.value > 0) moi.ui.commandUI.nutRebuild = true; }
		if ( e == 'threadPitch' ) { moi.ui.commandUI.shankRebuild = true; moi.ui.commandUI.nutRebuild = true;  }
		if ( e == 'threadLength' ) { moi.ui.commandUI.shankRebuild = true; moi.ui.commandUI.nutRebuild = true; }
		
		if ( e == 'cancel' ) { moi.ui.commandUI.cancel(); return; }
		if ( e == 'done' ) { moi.ui.commandUI.done(); return; };
	}
}
boltsAndNuts();