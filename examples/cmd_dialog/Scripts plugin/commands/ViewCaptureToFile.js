/* View Capture to File*/var img = moi.view.screenshot( 'viewpanel', false ); var name = img.getSaveFileName(); if ( name != '' ) img.save( name );