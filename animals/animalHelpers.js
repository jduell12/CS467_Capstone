module.exports = {
    validateAnimal,
    validateAnimalEdit
}

function validateAnimal(req, res, next) {
    let animal = req.body;
    if (
        animal.description &&
        animal.news_item &&
        animal.pic 
    ) {
        if(!animal.date_created){
            animal.date_created = new Date();
        }
        
        if (
            typeof animal.description !== 'string'
            || typeof animal.news_item !== 'string'
            || typeof animal.pic !== 'string' || (typeof animal.date_created !== 'string' && !(animal.date_created instanceof Date))
        ) {
            return res.status(400).json({
                error:
                    "The request object attributes have one or more of the wrong type",
                stack: "Animal helpers line 36",
            });
        } else {
            next();
        }
    } else {
        return res.status(400).json({
            error: 'The request object is missing one or more required attributes',
            stack: "Animal helpers line 44"
        })
    }
}

function validateAnimalEdit(req, res, next) {
    let animal = req.body;

    if (
        animal.description ||
        animal.news_item ||
        animal.pic || animal.date
    ) {
        if (
            (animal.description && typeof animal.description !== 'string')
            || (animal.news_item && typeof animal.news_item !== 'string')
            || (animal.pic && typeof animal.pic !== 'string') ||(animal.date && !(animal.date instanceof Date))
        ) {
            return res.status(400).json({
                error:
                    "The request object attributes have one or more of the wrong type",
                stack: "Animal helpers line 65",
            });
        } else {
            next();
        }
    } else {
        return res.status(400).json({
            error: 'The request object is missing one or more required attributes',
            stack: "Animal helpers line 73"
        })
    }
}