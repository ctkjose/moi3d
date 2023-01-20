
function Convert( FileName )
{
    var gd = moi.geometryDatabase;

    // Open the file, set 2nd param to true to suppress any save changes prompt.
    gd.open( FileName, true );

    // Create the output file name by breaking off the file extension and adding 'obj'.
    var OBJFileName = FileName.substr( 0, FileName.lastIndexOf('.') + 1 ) + 'obj';

    // Save out to the output file, passing the option to suppress the UI. You
    // add other options separated by semi-colons with no spaces. These
    // options are available for controlling the meshing:
    // (note:   | denotes mutually exclusive options, for example for Output choose one
    // of the given options, like Output=quads)
    //
    // NoUI=true
    // Angle=12.0
    // Output=ngons | quads | triangles
    // MaxLength=0.0
    // MaxLengthApplyTo=curved | planes | all
    // MinLength=0.0
    // AspectRatio=0.0
    // Weld=true
    // Display=shadedwithedges | shadednoedges | wireframe
    // ExpandedDialog=false

    gd.saveAs( OBJFileName, 'NoUI=true' );

    // Let's clear out and suppress any save changes prompt again.
    gd.fileNew( true );
}

function ConvertFolder( FolderName, FileExtensionToLoad )
{
    // Convert all files within a given folder, that have the given file extension.
    // For example, convert all .3dm files inside of the folder c:\test :
    // ConvertFolder( 'c:\\test', '3dm' );

    // Create the FileSystemObject to get access to files and folders.
    var FSO = new ActiveXObject( 'Scripting.FileSystemObject' );
    var Files = FSO.GetFolder( FolderName ).Files;

    // Go through every file in the folder.
    for ( var FilesEnum = new Enumerator(Files); !FilesEnum.atEnd(); FilesEnum.moveNext() )
    {
        var File = FilesEnum.item();
        var FileName = File.Path;
        var FileExtension = FSO.GetExtensionName( FileName );

        // If the extension matches the kind we are converting, call Convert() on it.
	if ( FileExtensionToLoad.toLowerCase() == FileExtension.toLowerCase() )
            Convert( FileName )
    }    
}
