from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import json

class SimpleEcho(WebSocket):
    def handleMessage(self):
        requestString = json.dumps(self.data)
        responseString = '{"msg_type":"result", "device_id" : "IFX001", "command":"ON", "result": "TRUE"}'
        self.sendMessage(responseString)

    def handleConnected(self):
        print(self.address, 'connected')


    def handleClose(self):
        print(self.address, 'closed')

server = SimpleWebSocketServer('', 9999, SimpleEcho)
server.serveforever()
