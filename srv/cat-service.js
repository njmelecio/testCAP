const cds = require("@sap/cds"); 
const { getDestination } = require('@sap-cloud-sdk/connectivity'); 
const { createLogger } = require('@sap-cloud-sdk/util');
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client'); 
const destName = "RAPIDAPI";

module.exports = cds.service.impl(async (service) => { 
    const db = await cds.connect.to("db"); 
    service.on('checkStock', async (req, res) => { 
        try { 
            let sQuery = `SELECT * FROM MY_BOOKSHOP_BOOKS WHERE STOCK > 100` 
            const oResult = await db.run(sQuery); 
            console.log(oResult) //next logic here 
            return oResult 
        } catch (error) { 
            req.reject(500, 'Internal Server Error') 
        } 
    }); 

    service.on('getCategories', async (req, res) => { 
        try { 
            const dest = await getDestination({
                 destinationName: destName, useCache: true 
            }) 
            if (!dest) throw `Destination ${destName} not found` 
            const fullPath = `${dest.url}/catalog/categories` 
            await executeHttpRequest( dest, { 
                url: fullPath, 
                method: 'get', 
                headers: { } 
            }, { fetchCsrfToken: false } )
            .then((response) => { 
                req.reply(response.data); 
            })
            .catch((error) => { 
                console.log(error); 
            }); 
        } catch (error) { 
            console.log(error); 
            req.reject(500, "Internal Server Error") 
        } 
    });
})

