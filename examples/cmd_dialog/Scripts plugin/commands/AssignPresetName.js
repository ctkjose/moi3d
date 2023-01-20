// config: norepeat

function DoAssignName()
{
	var objects = moi.geometryDatabase.getSelectedObjects();
	if ( objects.length == 0 )
		return;
		
	var dialog = moi.ui.createDialog( 'moi://commands/AssignPresetNameDialog.htm', 'resizeable,defaultWidth:350,defaultHeight:520' );
	
	var result = dialog.window.doModal();
	if ( result == -1 ) // Canceled
		return;
		
	// If we get to here, assign the picked name to the selected objects.
	objects.setProperty( 'name', result );	
}

DoAssignName();
