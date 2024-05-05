

export interface IStudent {
    firstName: string;
    lastName: string;
}

export interface IPublicAttendanceInfo extends IStudent {
    improvedAttendance: boolean;
}

export interface IAttendanceInfo {
    date: string;
    attendancePercentage: number;
}


export interface IPrivateAttendanceInfo {
    attendanceInfo: IAttendanceInfo[]
}
