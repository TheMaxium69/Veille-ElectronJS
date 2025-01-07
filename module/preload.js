const ipc = require('electron').ipcRenderer

console.log('preload.js');
ipc.send('hello');


ipc.on("messageChannel", (event, message) => {
    console.log(message);
});
