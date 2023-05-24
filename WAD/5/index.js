import express from 'express'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())

const url = 'mongodb://127.0.0.1:27017/5'
mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{console.log("Connected to mongo")})

const musicSchema = new mongoose.Schema({
    SongName: String,
    FilmName: String,
    MusicDir: String,
    Singer: String,
    Actor: String,
    Actress: String
})

const Music = mongoose.model('Music', musicSchema);

app.get('/', (req, res)=>{
    res.send("Hello")
})

app.get('/addData', (req, res)=>{
    const music = [
        {
            SongName: 'S1',
            FilmName: 'M1',
            MusicDir: 'D2',
            Singer: 'S1',
            Actor: 'A1',
            Actress: 'Ac1'
        },
        {
            SongName: 'S2',
            FilmName: 'M2',
            MusicDir: 'D2',
            Singer: 'S2',
            Actor: 'A2',
            Actress: 'Ac2'
        }
    ];
    
    Music.insertMany(music);
    res.send("Inserted Data")
})

app.get('/get', async(req, res)=>{
    const data = await Music.find();
    const count = data.length;
    res.send({"Count":count, data: data})
})

app.get('/specificDir/:name', async(req, res)=>{
    const name = req.params.name;
    const data = await Music.find({MusicDir:name})
    res.send(data);
})

app.get('/specificMus/:dir/:singer', async(req, res)=>{
    const dir = req.params.dir;
    const singer = req.params.singer;
    const data = await Music.find({MusicDir:dir, Singer: singer})
    res.send(data);
})

app.get('/delete/:name', async(req, res)=>{
    const name = req.params.name;
    const data = await Music.deleteOne({SongName:name})
    res.send(data);
})

app.get('/table', async(req, res)=>{
    const data = await Music.find();
    const tableRows = data.map((music)=>{
        return `
            <tr>
                <td>${music.SongName}</td>
                <td>${music.FilmName}</td>
                <td>${music.MusicDir}</td>
                <td>${music.Singer}</td>
                <td>${music.Actor}</td>
                <td>${music.Actress}</td>
            </tr>
        `
    })
    const table = `
    <table>
        <thead>
            <tr>
                <th>SongName</td>
                <th>FilmName</td>
                <th>MusicDir</td>
                <th>Singer</td>
                <th>Actor</td>
                <th>Actress</td>
            </tr>
        </thead>
        <body>
            ${tableRows.join('')}
        </body>
    </table>`
    res.send(table)
})

// CURL request to call this JSON req
// curl -d '{"SongName":"S1", "FilmName":"abc", "MusicDir":"xyz", "Singer":"Helo", "Actor":"Someone", "Actress":"IDK"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/update
app.put('/update', async(req, res)=>{
    const { SongName, FilmName, MusicDir, Singer, Actor, Actress } = req.body;
    console.log({ SongName, FilmName, MusicDir, Singer, Actor, Actress })
    const filter = {SongName: SongName};
    const upd = {FilmName:FilmName, MusicDir:MusicDir, Singer:Singer, Actor:Actor, Actress:Actress}
    const updated = await Music.findOneAndUpdate(filter, upd, {new:true});
    res.send(updated)
})

app.listen(3000, ()=>{
    console.log(`Server Running on 3000`)
})