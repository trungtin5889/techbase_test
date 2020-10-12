/**
 * This module connects rendering modules to routes
 */

const express = require('express')
const router = express.Router()

const { catchErrors } = require('../handlers/errorHandlers')

const room = require('../controller/room')
const customer = require('../controller/customer')

// Imprint route
router.get('/room', catchErrors(room.getRooms))
router.post('/room', catchErrors(room.insertRooms))
router.get('/customer', catchErrors(customer.getCustomers))

module.exports = router
