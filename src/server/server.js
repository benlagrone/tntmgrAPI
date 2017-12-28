const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express()

// app.get('/', (req, res) => res.send('Hello World!'))

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
// app.listen(3000, () => console.log('Example app listening on port 3000!'))

server.listen(port, () => console.log(`API running on localhost:${port}`));