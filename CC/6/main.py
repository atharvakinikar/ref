import webapp2

class MainApp(webapp2.RequestHandler):
    def get(self):
        num1=0
        num2=1
        for i in range(7):
            self.response.write(str(num1)+"</br>")
            temp = num2
            num2 = num1+temp
            num1 = temp
        
app = webapp2.WSGIApplication([('/', MainApp)], debug=True)