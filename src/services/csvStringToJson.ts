export function csvStringToJson(csvString: string): object[] {
    const lines = csvString.split('\n');
    const headers = lines[0].split(',').map((header: string) => header.trim());
    const result = [];

    for (let i = 1; i < lines.length-1; i++) {
        const obj:any = {};
        const currentLine = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            if (headers[j] === "" || headers[j] === undefined) {
                break;
            }
            obj[headers[j]] = currentLine[j].trim();
        }
        if(obj !== "") {
            result.push(obj);
        }
        
    }

    return result;
}