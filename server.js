const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Parse incoming JSON requests

// Static objects to keep data in memory
let todos = {};
let categories = {};

// Generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Endpoints

// GET TODOS - Return all TODOs
app.get('/todos', (req, res) => {
    res.json(Object.values(todos));
});

// POST TODO - Create a new TODO
app.post('/todos', (req, res) => {
    const { title, description, category } = req.body;
    if (!title || !category) {
        return res.status(400).json({ error: 'Title and category are required' });
    }
    const id = generateId();
    todos[id] = { id, title, description, category };
    res.status(201).json(todos[id]);
});

// PUT TODO - Update a TODO
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, category } = req.body;

    if (!todos[id]) {
        return res.status(404).json({ error: 'TODO not found' });
    }
    todos[id] = { id, title: title || todos[id].title, description: description || todos[id].description, category: category || todos[id].category };
    res.json(todos[id]);
});

// DELETE TODO - Delete a TODO
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    if (!todos[id]) {
        return res.status(404).json({ error: 'TODO not found' });
    }
    delete todos[id];
    res.json({ message: 'TODO deleted' });
});

// GET ALL TODOS for a CATEGORY
app.get('/todos/category/:category', (req, res) => {
    const { category } = req.params;
    const todosByCategory = Object.values(todos).filter(todo => todo.category === category);
    res.json(todosByCategory);
});

// GET CATEGORIES - Return all categories
app.get('/categories', (req, res) => {
    res.json(Object.keys(categories));
});

// POST CATEGORIES - Create a new category
app.post('/categories', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
    }
    if (categories[name]) {
        return res.status(400).json({ error: 'Category already exists' });
    }
    categories[name] = { name };
    res.status(201).json({ message: 'Category created', name });
});

// PUT CATEGORIES - Update an existing category
app.put('/categories/:category', (req, res) => {
    const { category } = req.params;
    const { newName } = req.body;

    if (!categories[category]) {
        return res.status(404).json({ error: 'Category not found' });
    }
    if (!newName) {
        return res.status(400).json({ error: 'New category name is required' });
    }
    categories[newName] = { name: newName };
    delete categories[category];

    // Update todos with the new category name
    Object.values(todos).forEach(todo => {
        if (todo.category === category) {
            todo.category = newName;
        }
    });

    res.json({ message: 'Category updated', newName });
});

// DELETE CATEGORIES - Delete an existing category
app.delete('/categories/:category', (req, res) => {
    const { category } = req.params;

    if (!categories[category]) {
        return res.status(404).json({ error: 'Category not found' });
    }

    // Remove todos associated with this category
    Object.keys(todos).forEach(id => {
        if (todos[id].category === category) {
            delete todos[id];
        }
    });

    delete categories[category];
    res.json({ message: 'Category and associated todos deleted' });
});

// Start the server
app.listen(port, () => {
    console.log(`TODO app listening at http://localhost:${port}`); // 3000
});