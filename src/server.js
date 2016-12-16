import Server from "upnpserver";

let serverObj = null;

export function startServer (directoriesArray, callback){
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
};

export function stopServer (){
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
                reject("Unable to stop the server")
            }
        });

    });    
};