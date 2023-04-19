const fs = require('fs');
require('dotenv').config();

const account_id = process.env.account_id;
const TOKENs = process.env.TOKENs;
const URLs = process.env.URLs;
const NEWS = process.env.NEWS;
const DEV_TOKENs = process.env.DEV_TOKENs;
const DEV_URLs = process.env.DEV_URLs;
const DEV_NEWS = process.env.DEV_NEWS;

const tomlFileContent = `name = "api"
main = "src/index.js"

workers_dev = true
account_id = "${account_id}"
route = "api.rgpvnotes.in/*"
compatibility_date = "2021-09-24"
kv_namespaces = [
    { binding = "TOKENs", id = "${TOKENs}" },
    { binding = "URLs", id = "${URLs}" },
    { binding = "NEWS", id = "${NEWS}" }
]

[env.dev]
kv_namespaces = [
    { binding = "TOKENs", id = "${DEV_TOKENs}", preview_id = "${DEV_TOKENs}" },
    { binding = "URLs",id = "${DEV_URLs}", preview_id = "${DEV_URLs}" },
    { binding = "NEWS", id = "${DEV_NEWS}", preview_id = "${DEV_NEWS}" }
]`;

// create slug file
fs.writeFile('wrangler.toml', tomlFileContent, function (err) {
    if (err) throw err;
    console.log('File written successfully.');
});
