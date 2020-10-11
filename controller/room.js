var room = require('../services/room')

module.exports.getRooms = function (req, res) {
    const rs = room.getRooms(res);
    if (rs.length == 0) {
        return res.status(400).json({ message: 'Result is null' });
    }
    return res.status(200).json(rs);
}

module.exports.insertRooms = function (req, res) {
    const roomName = req.body.RoomName;
    let roomParent = req.body.RoomParent;
    if (!roomParent) {
        roomParent = 0;
    }
    const rs = room.insertRooms(res, roomName, roomParent);
    return res.json(rs);
}
