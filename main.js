const { app, BrowserWindow, ipcMain} = require('electron');
const path = require("path");
const fs = require("fs");


let mainWindow;

/* FONCTION QUI PREPARE LA CREATION D'UNE WINDOW */
function createWindow() {

    mainWindow = new BrowserWindow({
        frame: false, /* BAR NAV */
        title: "veille electronjs",
        width: 1318,
        height: 710,
        resizable: true,
        minWidth:577,
        minHeight:609,
        icon: path.join(__dirname, "/assets/logo.png"),
        webPreferences: {
            preload: path.join(__dirname, '/module/preload.js'),
            webSecurity: true,
            nodeIntegration: true, /* PARLER DANS LE FRONT */
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    mainWindow.setMenuBarVisibility(false); /* BAR NAV OLD */

    // mainWindow.loadURL("http://useritium.fr/connect.php").then(r => console.log("loadUrl", r)) /* CHARGEMENT SUR UNE URL */

    mainWindow.loadFile('index.html'); /* CHARGEMENT SUR UN FICHIER */


    // TITRE DE L'APP SUR L'OS
    mainWindow.webContents.on('page-title-updated', (event, title) => {
        mainWindow.setTitle('veille electronjs');
    });


}

/* AU CHARGEMENT DE L'APP */
app.whenReady().then(() => {

    createWindow();

    setActivity('Connectée sur Useritium App', null);

})

/* IPC */
ipcMain.on("test", (event) => {
    console.log("Bienvenue dans le back");
});
ipcMain.on("hello", (event) => {
    console.log("hello");

    event.sender.send('messageChannel', "message test");
});

/* FS */
ipcMain.on("create", (event) => {
    console.log("create file");

    let newFile = path.join('C:\\Users\\mxmto\\Desktop\\', "test.txt");

    fs.appendFile(newFile, "test", (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    })

});


// DISCORD
const clientId = '1228757305558827100';
const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({ transport: 'ipc' });

DiscordRPC.register(clientId);

async function setActivity(msg, pseudo){
    console.log("setActivity");
    if (!RPC) {
        console.log("RPC not ready");
        return
    };

    RPC.setActivity({
        details: msg,
        startTimestamp: Date.now(),
        largeImageKey: 'useritium',
        largeImageText: 'Useritium App',
        smallImageKey: 'tyrolium',
        smallImageText: 'Tyrolium',
        instance: false,
        buttons: [
            {
                label: 'Compte Useritium',
                url: 'https://useritium.fr'
            },
            {
                label: 'Tyrolium',
                url: 'https://tyrolium.fr'
            },
        ]
    })

}
RPC.login({ clientId }).catch(err => console.log(err))
