script: /* match horizontal view angle */ var horiz_angle = 40; var width = 1024; var height = 768; var x = Math.tan( (horiz_angle/2) * (Math.PI/180) ); x *= height / width; var central_angle = Math.atan( x ) * 2 * (180/Math.PI); moi.ui.mainWindow.viewpanel.getViewport('3D').fieldOfViewAngle = central_angle;