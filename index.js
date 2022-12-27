const express = require('express')
const app = express()
const port = 3000
const path = require('path')


app.get("/auriculares", (req, res) => {
    res.sendFile(path.resolve(__dirname, './auriculares/auriculares.html' ));
});

app.get("/cargadores",(req,res) =>{
    res.sendFile(path.resolve(__dirname, './cargadores/cargadores.html'));
});

app.use("/", express.static("./"));

app.listen(port, () => {
    console.log(`App corriendo en el puerto ${port}`)
});
