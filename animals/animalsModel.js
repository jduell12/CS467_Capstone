const db = require("../db/dbconfig");

module.exports = {
  addAnimal,
  editAnimal,
  getAnimalBy,
  deleteAnimal,
};

//adds an animal to the database
function addAnimal(animal) {
  return db("animals").insert(animal, "animal_id");
}

//edits animal with the given id
function editAnimal(animal_id, animalEdits) {
  return db("animals")
    .where({ animal_id })
    .update(animalEdits)
    .then((count) => count);
}

//returns animal object corresponding the the given filter and filter value
async function getAnimalBy(filterName, filterValue) {
  switch (filterName) {
    case "animal_id":
      return db("animals").where({ animal_id: filterValue });
    case "type":
      return db("animals").where({ type: filterValue });
    case "breed":
      return db("animals").where({ breed: filterValue });
    case "disposition":
      return db("animals").where({});
  }
}

//removes aniaml with given id from database
function deleteAnimal(animal_id) {
  return db("animals").del().where({ animal_id });
}
