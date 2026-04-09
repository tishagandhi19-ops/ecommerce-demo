const imageKit = require("@imagekit/nodejs")

const client = new imageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function uploadFile(file){
    const result = await client.files.upload({
        file: file,
        fileName: "product_" + Date.now(),
    });

    return result;
}

module.exports = {uploadFile}
//tisha atlu badhi var na lage ek var terminal bandh kari ne me try karu ?ha