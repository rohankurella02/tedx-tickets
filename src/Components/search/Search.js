import React from 'react'
import './Search.css'
import db from './db.json'
// import Table from 'react-bootstrap/Table';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

function Search() {
    console.log(db)
    const [query2, setQuery2] = React.useState("");

    const searchFilter = (data) => {
        return data.filter((value) =>
            (value['Attendee Name'].toLowerCase().includes(query2) || value['Attendee Email'].toLowerCase().includes(query2) || value['Contact Number'].toString().includes(query2) || value['Registration Id'].toString().includes(query2)
            )
)}

  return (
    <div className='s_container'>
        <div className="search">
            <div className="searchContainer">
                <div className="searchBar">
                    <input type="text" placeholder="Search" value={query2} onChange={(e) => setQuery2(e.target.value)} />
                </div>
            </div>
        </div>
        <div className="searchTable">
              <Table striped bordered hover>
                <Thead className='tabHead'>
                    <Tr>
                        <Th className='table-head'>S No.</Th>
                          <Th className='table-head'>Registration ID</Th>
                          <Th className='table-head'>Name</Th>
                          <Th className='table-head'>E Mail</Th>
                          <Th className='table-head'>Phone Number</Th>
                          <Th className='table-head'>Check In Time</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    { searchFilter && 
                        searchFilter(db).map((val, idx) => {
                            return (
                                <Tr key={idx}>
                                    <Td className='table-data' >{idx + 1}</Td>
                                    <Td className='table-data'>{val['Registration Id']}</Td>
                                    <Td className='table-data'>{val['Attendee Name']}</Td>
                                    <Td className='table-data'>{val['Attendee Email']}</Td>
                                    <Td className='table-data'>{val['Contact Number']}</Td>
                                    <Td className='table-data'>{val['Check-In Time']}</Td>
                                </Tr>
                            )
                        }
                            )
                        }
                </Tbody>
            </Table>
        </div>
    </div>
  )
}

export default Search