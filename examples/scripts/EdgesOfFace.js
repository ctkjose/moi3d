script: /* switch selection from a face to its edges */ var gd = moi.geometryDatabase; var faces = gd.getSelectedObjects().getFaces(); gd.deselectAll(); for ( var i = 0; i < faces.length; ++i ) faces.item(i).getEdges().setProperty( 'selected', true );