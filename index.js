const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const app = express();
const cors = require('cors');
const schema = require('./schema/graphqlSchema');
//allow cross-origin requests
app.use(cors());


mongoose.connect('mongodb://rafae:meh169222@ds057528.mlab.com:57528/retroapp')

app.use(bodyParser.json())
app.use(require('./routes/api'));


app.use('/graphql',graphqlHTTP({
    schema ,
    graphiql : true
}))
const port = process.env.PORT || 5000;
app.listen(port,function() {
    console.log(`Sever is runing port ${port}`)
})