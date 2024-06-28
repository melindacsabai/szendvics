const fs = require('fs/promises');

class JSONModifier {

    filePath;
    jsonData;

    constructor(path){
        this.filePath = path;
    }

    async read(filePath = this.filePath){
        const fileData = await fs.readFile(filePath);
        return this.jsonData = JSON.parse(fileData);
    }

    async write(data){
        fs.writeFile(this.filePath, JSON.stringify(data, null, "    "));
        return data
    }
    
    async update(data){     
        await fs.writeFile(this.filePath, JSON.stringify(data, null, "    "));
    }
}

module.exports = { JSONModifier };
