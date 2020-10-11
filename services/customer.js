const server = require('../server')

function getCustomers(res) {
    try {
        const query = `select c.FullName, c.Code
                    from Customer c 
                    inner join TeamCustomer tc on tc.CustomerId=c.ID
                    inner join Team t on t.ID=tc.TeamId
                    `;
        const rs = server.executeQuery(query,res,null);
        return rs;
    }
    catch(e) {
        console.log(e);
    }
}
module.exports.getCustomers = getCustomers;