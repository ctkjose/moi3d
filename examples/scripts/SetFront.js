script:var vname = 'Front'; var vp = moi.ui.mainWindow.viewpanel; vp.mode = vname; if ( vp.getViewport(vname).name != vname ) vp.reverseView( vname );