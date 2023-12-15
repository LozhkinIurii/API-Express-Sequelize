const { Router } = require('express');
const app = Router();
const { getAllPhones, findPhones, getPhoneById, createPhone, patchPhone, putPhone, deletePhone } = require('../controllers/phoneController');


app.get('/api/phones', getAllPhones);
app.get('/api/phones/search', findPhones)
app.get('/api/phones/:id', getPhoneById);
app.post('/api/phones', createPhone);
app.patch('/api/phones/:id', patchPhone);
app.put('/api/phones/:id', putPhone)
app.delete('/api/phones/:id', deletePhone);

module.exports = app;
