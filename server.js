const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/item.js');

app.use(bodyParser.json());

const db = require('./config/keys.js').mongoURI;

mongoose.connect(db, { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false})
        .then(() => console.log('db connected'))
        .catch(err => console.log(err));

app.use('/api', items);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

port = process.env.PORT || 5000;

app.listen(port, console.log(`Server start on port ${port}`));