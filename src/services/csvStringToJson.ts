export function csvStringToJson(csvString: string): object[] {
    const lines = csvString.split('\n');
    const headers = lines[0].split(',');

    const result = [];

    for (let i = 1; i < lines.length-1; i++) {
        const obj:any = {};
        const currentLine = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            if (headers[j] === "") {
                break;
            }
            obj[headers[j]] = currentLine[j];
        }
        if(obj !== "") {
            result.push(obj);
        }
        
    }

    return result;
}