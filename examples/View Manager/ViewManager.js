// config: norepeat

// #include "GetObjects.js"

// ****************************************
// View Manager v0.2.2
// ****************************************

setupDialog();

function setupDialog() {
// Wait for cancel or done.
    var dialog = moi.ui.commandDialog;
    
    while ( 1 )
    {
        if ( !dialog.waitForEvent() )
            return; // Canceled.
            
        if ( dialog.event == 'done' )
            break; // "Done" pushed.
    }
}
