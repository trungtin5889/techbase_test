const server = require('../server')
const sql = require("mssql");

function getRooms(res, roomName) {
    try {
        let query = `select r.RoomName, (select p.RoomName from Room p where p.Id=r.ParentId) as ParentRoom 
                    from Room r where 1=1 `;
        if (roomName) {
            query += `and r.RoomName like '%@roomName%'`
        }
        var params = [
            { name: 'roomName', sqltype: sql.NVarChar, value: roomName }           
        ];
        const rs = server.executeQuery(query, res, params);
        return rs;
    }
    catch(e) {
        console.log(e);
        throw e;
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
        return true;
    }
    catch(e) {
        console.log(e);
        throw e;
    }
}
module.exports.insertRooms = insertRooms;