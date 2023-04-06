const { error } = require('console');
const path = require('path');
const dtb = require('./db')

module.exports = {
    async home (req, res) {
        res.sendFile(path.join('C:/Users/ligor/OneDrive/workspace/programar/cad_horas'+'/home.html'))
        try {
           
        } catch (error) {
            console.log(error);
        }
       
    },

    async entrada (req, res){
        try {
            const {hor} = req.body;
            const {min} = req.body;

            var insert = "INSERT INTO horario (entrada, entradaMin) VALUES (?, ?)"
            dtb.query(insert, [hor, min], (error, truth)=>{
                console.log(error);
            })

            res.status(201).redirect('http://localhost:2000/')
        } catch (error) {
            console.log(error);
        }   
    },

    async saida (req, res){
        try {
            const {hor} = req.body;
            const {min} = req.body;

            //ordenar por última posição:
            //SELECT entrada, entradaMin FROM horario ORDER BY id DESC LIMIT 0, 1
            
            var inspect = "SELECT entrada, entradaMin, totHoras, totMin FROM horario ORDER BY id DESC LIMIT 0, 1"

            dtb.query(inspect, (error, truth)=>{
                var asmodeus = truth[0]; 
                console.log('inspect', asmodeus.entrada);
                var totHora = hor - asmodeus.entrada;
                var totMin = min - asmodeus.entradaMin;

                if (totMin < 0) {
                   totMin = totMin * -1
                }
               
                console.log(totHora,' : ', totMin);
                var inspect = "SELECT totHoras, totMin FROM horario ORDER BY id DESC LIMIT 0, 20"
                dtb.query(inspect, [totHora, totMin], (err, truth) =>{
                    console.log(err);  console.log('lenght da truth ', truth.length);
                    for (let index = 0; index < truth.length; index++) {
                        const element = truth[index];
                
                        if (element.totHoras > 0) {
                            index = truth.length;
                            var totHoras = element.totHoras + totHora;
                            var totMint = element.totMin + totMin;
                            dtb.query('INSERT INTO horario (totHoras, totMin) VALUES (?, ?)', [totHoras, totMint], (err, vicy) =>{
                                console.log(err);
                            })
                        }
                        console.log(element);
                        
                    }
                    //dtb.query('INSERT INTO horario (totHoras, totMin) VALUES (?, ?)', [x, y], (err, vicy) =>{
                    //    console.log(err);
                   // })
                   
                })
                console.log(error);
            })

            var insert = "INSERT INTO horario (saida, saidaMin) VALUES (?, ?)"
            dtb.query(insert, [hor, min], (error, truth)=>{
                console.log(error);
            })

            res.status(201).redirect('http://localhost:2000/')
        } catch (error) {
            console.log(error);
        }   
    }
    
}