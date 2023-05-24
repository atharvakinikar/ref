import os
import webapp2
import json
import urllib
from google.appengine.ext.webapp import template

class MainPage(webapp2.RequestHandler):
    def get(self):
        template_views = {}
        path = os.path.join(os.path.dirname(__file__), 'index.html')
        self.response.out.write(template.render(path, template_views))
        
    def post(self):
        uni = self.request.get('uni')
        url = "http://universities.hipolabs.com/search?name=" + uni
        data = urllib.urlopen(url).read()
        data = json.loads(data)
        if not data:
            template_views = {}
            path = os.path.join(os.path.dirname(__file__), 'error.html')
            self.response.out.write(template.render(path, template_views))
        else:
            template_views = data[0]
            path = os.path.join(os.path.dirname(__file__), 'success.html')
            self.response.out.write(template.render(path, template_views))
        
        
app = webapp2.WSGIApplication([('/',MainPage)],debug=True)

#cloud terminal command : py google-cloud-sdk/bin/dev_appserver.py C:\Users\sahil\CCL_trial\1_to_3\app.yaml