import http.server
import socketserver
import webbrowser

class SimpleHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

PORT = 8000

# Serve files from the current directory
with socketserver.TCPServer(("", PORT), SimpleHTTPRequestHandler) as httpd:
    print(f"Serving at port {PORT}")
   
    # Open the default web browser, local host 
    webbrowser.open_new_tab(f"http://localhost:{PORT}/")
    
    # Serve files indefinitely
    httpd.serve_forever()