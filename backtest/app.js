const express = require('express'); 

const app = express(); 
const PORT = 3000; 

app.use(express.json()); 
app.post('/', (req, res)=>{ 
	const {name} = req.body; 
	
	res.send(`Welcome ${name}`); 
}) 

app.get('/hello', (req, res)=>{ 
    res.set('Content-Type', 'text/html'); 
    res.status(200).send("Hello from backend!"); 
}); 

app.get('/all', (req, res) => {
    const fruits = require('./data/fruits.json');

    res.json(fruits.fruits);
});

app.get('/cities', (req, res) => {
    const cities = require('./data/cities.json');

    res.json(cities.cities);
});

app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
);
