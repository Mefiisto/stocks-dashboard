const express = require('express');
const bodyPareser = require('body-parser');
let requestData = ''; 

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyPareser.json());
app.use(bodyPareser.urlencoded({ extented: true }));


// Request to IEX Cloud - begin
const moment = require('moment');
const crypto = require('crypto');
const https  = require('https');

const method = 'GET'
const host = 'cloud.iexapis.com'

const access_key = 'pk_YOUR_PUBLIC_KEY' // public key
const secret_key = 'sk_YOUR_PRIVATE_KEY'// secret key for public key
const canonical_querystring = 'token=' + access_key;
const canonical_uri = '/beta/tops/last'

var ts = moment.utc();
const iexdate = ts.format("YYYYMMDDTHHmmss") + 'Z';
const datestamp = ts.format("YYYYMMDD");

function sign(secret, data) {
    return crypto.createHmac('sha256', secret).update(data, "utf8").digest('hex');
};

function getSignatureKey(key, datestamp) {
    const signedDate = sign(key, datestamp);
    return sign(signedDate, 'iex_request');
}

if ( ! access_key || ! secret_key ) {
    console.warn('No access key is available.')
    process.exit(1);
}

const canonical_headers = 'host:' + host + '\n' + 'x-iex-date:' + iexdate + '\n';
const signed_headers = 'host;x-iex-date'
const payload = '';
const payload_hash = crypto.createHash('sha256').update(payload).digest('hex');
const canonical_request = method + '\n' + canonical_uri + '\n' + canonical_querystring + '\n' + canonical_headers + '\n' + signed_headers + '\n' + payload_hash;
const algorithm = 'IEX-HMAC-SHA256';
const credential_scope = datestamp + '/' + 'iex_request';
const string_to_sign = algorithm + '\n' +  iexdate + '\n' +  credential_scope + '\n' + crypto.createHash('sha256').update(canonical_request, "utf8").digest('hex');
const signing_key = getSignatureKey(secret_key, datestamp)
const signature = crypto.createHmac('sha256', signing_key).update(string_to_sign, "utf8").digest('hex');
const authorization_header = algorithm + ' ' + 'Credential=' + access_key + '/' + credential_scope + ', ' +  'SignedHeaders=' + signed_headers + ', ' + 'Signature=' + signature
const headers = {'x-iex-date':iexdate, 'Authorization':authorization_header}

const options = {
    host: host,
    port: 443,
    path: canonical_uri + "?" + canonical_querystring,
    method: 'GET',
    headers: headers
};

const req = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
    	requestData = requestData.concat(chunk);
    });
});
req.end();
// Request to IEX Cloud - End


// Giving answer to Client
app.get('/server/iexCloud', (request,resp) => {
	resp.send(requestData);
});
app.listen(port, () => console.log(`Listening on port ${port}`));
