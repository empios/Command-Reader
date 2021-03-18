const fs = require('fs')
const readline = require('readline');

let memoryLastOutput = 0;
let variable = {
    name: null,
    value: 0
}
let objArr = [];

async function calculator(command, a, b) {
    let summary;
    switch (command){
        case "add":
            if (a === "$"){
                a = memoryLastOutput
            }
            if (b === "$"){
                b = memoryLastOutput
            }
            if(a.length === 1 && a.match(/[a-z]/i)){
                if(isNaN(objArr.find(variable => variable.name === a))){
                    if(objArr.find(variable => variable.name === a) === undefined){
                        return "error"
                    }
                    else {
                        a = objArr.find(variable => variable.name === a).value
                    }
                }
                else return "error"
            }
            else return "error"
            if(b.length === 1 && b.match(/[a-z]/i)){
                if(isNaN(objArr.find(variable => variable.name === b))){
                    if(objArr.find(variable => variable.name === b) === undefined){
                        return "error"
                    }
                    else {
                        b = objArr.find(variable => variable.name === b).value
                    }
                }
                else return "error"
            }
            else return "error"
            summary = Number(a) + Number(b);
            return summary
        case "sub":
            if (a === "$"){
                a = memoryLastOutput
            }
            if (b === "$"){
                b = memoryLastOutput
            }
            if(a.length === 1 && a.match(/[a-z]/i)){
                if(isNaN(objArr.find(variable => variable.name === a))){
                    if(objArr.find(variable => variable.name === a) === undefined){
                        return "error"
                    }
                    else {
                        a = objArr.find(variable => variable.name === a).value
                    }
                }
                else return "error"
            }
            else return "error"
            if(b.length === 1 && b.match(/[a-z]/i)){
                if(isNaN(objArr.find(variable => variable.name === b))){
                    if(objArr.find(variable => variable.name === b) === undefined){
                        return "error"
                    }
                    else {
                        b = objArr.find(variable => variable.name === b).value
                    }
                }
                else return "error"
            }
            else return "error"
            summary = Number(a) - Number(b);
            return summary
        case "div":
            if (a === "$"){
                a = memoryLastOutput
            }
            if (b === "$"){
                b = memoryLastOutput
            }
            if(a.length === 1 && a.match(/[a-z]/i)){
                if(isNaN(objArr.find(variable => variable.name === a))){
                    if(objArr.find(variable => variable.name === a) === undefined){
                        return "error"
                    }
                    else {
                        a = objArr.find(variable => variable.name === a).value
                    }
                }
                else return "error"
            }
            else return "error"
            if(b.length === 1 && b.match(/[a-z]/i)){
                if(isNaN(objArr.find(variable => variable.name === b))){
                    if(objArr.find(variable => variable.name === b) === undefined){
                        return "error"
                    }
                    else {
                        b = objArr.find(variable => variable.name === b).value
                    }
                }
                else return "error"
            }
            else return "error"
            summary = Number(a) / Number(b);
            if (summary === Infinity || isNaN(summary)){
                return "error"
            }
            return Math.floor(summary)
        case "mul":
            if (a === "$"){
                a = memoryLastOutput
            }
            if (b === "$"){
                b = memoryLastOutput
            }
            if(a.length === 1 && a.match(/[a-z]/i)){
                if(isNaN(objArr.find(variable => variable.name === a))){
                    if(objArr.find(variable => variable.name === a) === undefined){
                        return "error"
                    }
                    else {
                        a = objArr.find(variable => variable.name === a).value
                    }
                }
                else return "error"
            }
            else return "error"
            if(b.length === 1 && b.match(/[a-z]/i)){
                if(isNaN(objArr.find(variable => variable.name === b))){
                    if(objArr.find(variable => variable.name === b) === undefined){
                        return "error"
                    }
                    else {
                        b = objArr.find(variable => variable.name === b).value
                    }
                }
                else return "error"
            }
            else return "error"
            summary = Number(a) * Number(b);
            return summary
        case "set":
            if(b === "$") {
                if(Number.isInteger(memoryLastOutput)){
                    b = memoryLastOutput;
                }
                else return "error";
            }

            if(objArr.find(variable => variable.name === a)){
                if (Number.isInteger(b)){
                    variable.value = Number(b);
                }
                if(b.length === 1 && b.match(/[a-z]/i)){
                    let temp = objArr.find(variable => variable.name === b);
                    if(temp !== undefined) {
                        variable.value = temp.value;
                    }
                    else return "error"
                }
            }
            else {
                if(b.length === 1 && b.match(/[a-z]/i)){
                    let temp = objArr.find(variable => variable.name === b);
                    if(temp !== undefined) {
                        variable.value = temp.value;
                    }
                    else return "error"
                }
                else {
                        variable = {
                            name: a,
                            value: Number(b)
                        }
                        objArr.push(variable)
                }
            }
            return Number(b)
        default:
            return "error";
    }
}

async function readAnotherFile(reader){
    for await (const line of reader) {
        let splitArr = line.split(' ');
        if (splitArr !== undefined){
            if (splitArr[0] === "run") {
                if(await checkIfExists(splitArr[1]) === true){
                    await onPause(splitArr[1]);
                }
            }
            let output = await calculator(splitArr[0], splitArr[1], splitArr[2]);
            if(Number.isNaN(output)){
                memoryLastOutput = output
            }
            let string = "res: " + output + "\n"
            fs.appendFile("1.big.out", string, function (err) {
                console.log("No such file" + err)
            });
        }
    }
}
async function checkIfExists (path) {
    let check = false;
    let pathToFile = '/rekrutacja/' + path
    try {
        if (fs.existsSync(pathToFile)) {
            check = true
        }
    } catch(err) {
        console.error(err)
    }
    return check

}

async function onPause(path) {
    if(await checkIfExists(path) === true) {
        let pathToFile = '/rekrutacja/' + path
        let readStream = fs.createReadStream(pathToFile)
        const readInterface = readline.createInterface({
            input: readStream
        });
        await readAnotherFile(readInterface)
    }
}

async function writeOutput () {
    let path = process.argv
    let pathToFile = '/rekrutacja/' + path[2]
    let readStream = fs.createReadStream(pathToFile);
    const readInterface = readline.createInterface({
        input: readStream
    });
    for await (const line of readInterface) {
        let splitArr = line.split(' ');
        if (splitArr !== undefined) {
            if (splitArr[0] === "run") {
                await onPause(splitArr[1])
            } else {
                    let output = await calculator(splitArr[0], splitArr[1], splitArr[2]);
                    if(Number.isNaN(output)){
                        memoryLastOutput = output
                    }
                    let string = "res: " + output + "\n"
                    fs.appendFile("1.big.out", string, function (err) {
                        console.log("No such file " + err)
                    });
            }
        }
    }
}
writeOutput(process.argv)


