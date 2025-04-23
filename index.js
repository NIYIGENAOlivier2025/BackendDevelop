const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample in-memory data store
let items = [];

// CREATE (POST) - Add a new item
app.post('/items', (req, res) => {
    const { id, name } = req.body; // Destructure id and name from request body
    if (items.find(item => item.id === id)) {
        return res.status(400).json({ error: 'Item with this ID already exists' });
    }
    if (!id || !name) {
        return res.status(400).json({ error: 'Item ID and name are required' });
    }
    const newItem = { id, name }; // Create new item with ID and name
    items.push(newItem);
    res.status(201).json(newItem);
});

// READ (GET) - Get all items
app.get('/items', (req, res) => {
    res.json(items);
});

// READ (GET) - Get a single item by ID
app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    const item = items.find(item => item.id == id); // Find by ID
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
});
    
// UPDATE (PUT) - Update an existing item by ID
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body; // Destructure name from request body
    const index = items.findIndex(item => item.id == id); // Find index by ID

    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    if (!name) {
        return res.status(400).json({ error: 'Item name is required' });
    }

    // Update the item
    items[index].name = name; // Update the name while keeping the ID unchanged
    res.json(items[index]);
});

// DELETE - Remove an item by ID
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const index = items.findIndex(item => item.id == id); // Find index by ID
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    items.splice(index, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});