script: /* render view to clipboard */ moi.view.showAxisIcon = false; moi.grid.display = false; moi.grid.showXYAxes = false; var v = moi.ui.getActiveViewport(); if ( v != null ) { moi.view.lineWidth = 4; v.renderToClipboard( 2560, 2560 ); moi.view.lineWidth = 1; moi.view.showAxisIcon = true; moi.grid.display = true; moi.grid.showXYAxes = true; }