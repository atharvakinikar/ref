import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        seat = "33241"
        name = "Atharva"

        for i in range(10):
            self.response.write(name + " - " + seat + "<br>")

app = webapp2.WSGIApplication([('/',MainPage)],debug=True)

#cloud terminal command : py google-cloud-sdk/bin/dev_appserver.py C:\Users\sahil\CCL_trial\1_to_3\app.yaml