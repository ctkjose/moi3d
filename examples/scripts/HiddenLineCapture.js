script:var v = moi.ui.getActiveViewport(); if ( v != null ) { moi.view.lineWidth = 4; moi.view.shadeMode = 'HiddenLineWireframe'; v.renderToClipboard( 2560, 2560 ); moi.view.lineWidth = 1; moi.view.shadeMode = 'Shaded'; }