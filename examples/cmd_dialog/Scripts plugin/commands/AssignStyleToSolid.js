/* Assign styles to solids */ var styles = moi.geometryDatabase.getObjectStyles(); var breps = moi.geometryDatabase.getObjects().getBReps(); var style_index = 0; for ( var i = 0; i < breps.length; ++i, ++style_index ) { if ( style_index == styles.length ) { style_index = 0; } var brep = breps.item(i); brep.styleIndex = style_index; }