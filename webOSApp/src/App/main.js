// function quickServiceTest(){
//     var bridge = new WebOSServiceBridge();
//     var url = 'luna://com.webos.service.applicationmanager/running';

//     bridge.onservicecallback = callback;

//     function callback(msg){
//         var response = JSON.parse(msg);
//         console.log(response.returnValue);
//     }

//     var params = '{}';
//     bridge.call(url, params);
// }


const kindID = "com.sample.db.owner:1";
const bridge = new WebOSServiceBridge();

window.onload = function() {
    putKind();
    putPermissions();
    emptyDB();
}

function putKind() {
    let url = 'luna://com.webos.service.db/putKind';
    bridge.onservicecallback = (msg) => {console.log(msg)};
    let params = {
        "id":kindID,
        "owner":"com.cosmos.sample.db",
        "indexes": [
            { 
                "name": "index0",
                "props": [
                    {"name": "deviceName"}
                ]
            },
            {
                "name": "index1",
                "props": [
                    {"name": "location"}
                ]
            },
            {
                "name": "index2",
                "props": [
                    {"name": "status"}
                ]
            }
        ]
    };
    bridge.call(url, JSON.stringify(params));
}

function putPermissions() {
    let url = 'luna://com.webos.service.db/putPermissions';
    bridge.onservicecallback = (msg) => {console.log(msg)};
    let params = {
        "permissions":[ 
            { 
               "operations":{ 
                  "read":"allow",
                  "create":"allow",
                  "update":"allow",
                  "delete":"allow"
               },
               "object":kindID,
               "type":"db.kind",
               "caller":"com.cosmos.sample.db"
            }
         ]
    };
    bridge.call(url, JSON.stringify(params));
}

function emptyDB() {
    let url = 'luna://com.webos.service.db/del';
    bridge.onservicecallback = (res)=>{console.log(res);};
    
    let params = {
        "query":{ 
            "from":kindID
        }
    };
    bridge.call(url, JSON.stringify(params));
}

function findDeviceHandler(res) {
    console.log(res);
    let results = JSON.parse(res).results;
    
    let text = '';
    for (let i in results) {
        text += `deviceName: ${results[i].deviceName} | location: ${results[i].location} | status: ${results[i].status} </br>`
    }
    document.getElementById('item-text-field').innerHTML = text;
}

function findDevice() {
    let url = 'luna://com.webos.service.db/find';
    bridge.onservicecallback = findDeviceHandler;
    
    let params = {
        "query":{ 
            "from":kindID,
            // "where":[ 
            //    { 
            //       "prop":"deviceName",
            //       "op":"=",
            //       "val":"CML001",
            //       "limit":10
            //    }
            // ]
        }
    };
    bridge.call(url, JSON.stringify(params));
}

function putDeviceHandler(res) {
    let response = JSON.parse(res);
    console.log(res);

    if(response.returnValue) {
        findDevice();
    }
    else {
        alert("Put device error.");
        console.log("Put device error.");
    }
}

function putDevice() {
    let url = 'luna://com.webos.service.db/put';
    bridge.onservicecallback = putDeviceHandler;
    
    let params = {
        "objects" : [
            {
                "_kind": kindID,
                "deviceName": document.getElementById('text-input-name').value,
                "location": document.getElementById('text-input-loc').value,
                "status": false
            }
        ]
    };
    bridge.call(url, JSON.stringify(params));
    
    console.log('putDevice', params);

    document.getElementById('text-input-name').value = '';
    document.getElementById('text-input-loc').value = '';
}