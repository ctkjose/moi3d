// calcVolume v.0.6 - Max Smirnov. 2015
function calcVolume()
{
	var param = moi.command.getCommandLineParams();
	var density = (param !=='')?param*1:100;	
	var volume = moi.ui.commandUI.calcVolume(density);
	moi.copyTextToClipboard(volume); 
	moi.ui.alert('Volume: '+volume.toFixed(4)+' '+moi.geometryDatabase.unitsShortLabel+"3");
}
calcVolume();