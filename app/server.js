(function () {'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Server = _interopDefault(require('upnpserver'));

let serverObj = null;

function startServer (directoriesArray, callback){
    let msg = "";
    if (serverObj !== null) {
        stopServer().then((msg) => {
            callback(null, msg);   
        }).catch((msg) => {
            callback(null, msg);               
        });
        return ;
    }
    directoriesArray = directoriesArray.filter((elem) => {
        return {
            path: elem.path,
            mountPoint: '/' + elem.name,
        }
    });
    console.log(directoriesArray);
    serverObj = new Server({ "name": "DLNA-Broadcaster" }, directoriesArray);

    serverObj.start();

    msg = "Server successfully started"; 
    callback(null, msg);   
}

function stopServer (){
    return new Promise((fullfill, reject) => {
        if (serverObj === null) {
            fullfill("Server not started");
            return;
        }

        serverObj.stop((err, stopped) => {
            if (stopped) {
                serverObj = null;
                fullfill("Server successfully stopped");
            } else {
                reject("Unable to stop the server");
            }
        });

    });    
}

exports.startServer = startServer;
exports.stopServer = stopServer;

}());
//# sourceMappingURL=server.js.map