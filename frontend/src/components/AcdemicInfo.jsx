import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import DeletebuttonForUpdate from './DeletebuttonForUpdate.jsx';

function createData(id, myanmar, english, math, student_year) {
    return {id, myanmar, english, math, student_year};
}

function nullToEptStr(input) {
  return input === null ? '' : input;
}

const AcademicInfo = ({academicInfo, handleInputChange, handleAddRow, handleDeleteRow}) => {

    const [hasAcademicInfo, setHasAcademicInfo] = useState(false);
    const rows = [];

    useEffect(() => {
        if (academicInfo && academicInfo.length > 0  ) {
          
          setHasAcademicInfo(true);
        } else {
          setHasAcademicInfo(false);
        }
      }, [academicInfo]);

    if(hasAcademicInfo) {

        for(let i = 0; i < academicInfo.length; i++) {
            let obj = academicInfo[i];
            rows.push(createData(obj.id, obj.myanmar, obj.english, obj.math, obj.student_year));
        }
    }
    return (
        <>
        <TableContainer component={Paper}>
      <Table sx={{
        bgcolor: '#141c29',
      }} className='register-academic-table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{
                color: 'white',
                fontWeight: '400'
            }}>No.</TableCell>
            <TableCell sx={{
                color: 'white',
                fontWeight: '400'
            }}>Myanmar</TableCell>
            <TableCell sx={{
                color: 'white',
                fontWeight: '400'
            }}>English</TableCell>
            <TableCell sx={{
                color: 'white',
                fontWeight: '400'
            }}>Maths</TableCell>
            <TableCell  sx={{
                color: 'white',
                fontWeight: '400'
            }} align="right">Year</TableCell>

          </TableRow>
        </TableHead>

        { hasAcademicInfo && <TableBody>
          {rows.map((row, index) => (
            <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell sx={{
                color: 'white',
                fontWeight: '400'
            }}>{index + 1}</TableCell>
            <TableCell sx={{
                color: 'white',
                fontWeight: '400'
            }} align='left'>
              <input type="number" name="myanmar" value={nullToEptStr(row['myanmar'])} onChange={(e) => handleInputChange(index, 'myanmar', e.target.value)}/>
            </TableCell>
            <TableCell sx={{
                color: 'white',
                fontWeight: '400'
            }} align='left'>
              <input type="number" name="english" value={nullToEptStr(row['english'])} onChange={(e) => handleInputChange(index, 'english', e.target.value)}/>
            </TableCell>
            <TableCell sx={{
                color: 'white',
                fontWeight: '400'
            }} align='left'>
              <input type="number" name="math" value={nullToEptStr(row['math'])} onChange={(e) => handleInputChange(index, 'math', e.target.value)}/>
              </TableCell>
            <TableCell  sx={{
                color: 'white',
                fontWeight: '400'
            }} align="right">
              <input type="number" name="student_year" value={nullToEptStr(row['student_year'])} onChange={(e) => handleInputChange(index, 'student_year', e.target.value)}/>
            </TableCell>
            <Box sx={{mt: '10px', mr: '5px'}}>
              <DeletebuttonForUpdate handleDeleteRow={() => handleDeleteRow(index, row.id)}/>
            </Box>
            
            </TableRow>
          ))}
        </TableBody>}
      </Table>
    </TableContainer>
    <Button onClick={handleAddRow} sx={{ px:2, py:1, mt:2, width:'150px', borderRadius:2, bgcolor:'#141c29', color: 'white',
                        ":hover": {
                            bgcolor: "white",
                            color: 'black'
                        },
                       
                    }} >Add</Button> 
    
    </>
    )
}

export default AcademicInfo;