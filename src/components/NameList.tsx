import React, {useState} from 'react'
import { useAsync } from '../hooks/useAsync'
import { fetchPublicInfo } from '../services/fetchPublicInfo'
import { IPublicAttendanceInfo } from '../types/attendanceTypes';
import NameTile from './NameTile';




export default function NameList() {

  // Fetch the public name list
  const [publicInfo, setPublicInfo] = useState<IPublicAttendanceInfo[] | undefined>(undefined);

  const [loaded] = useAsync(fetchPublicInfo,setPublicInfo)

  if (!loaded) return <div>Loading...</div>
  if (publicInfo === undefined) return <div>Error</div>

  return (
    <div className='name-list'>
      {publicInfo.map((info, index) => <NameTile {...info} key={index}/>)}
    </div>
  )
}
