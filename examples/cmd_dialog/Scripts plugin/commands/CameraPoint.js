
function MakeCameraPoint()
{
	var view = moi.ui.mainWindow.viewpanel.getViewport('3D');

	var pt = view.cameraPt;

	var factory = moi.command.createFactory( 'point' );
	factory.setInput( 0, pt );
	factory.commit();
}

MakeCameraPoint();
