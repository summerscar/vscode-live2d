'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
var fs = require('fs');
var path = require('path');
const render = require('./htmltemp')

var config =  vscode.workspace.getConfiguration('live2d');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    function writeFile(isInstall) {
        var base = path.dirname(require.main.filename);
        var dir = path.join(base, 'vs', 'code', 'electron-browser', 'workbench');
        var indexPath = path.join(dir, "workbench.html");
        // var extensionPath = vscode.extensions.getExtension("live2d").extensionPath;
        var extensionPath = __dirname
        var newFilePath = null;
        var msg1 = "";
        var msg2 = "";
        if (isInstall) {
            newFilePath = path.join(extensionPath, "./../../","html", "index.html");
            try {
                fs.writeFileSync(newFilePath, render(config));
            } catch (err) {
                vscode.window.showInformationMessage(err);
            }
            msg1 = "Install Live2d  Error!";
            msg2 = "Install Live2d  Complete,Reset VsCode!";
        }
        else {
            newFilePath = path.join(extensionPath, "./../../", "html", "index1.html");
            msg1 = "UnInstall Live2d  Error";
            msg2 = "UnInstall Live2d Complete,Reset  VsCode!";
        }
        try {
            fs.writeFileSync(indexPath, fs.readFileSync(newFilePath));
        }
        catch (err) {
            vscode.window.showInformationMessage(msg1 + err);
        }
        vscode.window.showInformationMessage(msg2);
    }
    vscode.commands.registerCommand('live2d.install', (e) => {
        writeFile(true);
    });
    vscode.commands.registerCommand('live2d.uninstall', (e) => {
        writeFile(false);
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map