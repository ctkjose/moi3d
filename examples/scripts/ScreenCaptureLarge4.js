script: /* render view to clipboard */ var v = moi.ui.getActiveViewport(); if ( v != null ) { moi.view.lineWidth = 4; v.renderToClipboard( 2560, 2560 ); moi.view.lineWidth = 1; }