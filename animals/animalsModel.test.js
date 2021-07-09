const db = require("../db/dbconfig");
const Animals = require("./animalsModel");
const constants = require("./testConstants");

//sample animals to be used in tests
function getTestAnimals() {
  const animal1 = {
    type: "dog",
    pic: constants.pic1,
    date_created: "06-20-2021",
    description:
      "A very good dog. Wonderful with children and other animals. Looking for his forever home.",
    news_item: constants.news1,
  };

  const animal2 = {
    type: "cat",
    pic: constants.pic1,
  };
}
