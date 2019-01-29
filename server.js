const express = require('express')
const { Dinosaur, Flavor } = require('./models')
const app = express()

app.get('/', (req, res) => {
    res.send('index!')
})

// Create a route that displays all dinos
app.get('/dinos', async (req, res) => {
	try{
		const dinosaurs = await Dinosaur.findAll(); 
		let dinosaurNames = `<strong>Dinosaurs</strong><br />`;

		for(dinosaur of dinosaurs){
			dinosaurNames += `${dinosaur.name}<br />`;
		}

		res.send(dinosaurNames);
	}
	catch(e){
		console.log(e); 
		res.json({error: e}); 
	}
})


// Create a route that displays all flavors
app.get('/flavors', async (req, res) => {
	try{
		const flavors = await Flavor.findAll(); 
		let flavorNames = `<strong>Flavors</strong><br />`;

		for(flavor of flavors){
			flavorNames += `${flavor.name}<br />`;
		}

		res.send(flavorNames);
	}
	catch(e){
		console.log(e); 
		res.json({error: e}); 
	}
})


// Create a route that displays a single dino by id Ex: /dinos/id/1 should display json of the dino with an id of 1
app.get('/dinos/id/:id', async (req, res) => {
	try{
		const dinoId = req.params.id
		const dino = await Dinosaur.findOne({
			where:{
				id: dinoId
			}
		})

		res.json({dinoById: dino});
	}
	catch(e){
		console.log(e); 
		res.json({error: e}); 
	}
})


// Create a route that displays a single dino by name Ex: /dinos/name/barney should display json of barney the dinosaur
app.get('/dinos/name/:name', async (req, res) => {
	try{
		const dinoName = req.params.name;
		const dino = await Dinosaur.findOne({
			where: {
				name: dinoName
			}
		})

		if(dino !== null){
			res.json({dinoByName: dino})
		}
		else{
			res.send('That\'s not a dinosaur in the database or not a dinosaur at all');
		}
	}
	catch(e){
		console.log(e); 
		res.json({error: e}); 
	}
})


// Create a route that displays a single dino by id Ex: /flavors/id/1 should display json of the flavor with an id of 1
app.get('/flavors/id/:id', async (req, res) => {
	try{
		const flavorId = req.params.id; 
		const flavor = await Flavor.findOne({
			where:{
				id: flavorId
			}
		})

		res.json({flavorById: flavor}); 
	}
	catch(e){
		console.log(e); 
		res.json({error: e}); 
	}
})


// Create a route that displays a single dino by name Ex: /flavors/name/lemon should display json of the lemon flavor
app.get('/flavors/name/:name', async (req, res) => {
	try{
		const flavorName = req.params.name; 
		const flavor = await Flavor.findOne({
			where: {
				name: flavorName
			}
		})

		res.json({flavorByName: flavor});
	}
	catch(e){
		console.log(e); 
		res.json({error: e});
	}
})

app.listen(3000, () => {
    console.log(`running on port 3000!`)
})