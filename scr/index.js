const express = require('express');
const path = require("path");
const app = express();
const { JSONModifier } = require('./jsonmodifier.js');

const jsonModifier = new JSONModifier(path.join(__dirname, "Json", "/"));

const orderModifier = new JSONModifier(path.join(__dirname, "order", `order.json`));

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());

app.get("/szendvics/:option", (req, res) => {
    jsonModifier.read(path.join(__dirname, "../Json", `/${req.params.option}.json`)).then( data => res.json( data) );
 });

app.post("/rendeles", (req, res) => {
    orderModifier.write(req.body)
    .then( data => res.status(201).send({message: `Rendelését sikeresen rögzítettük!`}));
})

//admin page set-up:
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", '/admin.html'));
});

app.get('/orders', (req, res) => {
    
    orderModifier.read()
   .then( r =>{
    res.json(r)
   } )
  
});

app.patch('/update', (req, res) => {
    orderModifier.update(req.body)
        .then( r => {
            res.json({message: 'A rendelést sikeresen frissítettük!'});
    });
});



app.listen(3000);