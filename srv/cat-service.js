const cds = require("@sap/cds"); 
const { getDestination } = require('@sap-cloud-sdk/connectivity'); 
const { createLogger } = require('@sap-cloud-sdk/util');
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client'); 
const destName = "RAPIDAPI";

module.exports = cds.service.impl(async (service) => { 
    const db = await cds.connect.to("db"); 
    const { Books, Authors } = db.entities;

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

    service.on('samplePost', async (req, res) => {
        return req.data.lastName;
    });

    service.on('updateAuthor', async (req, res) => {
        // await db.run(SELECT.from (Books,1));
        try {
            await db.run(UPDATE (Books, 1) .with ({
                title: 'APIBook',
                stock: {'-=': 1}
            }));
    
            await db.run(UPDATE (Authors, 1) .set ({
                firstname: req.data.firstName,
                lastname: req.data.lastName
            }));

            return "update success!";
        } catch(e){
            return "error!";
        }
    });
})

