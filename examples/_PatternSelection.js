// Pattern selection v.0.3 - Max Smirnov. 2014
function patternSelect()
{
	if ( moi.geometryDatabase.getSelectedObjects().length < 2 ) return;
	moi.ui.commandUI.initPattern();
	moi.ui.commandDialog.waitForEvent();
}

patternSelect();