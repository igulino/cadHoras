const exp = require('express');
const CORS = require('cors')
const App = exp(); const rotas = exp.Router()
const control = require('./server');
const bodyParser = require('body-parser');



App.use(CORS())
App.use(bodyParser.json()); App.use(bodyParser.urlencoded({extended:false}));



App.get('/', control.home);
App.post('/entrada', control.entrada);
App.post('/saida', control.saida);

App.listen(2000, () =>{
    console.log('rodando...');
}) 