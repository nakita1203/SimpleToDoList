const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const PORT = 5000;

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb+srv://nakitarahma:PraktikumSBD@netlab.y5rj4cx.mongodb.net/?retryWrites=true&w=majority&appName=Netlab');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
    console.log('Connected to MongoDB NakitaRahma');
});

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Todo = mongoose.model('Todo', todoSchema);

//Create a new to-do
app.post('/todos', async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            description: req.body.description,
        });
        await todo.save();
        res.status(201).send(todo);
    } catch (error) {
        res.status(400).send(error);
    }
});

//Get all to-dos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(201).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Internal Error' });
    }
});

//Delete a to-do by ID
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Internal Error' });
    }
});

//Update a to-do by ID
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description }, {new: true });
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Internal Error' });
    }
})

app.listen(PORT, () => console.log(`Server started at port:${PORT}`));
