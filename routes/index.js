/**
 * This module connects rendering modules to routes
 */

const express = require('express')
const router = express.Router()

const { catchErrors } = require('../handlers/errorHandlers')

const { getRoom } = require('../controller/room')

// Imprint route
router.get('/room', catchErrors(getRoom))

module.exports = router
