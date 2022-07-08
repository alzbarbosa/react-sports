const express = require('express')
const router = express.Router()

const {getAllPlaces, setPlace, updatePlace, deletePlace, getPlaceById} = require('../controllers/placesControllers')

const {authHandler} = require('../middleware/authHandler')

router.route('/').post(authHandler, setPlace).get(getAllPlaces)
router.route('/:id').patch(authHandler, updatePlace).delete(authHandler, deletePlace).get(authHandler, getPlaceById)

module.exports = router