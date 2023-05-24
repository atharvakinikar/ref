import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        ans = 10
        for i in range(1, 11):
            self.response.write("10 x "+ str(i)+ " = " + str(ans) + '</br>')
            ans+=10
        
app = webapp2.WSGIApplication([('/', MainPage)], debug=True)