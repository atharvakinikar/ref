import os
import webapp2
import urllib
import json
from google.appengine.ext.webapp import template

class MainPage(webapp2.RequestHandler):
    def get(self):
        template_values = {}
        path = os.path.join(os.path.dirname(__file__),'index.html')
        self.response.out.write(template.render(path, template_values))
        
    def post(self):
        zip = self.request.get('zip')
        if len(zip) != 6 or not zip.isdigit():
            template_values = {
                "error": "Incorrect Pin Code"
            }
            path = os.path.join(os.path.dirname(__file__), 'error.html')
            return self.response.out.write(template.render(path, template_values))
        else:
            url = "https://api.postalpincode.in/pincode/" + zip
            data = urllib.urlopen(url).read()
            data = json.loads(data)
            if(data[0]['Status'] == 'Success'):
                template_values = {
                    "post_office": data[0]['PostOffice'][0]['State'],
                    "name": data[0]['PostOffice'][0]['Name'],
                    "block": data[0]['PostOffice'][0]['Block'],
                    "district": data[0]['PostOffice'][0]['District']
                }
                path = os.path.join(os.path.dirname(__file__), 'results.html')
                self.response.out.write(template.render(path, template_values))
            else:
                template_values = {
                    "error": "Wrong Pin"
                }
                path = os.path.join(os.path.dirname(__file__), 'error.html')
                return self.response.out.write(template.render(path, template_values))
                
app = webapp2.WSGIApplication([('/', MainPage)], debug=True)


#cloud terminal command : py google-cloud-sdk/bin/dev_appserver.py C:\Users\sahil\CCL_trial\1_to_3\app.yaml