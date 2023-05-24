import webapp2 

class MainPage(webapp2.RequestHandler):
    def get(self):
        for i in range(1,11):
            ans=(5*i)
            self.response.write("5 x "+ str(i) +"= " + str(ans)+"</br>")
        
app = webapp2.WSGIApplication([('/', MainPage)],debug=True)


#cloud terminal command : py google-cloud-sdk/bin/dev_appserver.py C:\Users\sahil\CCL_trial\1_to_3\app.yaml