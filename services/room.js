const server = require('../server')
var sql = require("mssql");

function getRooms(res) {
    try {
        const query = `select r.RoomName, (select p.RoomName from Room p where p.Id=r.ParentId) as ParentRoom 
                    from Room r`;
        const rs = server.executeQuery(query, res, null);
        return rs;
    }
    catch(e) {
        console.log(e);
    }
}
module.exports.getRooms = getRooms;

function insertRooms(res, roomName, parentId) {
    try {
        const query = `insert into Room(RoomName, ParentId) value (@roomName, @parentId)
                    from Room r`;
        var params = [
            { name: 'roomName', sqltype: sql.NVarChar, value: roomName},
            { name: 'parentId', sqltype: sql.BigInt,  value: parentId},
            ];
        const rs = server.executeQuery(query, res, params);
        return rs;
    }
    catch(e) {
        console.log(e);
    }
}
module.exports.insertRooms = insertRooms;