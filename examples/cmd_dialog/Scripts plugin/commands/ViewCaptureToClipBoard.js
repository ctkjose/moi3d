/*View capture to Cipboard*/var v = moi.ui.getActiveViewport(); if ( v != null ) { moi.view.lineWidth = 4; v.renderToClipboard( 2560, 2560 ); moi.view.lineWidth = 1; }
