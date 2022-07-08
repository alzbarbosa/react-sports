const Place = require('../models/placeModel')
const { errorHandler } = require('../middleware/errorHandler')

//@route GET /api/places @access Private
const getAllPlaces = async (req, res, next) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (err) {
    next(err);
  }
};

const getPlaceById = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id)

    if (!place) {
        return next(errorHandler(404, "Place not found!"));
    }
    
    if (!req.user) {
        return next(errorHandler(401, "User not found!"));
    }
    
    // Checking if logged user matches with the creator's place
    if(place.creator.toString() !== req.user.id) {
        return next(errorHandler(401, "'User not authorized'"));
    }

    res.status(200).json(place)

  } catch (err) {
    next(err);
  }
};

//@route POST /api/places @access Private
const setPlace= async (req, res, next) => {
  const { title, description, image, address} = req.body;
  
  try {
    const newPlace = await Place.create({
        title,
        description,
        address,
        image,
        creator: req.user.id
      }
        );
    res.status(200).json(newPlace);
  } catch (err) {
    next(err);
  }
};
//@route PATCH /api/places @access Private
const updatePlace = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id)

    if (!place) {
        return next(errorHandler(404, "Place not found!"));
    }
    
    if (!req.user) {
        return next(errorHandler(401, "User not found!"));
    }   

    const updatedPlace = await Place.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}
        )
    res.status(200).json(updatedPlace)
  } catch (err) {
    next(err);
  }
};

//@route DELETE /api/orders @access Private
const deletePlace= async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id)

    if (!place) {
        return next(errorHandler(404, "Place not found!"));
    }
    
    if (!req.user) {
        return next(errorHandler(401, "User not found!"));
    }
    
    // Checking if logged user matches with the creator's place
    if(place.creator.toString() !== req.user.id) {
        return next(errorHandler(401, "'User not authorized'"));
    }

    await order.remove()

    res.status(200).json({id: req.params.id})

  } catch (err) {
    next(err);
  }
};

module.exports = {getAllPlaces, setPlace, updatePlace, deletePlace, getPlaceById}


