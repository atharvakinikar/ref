import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        for i in range(5):
            self.response.write("<b>Name</b>: Atharva</br>")
            self.response.write("<b>Roll</b>: 33241</br>")
            self.response.write("<b>Year</b>: TE</br>")
            self.response.write("<b>Class</b>: 10")
            self.response.write("<hr>")


app = webapp2.WSGIApplication([('/',MainPage)],debug=True)

#cloud terminal command : py google-cloud-sdk/bin/dev_appserver.py C:\Users\sahil\CCL_trial\1_to_3\app.yaml