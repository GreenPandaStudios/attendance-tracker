import { IPublicAttendanceInfo } from "../types/attendanceTypes";
import { csvStringToJson } from "./csvStringToJson";

export async function fetchPublicInfo(): Promise<IPublicAttendanceInfo[] | undefined> {
    const r = await fetch("publicInfo.csv")
    const text = await r.text();
    console.log(text);
    
    // This will come in like this:
    // "firstName,lastName,improvedAttendance"
    // "John,Doe,TRUE"
    // "Jane,Smith,FALSE"
    const attendanceInfoArray = csvStringToJson(text).map((json: any) => {
        return ({
            firstName: json["firstName"],
            lastName: json["lastName"],
            improvedAttendance: json["improvedAttendance"] == "TRUE"? true : false,
        })}) as IPublicAttendanceInfo[];

    return attendanceInfoArray.sort((b,a) => (b.lastName + b.firstName).localeCompare(a.lastName + a.firstName));
}





const privateAttendanceInfoArray: IPublicAttendanceInfo[] = [
    {
        firstName: 'John',
        lastName: 'Doe',
        improvedAttendance: true,
        
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        improvedAttendance: false,
    },
    {
        firstName: 'Alice',
        lastName: 'Johnson',
        improvedAttendance: true,
    },
    {
        firstName: 'Bob',
        lastName: 'Williams',
        improvedAttendance: false,
    },
    {
        firstName: 'Emily',
        lastName: 'Brown',
        improvedAttendance: true,
    },
    {
        firstName: 'Michael',
        lastName: 'Jones',
        improvedAttendance: false,
    }
]