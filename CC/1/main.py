import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.write("Hello World")

app =webapp2.WSGIApplication([('/',MainPage)],debug=True)

#cloud terminal command : py google-cloud-sdk/bin/dev_appserver.py C:\Users\sahil\CCL_trial\1_to_3\app.yaml