// config: norepeat noautolaunch
// Heightmap v0.8 (MoI v4) - Max Smirnov. 2018
function Heightmap()
{
	if ( !moi.filesystem.getAppDataDir ) { moi.ui.alert("Incompatible MoI version"); return; }
	var e, imgPath = moi.filesystem.getOpenFileName( 'Open heightmap', 'Image files (JPEG, PNG, GIF, BMP)|*.jpg;*.jpeg;*.png;*.gif;*.bmp' );
	if ( !imgPath ) return false;
	var dlm = "\\";
	var filename = "heightmap_tmp_"+Math.round(Math.random()*100000000)+"_"+imgPath.substring(imgPath.lastIndexOf(dlm)+1);
	var tmpPath = moi.filesystem.getAppDataDir()+filename;
	moi.filesystem.copyFile(imgPath, tmpPath);
	var img = moi.ui.commandUI.document.getElementById("map");
	img.src = "moi://appdata/"+filename;

	while ( true )
	{
		moi.ui.commandDialog.waitForEvent();
		e  = moi.ui.commandDialog.event;
		if ( e === 'load' )
		{
			var canvas = moi.ui.commandUI.document.createElement("canvas");
			moi.ui.commandUI.g_width = img.naturalWidth;	canvas.width = img.naturalWidth;
			moi.ui.commandUI.g_height = img.naturalHeight;	canvas.height = img.naturalHeight;
			
			if (img.width === 0) { moi.filesystem.deleteFile(tmpPath); return; }
			
			var context = canvas.getContext('2d');
			context.drawImage(img, 0, 0);
			
			try { moi.ui.commandUI.g_imageData = context.getImageData(0, 0, canvas.width, canvas.height).data; }
				catch (e) { moi.ui.alert("Unable to access image data!\n" + e); moi.filesystem.deleteFile(tmpPath); return; }
			
			moi.filesystem.deleteFile(tmpPath);
			moi.ui.beginUIUpdate();
			moi.ui.commandUI.init();
			moi.ui.showUI( 'Options' );
			moi.ui.showUI( 'DoneCancelContainer' );
			moi.ui.endUIUpdate();
		}
		if ( e === 'cancel' ) { moi.ui.commandUI.cancel(); return; }
		if ( e === 'done' ) { moi.ui.commandUI.done(); break; }
		if ( e === 'type' ) { moi.ui.commandUI.buildBaseObjects(); moi.ui.commandUI.updategeometry(); }
	}
}
Heightmap();