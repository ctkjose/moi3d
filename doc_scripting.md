# Scripting in MoI #

[MoI](http://moi3d.com) (Moment of Inspiration) is a superb CAD software that's designed to be simple and easy to use. MoI is the created by Michael Gibson and his company Triple Squid Software Design based at Washington state (US).

MoI provides a JavaScript API designed to create your own commands and extend the functionality of the application.

## MoI Application Data ##

When scripting **MoI** we would make reference to folders and files locations used by **MoI**. **MoI** uses the default OS locations for application data, ie "appData" in Windows and "Application Support" in MacOS. 

| Location | MacOS | Windows |
| --- | --- | --- |
| User Data | `~/Library/Application\ Support/Moi/` | `C:\Users\<username>\AppData\Roaming\Moi\` |
| Startup Scripts |  `~/Library/Application\ Support/Moi/startup` | `C:\Users\<username>\AppData\Roaming\Moi\startup` |
| Commands |  `~/Library/Application\ Support/Moi/commands` | `C:\Users\<username>\AppData\Roaming\Moi\commands` |
| Config file |  `~/Library/Application\ Support/Moi/moi.ini` | `C:\Users\<username>\AppData\Roaming\Moi\moi.ini` |


**AppData** is a hidden folder in Windows located in `C:\Users\<username>\AppData`. There are two folders inside AppData: `Local` that includes files tied to your current PC and `Roaming` that includes critical application files that can roam from device to device with a user account. To navigate to this folder open File Explorer/Windows Explorer, then type `%AppData%` into the address bar and hit enter.

**Application Support** is part of your hidden `Library` folder in MacOs. On MacOS from a Finder window, go to the menu and pick Go > "Go to folder" and type "~/Library/Application Support/" or open the Terminal and type  `open ~/Library/Application\ Support/`.



## Commands ##

Commands are scripts that add a functionality that we can invoke. Commands are written in JavaScript and may define a UI in an HTML file. **MoI** uses javascript version [ES2009](https://www.w3schools.com/js/js_es5.asp) (ES5) so be mindful of the different functionality and syntax limitations of ES5 vs ES6. 

The name of the file becomes the name of the command. A command can be associated to a keyboard shortcut using the "Shortcuts" tab in the settings or editing the `[Shortcut Keys Mac]` or the `[Shortcut Keys]` of your "moi.ini". You can run a command in the small box at the bottom of the window showing the coordinates. Erase the contents, type the name of a command and press enter to execute the command. From javascript we can use the API to execute a command:

```js
moi.command.execCommand( 'blend' );
```

> TIP: `moi.command.execCommand()` also accepts the file path to a javascript file.

You can create a dialog for your command by adding an HTML file with the same name as the javascript and the extension ".htm". If an html file is found a dialog is loaded on the top of side panel.


> **Command Cache** Commands are loaded during its first use and cached from that point on. You can disable the cache by editing your `moi.ini`. In the `[UI]` section add the line `DisableFileCaching=y`.


To install a command copy the `.js` and `.htm` files to your user `commands` folder.


## Execution of Commands ##

If your command has a UI (an html file) the execution first loads the HTML, which means objects and variables declared in your JS file are not available to the html just yet. The JS file is executed after the window load is completed.

> Global variables (window scope/object) you create in your HTML will be available to your main js script using the object `moi.ui.commandUI`. For example, if in my HTML we have something like `var myvariable;` (in the global/window scope), then in your main js you access the variable as `moi.ui.commandUI.myvariable`.


The code in the main js script is executed sequentially. When the execution terminates the command is done.


## Startup Scripts ##

In addition of commands your can execute arbitrary javascript on **MoI** startup, and we call them "startup scripts".  These scripts are intended to modify or add functionality in a global scope.  The scripts will run right before the main window is displayed - note that if the script puts up a modal dialog the main window won't show until the script finishes. Scripts will be run in alphabetical order. 

To install a startup script copy the `.js` and `.htm` files to your user `startup` folder.


## Notes JS Brigde ##

On MacOS Moi uses JavaScriptCore by what I expect is QtWebKit (5.4.1). Objects are instances of `MoiObj` and `CallbackObject`.

MoI renders using *AppleMetalOpenGLRenderer*.


# Referencing resources #

There're a couple of private URL (moi protocol) that we can use to reference resources in javascript/html. To specify an absolute path relative to the user application data we use the `moi://appdata/` url, for example 'moi://appdata/commands/file.css'; You can also access **MoI** internal resources, for example, `moi://ui/icons/OffsetIcon.png`.

When resolving a resource that doesn't use the `moi://` absolute url, **MoI** will search various paths for the resource. The first is the user's `commands` folder, then it will look in the app's `ui` and `commands` folders.


# Building a UI #

**MoI** builds dialogs, menus, and panels using almost standard HTML by means of QtWebKit. There are some quirks that we will try to discuss as we explain how to build a UI.


To sort out....

## Special Hooks ##

When a view is loaded the `Initialize` function in your html's javascript is executed if one is found.

```js
function Initialize(){
//...put my initialization code here!
}
```

In a similar faction, you can add a `Shutdown` function that will be called when the view is closed.

```js
function Shutdown(){
//...put my cleanup and teardown code here!
}
```

If you include the standard OK/Cancel buttons, then you can add the special functions `OnOKClicked()` and `OnCancelClicked()` which will be called when the respective button is pressed. (See `./ui/DialogClose.htm`)


## MoI UI ##

The UI is made of mainly HTML templates. The UI files can be found in the "ui" folder. On Mac the ui folder is located in the application's resources. You can right-click on the app and select the "Show Package contents" to browser the Resources folder where you will find the "ui" folder.

> In the Terminal you can use the command `open /Applications/MoI\ v4.app/Contents/Resources/ui/` to quickly open the folder.


## Command Buttons ##

A command button is build as follows:

```html
<moi:CommandButton icon="icons/CustomIcon.png" command="CommandName">Button text label here</moi:CommandButton>
```

The icons are located in the "icons" folder.

