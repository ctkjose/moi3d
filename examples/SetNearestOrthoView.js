// https://moi3d.com/forum/messages.php?webtag=MOI&msg=9322.1

var vp = moi.ui.mainWindow.viewpanel;

if (vp.mode != '3d') {
  vp.mode = '3d';
} else {
  var viewport_3d = vp.getViewport('3d');
  var dir = viewport_3d.cameraFrame.zaxis;

  var frame = moi.vectorMath.createTopFrame();

  var xneg = moi.vectorMath.createPoint(-frame.xaxis.x, -frame.xaxis.y, -frame.xaxis.z);
  var yneg = moi.vectorMath.createPoint(-frame.yaxis.x, -frame.yaxis.y, -frame.yaxis.z);
  var zneg = moi.vectorMath.createPoint(-frame.zaxis.x, -frame.zaxis.y, -frame.zaxis.z);

  var dirs = [frame.xaxis, frame.yaxis, frame.zaxis, xneg, yneg, zneg];
  var names = ['Right', 'Back', 'Top', 'Left', 'Front', 'Bottom'];

  var maxdot = 0.0;
  var index = 0;

  for (var i = 0; i < 6; ++i) {
    var dot = dir.x * dirs[i].x + dir.y * dirs[i].y + dir.z * dirs[i].z;
    if (dot > maxdot) {
      maxdot = dot;
      index = i;
    }
  }

  var name = names[index];

  var reversed = false;

  vp.mode = name;
  if (vp.getViewport(name).name != name) {
    vp.reverseView(name);
    reversed = true;
  }


  // Added below for calculating tilt.
  if (name == 'Top' || name == 'Bottom') {

    function DotProduct(pt1, pt2) {
      return (pt1.x * pt2.x) + (pt1.y * pt2.y) + (pt1.z * pt2.z);
    }

    function DistancePointToPlane(origin, normal, pt) {
      var A = normal.x;
      var B = normal.y;
      var C = normal.z;
      var D = -DotProduct(normal, origin);

      return ((A * pt.x) + (B * pt.y) + (C * pt.z) + D);
    }

    function ProjectTo2D(frame, pt) {
      var x = DistancePointToPlane(frame.origin, frame.xaxis, pt);
      var y = DistancePointToPlane(frame.origin, frame.yaxis, pt);

      return [x, y];
    }

    function DotProduct2D(pt1, pt2) {
      return (pt1[0] * pt2[0]) + (pt1[1] * pt2[1]);
    }

    var viewport_ortho = vp.getViewport(name);

    var xdir = viewport_3d.cplane.xaxis;
    if (reversed && name != 'Top' && name != 'Bottom')
      xdir.scale(-1);

    var pt = moi.vectorMath.add(viewport_3d.cameraPt, xdir);

    var dir2d = ProjectTo2D(viewport_3d.cameraFrame, pt);

    var mag_sq = (dir2d[0] * dir2d[0]) + (dir2d[1] * dir2d[1]);

    if (mag_sq > 0.0000001) {
      var mag = Math.sqrt(mag_sq);
      dir2d[0] /= mag;
      dir2d[1] /= mag;

      var dirs = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
      ];

      var closest = 0;
      var closest_cos = DotProduct2D(dir2d, dirs[0]);

      for (var i = 1; i < 4; ++i) {
        var this_cos = DotProduct2D(dir2d, dirs[i]);

        if (this_cos > closest_cos) {
          closest = i;
          closest_cos = this_cos;
        }
      }

      var tilt = 0;
      switch (closest) {
        case 1:
          tilt = 90;
          break;
        case 2:
          tilt = 180;
          break;
        case 3:
          tilt = 270;
          break;
      }

      viewport_ortho.tiltAngle = tilt;
    }
  }
}
