const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const funcoes = {
    ClienteCriado: (cliente) => {
        cliente.status = cliente.idade >= 60 ? "prioritário" : "comum";
        axios.post('http://localhost:10000/eventos', {
            tipo: "ClienteClassificado",
            dados: cliente
        });
    }
};

app.post('/eventos', (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    }
    catch (err) {
        res.status(400).send({ msg: err })
    }
    res.status(200).send({ msg: "ok" });
});

app.listen(7000, () => console.log("Classificação. Porta 7000"));