from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer

PORT = 8000

Handler = SimpleHTTPRequestHandler
SimpleHTTPRequestHandler.extensions_map.update({
    ".js": "text/javascript",
})

httpd = TCPServer(("", PORT), SimpleHTTPRequestHandler)

print("Serving at port", PORT)
print(Handler.extensions_map[".js"])
httpd.serve_forever()