const router = require("express").Router();
const Animals = require('./animalsModel');
const Dispositions = require('../dispositions/dispositionsModel')
const helpers = require('./animalHelpers');
const atob = require('atob')

router.get('/', (req, res) =>{
    Animals.getAllAnimals().then(animals => {
        animals.forEach(animal => {
            animal.pic = atob(animal.pic)
        })
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
        animalArr.forEach(animal => {
            animal.pic = atob(animal.pic)
        })
        res.status(200).json({animalArr})
    }).catch(err => {
        res.status(500).json({
            error: err.message,
            errorMessage: 'Can get get the animal from the database',
            stack: 'Animal router line 27'
        })
    })
})

//Edits animal's dispositions
router.put('/:animal_id/disposition/:disposition_id', async (req, res) =>{
    let disposition = req.body.disposition;
   
    if(disposition ){
        if(typeof disposition === 'string'){
            let editObj = {
                animal_id: req.params.animal_id,
                disposition_id: req.params.disposition_id,
                disposition
            }
            Dispositions.editAnimalDispositions(editObj).then(count => { 
                 res.status(204).end()
            }).catch(err => {
                 res.status(500).json({
                     error: err.message, 
                     errorMessage: "Could not edit animal disposition",
                     stack: "Animals Router line 55"
                 })
            })
        }else {
            res.status(400).json({
                error:
                    "The request object attributes have one or more of the wrong type",
                stack: "Animal router line 63",
            });
        }
    }else {
        res.status(400).json({
            error:
                "The request object is missing one or more required attributes",
            stack: "Animal router line 70",
        });
    }
})

//Edits animal base attributes: 
// pic, date_created, description, news_item
router.put('/:animal_id', helpers.validateAnimalEdit, (req, res) =>{
    let animal_edits = req.body

    Animals.getAnimalBy('animal_id', req.params.animal_id).then(animalArr => {
        let animal = animalArr[0]
        if(animal){
            if(animal_edits.disposition){
                //edit animal dispositions
                delete animal_edits.disposition
            }

            Animals.editAnimal(req.params.animal_id, animal_edits).then(count => {
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
    let animal = req.body 

    Animals.addAnimal(animal).then(animalArr => {
        res.status(201).json({animal: animalArr[0]})
    }).catch(err => {
        res.status(500).json({
            error: err.message,
            errorMessage: "Could not add animal to database",
            stack: "Animals Router line 76"
        })
    })
})

router.delete('/:animal_id', (req, res) => {
    let animal_id = req.params.animal_id
    Animals.getAnimalBy('animal_id', animal_id).then(animalArr => {
        if(animalArr.length === 1){
            Animals.deleteAnimal(animal_id).then(count => {
                res.status(200).json({message: `${count} deleted successfully`})
            }).catch(err => {
                res.status(500).json({
                    error: err.message,
                    errorMessage: "Could not delete animal by their id",
                    stack: 'Animal router line 82'
                })
            })
        } else {
            res.status(404).json({message: 'No animal with that id was found'})
        }
    }).catch (err => {
        res.status(500).json({
            error: err.message,
            errorMessage: "Could not get animal by their id",
            stack: 'Animal router line 92'
        })
    })
})

module.exports = router;
