import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import  helpers  from '../helpers/apirequest.js';
import Link from '@mui/material/Link';
import { useSlotProps } from '@mui/base';



const DataTable = (props) => {
 let rows = [];
 rows.length = 0;
 rows = props.data;
    
  return (
     <TableContainer component={Paper}>
      <Table aria-label="simple table" >
        <TableHead>
          <TableRow >
            <TableCell sx={{
        fontSize: '20px',
        fontWeight: '400',
      }}>No.</TableCell>
            <TableCell
            sx={{
              fontSize: '20px',
              fontWeight: '400',
            }}>Name</TableCell>
            <TableCell
            sx={{
              fontSize: '20px',
              fontWeight: '400',
            }}>Student ID</TableCell>
            <TableCell
            sx={{
              fontSize: '20px',
              fontWeight: '400',
            }}>Date Of Birth</TableCell>
            <TableCell
            sx={{
              fontSize: '20px',
              fontWeight: '400',
            }}>NRC Number</TableCell>
            <TableCell
            sx={{
              fontSize: '20px',
              fontWeight: '400',
            }}>Region</TableCell>
            <TableCell
            sx={{
              fontSize: '20px',
              fontWeight: '400',
            }}>Address</TableCell>
            <TableCell
            sx={{
              fontSize: '20px',
              fontWeight: '400',
            }}>Gender</TableCell>
            <TableCell
            sx={{
              fontSize: '20px',
              fontWeight: '400',
            }}>Hobbies</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#9bb3a3' }}
          >
            <TableCell sx={{
              fontSize: '16px'
            }}>{index+1}</TableCell>
            
            <TableCell scope="row" sx={{
              
            }}>
              <Link href={`infopage/${row.id}`} sx={{textDecoration: 'none', 
                  color: 'black',
                  fontSize: '16px',
              }}>{row.name}
              </Link>
            </TableCell >

            <TableCell scope="row" sx={{
              fontSize: '16px'
            }}>
              <Link href={`infopage/${row.id}`} sx={{textDecoration: 'none', 
                color: 'black',

            }}>{row.studentId}
              </Link>
            </TableCell>

            <TableCell scope="row" sx={{
              fontSize: '16px'
            }}>
              <Link href={`infopage/${row.id}`} sx={{textDecoration: 'none', 
                color: 'black',

            }}>{row.dob}
              </Link>
            </TableCell>

            <TableCell scope="row" sx={{
              fontSize: '16px'
            }}>
              <Link href={`infopage/${row.id}`} sx={{textDecoration: 'none', 
                color: 'black',

            }}>{row.nrc}
              </Link>
            </TableCell>
            
            <TableCell scope="row" sx={{
              fontSize: '16px'
            }}>
              <Link href={`infopage/${row.id}`} sx={{textDecoration: 'none', 
                color: 'black',

            }}>{row.region}
              </Link>
            </TableCell>
              
            <TableCell scope="row" sx={{
              fontSize: '16px'
            }}>
              <Link href={`infopage/${row.id}`} sx={{textDecoration: 'none', 
                color: 'black',

            }}>{row.address}</Link>
            </TableCell>
            
            <TableCell scope="row" sx={{
              fontSize: '16px'
            }}>
             <Link href={`infopage/${row.id}`} sx={{textDecoration: 'none', 
                color: 'black',

            }}>{row.gender}</Link>
            </TableCell>
            
            <TableCell scope="row" sx={{
              fontSize: '16px'
            }}>
             <Link href={`infopage/${row.id}`} sx={{textDecoration: 'none', 
                color: 'black'

            }}>{row.hobbies}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;