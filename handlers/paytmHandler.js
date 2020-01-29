const checksum_lib = require('../paytm/checksum/checksum');
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/payment', (req, res) => {
    let params = {
        "MID": process.env.PAYTM_MID,
        "WEBSITE": process.env.PAYTM_WEBSITE,
        "CHANNEL_ID": process.env.PAYTM_CHANNEL_ID,
        "INDUSTRY_TYPE_ID": process.env.PAYTM_INDUSTRYTYPE,
        "ORDER_ID": "ORD0005",
        "CUST_ID": "CUST0001",
        "TXN_AMOUNT": "2",
        "EMAIL": "javarep4199@gmail.com",
        "MOBILE_NO": "9819702550"
    };
    
    params['CALLBACK_URL'] = `http://localhost:3000/paytm/callback?orderId=${params.ORDER_ID}`;

    checksum_lib.genchecksum(params,process.env.PAYTM_MKEY,function(err,checksum){
        let txn_url = process.env.PAYTM_TXN_URL;

        let form_fields = "";
        for(x in params)
        {
            form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"'/>";
        }

        form_fields+="<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' />";

        var html = '<html><body><center><h1>Please wait! Do not refresh the page</h1></center><form method="post" action="'+txn_url+'" name="f1">'+form_fields +'</form><script type="text/javascript">document.f1.submit()</script></body></html>';
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.write(html);
        res.end();
    })
})

router.post('/callback', (req, res) => {
    const orderId = req.query.orderId;
    console.log(orderId);
    let params = {
        "MID": process.env.PAYTM_MID,
        "ORDER_ID":orderId
    };
    let body = JSON.stringify(params);
    fetch('https://securegw-stage.paytm.in/order/status', {
        method: 'POST',
        body
    }).then(response => response.json())
    .then(json => res.json(json));
})

module.exports = router;