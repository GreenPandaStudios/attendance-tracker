import { IPrivateAttendanceInfo, IStudent, IAttendanceInfo } from "../types/attendanceTypes";
import { SHA256 } from 'crypto-js';
import { csvStringToJson } from "./csvStringToJson";


export async function fetchPrivateInfo(password: string, student: IStudent): Promise<IPrivateAttendanceInfo | undefined> {
    const r = await fetch("privateInfo.csv")
    const text = await r.text();

    // This will come in like this:
    // "firstName,lastName,improvedAttendance"
    // "John,Doe,TRUE"
    // "Jane,Smith,FALSE"
    const attendanceInfoArray = csvStringToJson(text) as object[];

    // generatePassCodes()
    
    const hashedPassword = hash((student.firstName + student.lastName).toUpperCase() + password);
    const singleRow: object | undefined = attendanceInfoArray.find((a:any) =>
         a["passwordHash"] === hashedPassword
    );

    if (singleRow === undefined) {
        return undefined;
    }

    let attendanceInfo: IAttendanceInfo[] = [];

    Object.keys(singleRow).forEach(key => {
        if (key !== "passwordHash") {
            attendanceInfo.push({
                date: key,
                attendancePercentage: (singleRow as any)[key]
            })
        }
    })

    return {
        attendanceInfo
    }
}

async function generatePassCodes() {
    const r = await fetch("http://localhost:3000/publicinfo.csv")
    const text = await r.text();

    // This will come in like this:
    // "firstName,lastName,improvedAttendance"
    // "John,Doe,TRUE"
    // "Jane,Smith,FALSE"
    const attendanceInfoArray = csvStringToJson(text).map((json: any) => {
        const passCode = Math.random().toString(36).substring(4, 10);
        return ({
            firstName: json["firstName"],
            lastName: json["lastName"],
            passCode:  passCode,
            passwordHash:  hash((json["firstName"] + json["lastName"]).toUpperCase() +  passCode)
        })});
    let string = 'firstName,lastName,passCode,passwordHash\r\n';
    attendanceInfoArray.forEach(info => {
        string += `${info.firstName},${info.lastName},${info.passCode},${info.passwordHash}\r\n`
    });
}

function hash(input: string): string {
    const hash = SHA256(input);
    return hash.toString(CryptoJS.enc.Hex);
}

/*
const privateAttendanceInfoArray: IPrivateAttendanceInfo[] = [
    {
        passwordHash: 'JOHNDOE1',
        attendanceInfo: [
            { date: '2024-05-01', attendancePercentage: 90 },
            { date: '2024-05-02', attendancePercentage: 95 },
            // Add more attendance info objects as needed
        ]
    },
    {
        passwordHash: 'hashed_password_2',
        attendanceInfo: [
            { date: '2024-05-01', attendancePercentage: 85 },
            { date: '2024-05-02', attendancePercentage: 90 },
            // Add more attendance info objects as needed
        ]
    },
    {
        passwordHash: 'hashed_password_3',
        attendanceInfo: [
            { date: '2024-05-01', attendancePercentage: 80 },
            { date: '2024-05-02', attendancePercentage: 85 },
            // Add more attendance info objects as needed
        ]
    },
    {
        passwordHash: 'hashed_password_4',
        attendanceInfo: [
            { date: '2024-05-01', attendancePercentage: 75 },
            { date: '2024-05-02', attendancePercentage: 80 },
            // Add more attendance info objects as needed
        ]
    },
    {
        passwordHash: 'hashed_password_5',
        attendanceInfo: [
            { date: '2024-05-01', attendancePercentage: 70 },
            { date: '2024-05-02', attendancePercentage: 75 },
            // Add more attendance info objects as needed
        ]
    },
    {
        passwordHash: 'hashed_password_6',
        attendanceInfo: [
            { date: '2024-05-01', attendancePercentage: 95 },
            { date: '2024-05-02', attendancePercentage: 98 },
            // Add more attendance info objects as needed
        ]
    }
]
*/