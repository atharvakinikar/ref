import express from 'express';
const app = express();
import mongoose from 'mongoose';
const router = express.Router()
// Configure the server port
const port = 5050;


const uri = "mongodb://127.0.0.1:27017/1part2";


mongoose.connect(uri)

const db =mongoose.connection
db.on('error', (error) => {
    console.log(error)
})

const userSchema = new mongoose.Schema(
    { name: String, age: Number,WAD_Marks:Number,CC_Marks:Number,DSBDA_Marks:Number,CNS_Marks:Number,AI_Marks:Number }
)
const User = mongoose.model('Student_marks', userSchema);
db.once('connected', () => {
    User.createCollection().then(function () {
        console.log('Collection is created!');
    });
})
// Start the server
app.listen(port, () => {

  console.log(`Server is running on port ${port}`);
});


function testRoute(request,response){
    response.send("hello")
}

function inesrtMany(req,resp){
    const studentsData = [
        { name: "John Doe", age: 20, WAD_Marks: 85, CC_Marks: 70, DSBDA_Marks: 90, CNS_Marks: 80, AI_Marks: 75 },
        { name: "Jane Smith", age: 22, WAD_Marks: 90, CC_Marks: 75, DSBDA_Marks: 80, CNS_Marks: 85, AI_Marks: 70 },
      ];
      try{
     a=User.insertMany(studentsData)
      }
      catch(error)
      {
        console.log(error)
      }
    //   resp.send(User.find({}))
    resp.send("Done")
}

async function displayAll(req,resp){
    const b=await User.count({})
    const a=await  User.find({})
    console.log(b)
    resp.send(String(b)+" "+a,)    
}

async function dsbda(req,resp){const documents = await User.find({
    "WAD_Marks": { $gt: 20 },
    "CC_Marks": { $gt: 20 },
    "DSBDA_Marks": { $gt: 20 },
    "CNS_Marks": { $gt: 20 },
    "AI_Marks": { $gt: 70 }
  });
    resp.send(documents)
}
async function table(req,resp){
    const documents=await User.find({})
    console.table(documents)
    let tableHTML = '<table>';
    tableHTML += '<tr><th>Name</th><th>Age</th><th>WAD Marks</th><th>CC Marks</th><th>DSBDA Marks</th><th>CNS Marks</th><th>AI Marks</th></tr>';
    documents.forEach((doc) => {
      tableHTML += `<tr><td>${doc.name}</td><td>${doc.age}</td><td>${doc.WAD_Marks}</td><td>${doc.CC_Marks}</td><td>${doc.DSBDA_Marks}</td><td>${doc.CNS_Marks}</td><td>${doc.AI_Marks}</td></tr>`;
    });
    tableHTML += '</table>';

    // Send HTML response
    resp.send(tableHTML);
}


router.get('/',testRoute)
router.get('/insertArray',inesrtMany)
router.get('/displayAll',displayAll)
router.get('/dsbda',dsbda)
router.get('/table',table)

app.use('/', router);