const express = require('express');
const cors = require('cors');
const app = express();
const monk = require('monk');

app.use(cors());

const db = monk('localhost/meower');
const mews = db.get('mews');
 
app.use(express.json());
app.get('/', (req, res) => {
    res.json({
        message: 'Meower! 😹'
    });
});

app.get('/mews', (req,res) => {
    
    mews
    .find()
    .then(mews => {
        res.json(mews);
    }); 
});
function isValidMew(mew) {
    return mew.name && mew.name.toString().trim() !== '' &&
        mew.content &&mew.content.toString().trim() !=='';
        
} 
app.post('/mews', (req, res) => {
    
    if (isValidMew(req.body)) {
        //insert to db..
       
        const mew = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
            
        };
        
        mews
            .insert(mew)
            .then(createdMew => {
                res.json(createdMew);
                
            });
        // console.log(db); 
    } else {
        res.status(422);
        res.json({
            message: 'Hey! Name and Content are required!'
        });
    }
});

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
    
});