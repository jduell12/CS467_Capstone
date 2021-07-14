const router = require("express").Router();
const Animals = require('./animalsModel');
const helpers = require('./animalHelpers');
const atob = require('atob')

router.get('/', (req, res) =>{
    Animals.getAllAnimals().then(animals => {
        res.status(200).json({animals})
    }).catch(err => {
        res.status(500).json({
            error: err.message, 
            errorMessage: 'Could not retrieve animals',
            stack: 'Animal Router line 13'
        })
    })
})

router.get('/:filter_name/:filter_value', (req, res) => {
    let filter = req.params.filter_name;
    let value = req.params.filter_value;
    Animals.getAnimalBy(filter, value).then(animalArr => {
        res.status(200).json({animalArr})
    }).catch(err => {
        res.status(500).json({
            error: err.message,
            errorMessage: 'Can get get the animal from the database',
            stack: 'Animal router line 27'
        })
    })
})

router.put('/:animal_id', helpers.validateAnimalEdit, (req, res) =>{
    Animals.getAnimalBy('animal_id', req.params.animal_id).then(animalArr => {
        let animal = animalArr[0]
        if(animal){
            Animals.editAnimal(req.params.animal_id, req.body).then(count => {
                res.status(200).json({message: `Edited ${count} animal(s) successfully`})
            }).catch(err => {
                res.status(500).json({
                    error: err.message,
                    errorMessage: "Could not edit animal in database",
                    stack: "Animals Router line 42"
                })
            })
        } else {
            res.status(404).json({
                message: "No animal with that id",
                stack: 'Animals Router line 48'
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message, 
            errorMessage: "Could not retrieve animal from database",
            stack: "Animals Router line 55"
        })
    })
})

router.post('/', helpers.validateAnimal, (req,res) =>{
    Animals.addAnimal(req.body).then(animalArr => {
        res.status(201).json({animal: animalArr[0]})
    }).catch(err => {
        res.status(500).json({
            error: err.message,
            errorMessage: "Could not add adnimal to database",
            stack: "Animals Router line 67"
        })
    })
})

module.exports = router;
