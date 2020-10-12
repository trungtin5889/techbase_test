var room = require('../services/customer')

function getCustomers(req, res) {
    const rs = room.getCustomers(res);
    if (rs.length == 0) {
        return res.status(400).json({ message: 'Result is null' });
    }
    return res.status(200).json(rs);
}
module.exports.getCustomers = getCustomers;