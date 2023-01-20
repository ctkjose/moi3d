
// ------------------------ Rocket 3F/MoI Bridge 1.3------------------------

//get path variables

var MoI_dir = moi.filesystem.getAppDataDir();
var Base_dir = MoI_dir.substr( 0, MoI_dir.length - 4 );
var RocketPath = Base_dir + '\\DigitalFossils\\Rocket 3F\\'

var BridgeExePath = RocketPath + 'Bridges\\MoI_to_Rocket_3F.exe'
var BridgeObjPath = RocketPath + 'Bridges\\Bridge.obj'

manager(moi.command.getCommandLineParams())
//moi.ui.alert(BridgeObjPath );



// decide what to do when script is activated
function manager(action)
{
	
	if (action=='hard' )
		importObj();
	
	if (action=='' )
		Export();
	
	if (action=='Sub' )
	{
		importObj();
		Subdivision()
		
	}
	
}


// ImportObj v.1.5 - Max Smirnov. 2015
function importObj()
{
	//var objPath = BridgeObjPath
	if ( !BridgeObjPath ) return false;
		moi.ui.commandUI.progressinfo.innerHTML="Loading"; 
	moi.ui.commandUI.loadObj( BridgeObjPath );
	var facesnum = moi.ui.commandUI.faces.length;
	moi.ui.commandUI.progressinfo.innerHTML="Normalizing"; 
	moi.ui.commandUI.normalizeObj( false ) 
	var cstart = 0, cend=0, cstep = 2000;
	do {	cend = (cend+cstep>facesnum)?facesnum:cend+cstep;
	moi.ui.commandUI.progressinfo.innerHTML="Processing ("+cstart+"/"+facesnum+")<br/>Press ESC to abort"; 
	moi.ui.commandUI.processObj(cstart, cend); 
	cstart +=cstep;
} while (cend<facesnum);
	moi.ui.commandUI.progressinfo.innerHTML="Resizing"; 
moi.ui.commandUI.showObj();
moi.ui.commandUI.progressinfo.innerHTML="Joining<br/>Press ESC to skip"; 
moi.ui.commandUI.joinObj(20000);
moi.ui.commandUI.progressinfo.innerHTML=""; 
}



// Subdivision beta9  - Max Smirnov. 2015
function Subdivision()
{ 
	
	var cancel = moi.command.getCommandLineParams();
	if ( cancel !=='') moi.command.registerCommandSpecificShortcutKey( cancel );
		if ( !moi.ui.commandUI.init() ) return;
			if ( moi.ui.commandUI.m.nakedCornersNum >0 ) { moi.ui.beginUIUpdate(); moi.ui.showUI( 'cornersCheckbox' ); moi.ui.endUIUpdate();} 
				
	
	//while ( true )
	//{
		//moi.ui.commandDialog.waitForEvent();
		//e  = moi.ui.commandDialog.event;
		//if ( e == 'cancel' || e==cancel ) { moi.ui.commandUI.restoreState(); return 0; }
		//if ( e == 'done' ) { moi.ui.commandUI.FinalizeSubdiv(); moi.ui.commandUI.joinSurfaces(); return 1; }
		//if ( e == 'smooth' || e == 'smoothSlider'  || e == 'preserveCorners' ) { moi.ui.commandUI.lastalpha = -1; }
		//}
		
		moi.ui.commandUI.FinalizeSubdiv(); moi.ui.commandUI.joinSurfaces(); return 1; 
	}
	
	
// MoI Organics Export
function Export()
{ 
	
	
	var so = moi.geometryDatabase.getSelectedObjects(); 
	if ( so.length == 0 ) 
	{
		moi.ui.alert("Nothing is selected.");
	}
	else
	{
		Export_to_Rocket()
		
		function Export_to_Rocket()
		{
			
			
			moi.geometryDatabase.fileExport(BridgeObjPath, 'NoUI=True');
			moi.filesystem.shellExecute(BridgeExePath);
		}
	}
	
}
	
	
	