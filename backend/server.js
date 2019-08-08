const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
var Cloudant = require('@cloudant/cloudant');


const port = process.env.PORT || 4000;
const cloudant = Cloudant({
    url:'https://fed93468-ff15-46e8-94a5-e16c1392397b-bluemix.cloudantnosqldb.appdomain.cloud',
    plugins:{
        iamauth:{
            iamApiKey:'JcGrhFRmRxeTnpFz2Dse4UJrBUhrQulqlPzuc3GIo3R4',
        }
    }
}, async(err, client) => {
    // called after db connection is ready
    const dbList = await client.db.list();
    const dbExists = dbList.indexOf('db_test') !== -1;
    if(!dbExists){
        client.db.create('db_test')
    }

});

app.use(cors());
app.use(bodyParser.json());

app.use(express.static( path.join(__dirname,'..','my-app','build') ));

let todos = [];

app.get('/',(req,res) => {
    res.send('Hello from server')
})
app.post('/add',async (req,res) => {
    const todo = req.body.todo;
    todos.push(todo);
    console.log('\ntodos',todos)
    await cloudant.db.use('db_test').insert(todo);

    res.send({succes:true})
})
app.post('/delete/:id',(req,res) => {
    const id = req.params.id;
    let index = todos.findIndex( x => x.id === id);
    // remove 1 elem from index
    todos.splice(index, 1);
    console.log('\ntodos',todos)
    res.send({success: true, deletedId: id})
})
app.post('/checked/:id',(req,res) => {
    const id = req.params.id;
    let index = todos.findIndex( x => x.id === id);
    todos[index] = {
        ...todos[index],
        checked: !todos[index].checked
    }
    console.log('\ntodos',todos)
    res.send({success:true})
})
app.get('/getTodos', async(req,res) => {
    // const dbTodos = await cloudant.db.use('db_test').find({selector:{}});
    res.send({todos})
  
})

app.listen(port, (req, res) => {
    console.log('Server is running')
})