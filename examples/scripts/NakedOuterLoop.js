script: /* switch selection to naked edges of outer loops */ var gd = moi.geometryDatabase; var breps = gd.getSelectedObjects().getBReps(); gd.deselectAll(); for ( var i = 0; i < breps.length; ++i ) { var brep = breps.item(i); var faces = brep.getFaces(); for ( var j = 0; j < faces.length; ++j ) { var face = faces.item(j); var loops = face.getLoops(); var edges = loops.item(0); for ( var k = 0; k < edges.length; ++k ) { var edge = edges.item(k); if ( edge.getFacesOfEdge().length == 1 ) { edge.selected = true; } } } }