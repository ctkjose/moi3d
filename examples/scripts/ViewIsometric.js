 script:var vp = moi.ui.mainWindow.viewpanel.getViewport('3D'); vp.projection = 'Parallel'; vp.setAngles( 90 - (Math.asin(Math.tan(30 * Math.PI/180)) * 180/Math.PI), 45 );