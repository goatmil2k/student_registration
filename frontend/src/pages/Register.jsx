import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import  helpers from '../helpers/apirequest';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Deletebutton from '../components/Deletebutton';


const RegisterationForm = () => {
    const [academicInfo, setAcademicInfo] = useState([{myanmar: '', english: '', math: '', year: ''}]);
    const [rowCount, setRowCount]  = useState(1);
    const [name, setName] = useState('');
    const [student_id, setStudentId] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [nrc, setNrc] = useState('');
    const [photo, setPhoto] = useState();
    const [region, setRegion] = useState('');


    const handleAddRow = () => {
        setRowCount(rowCount + 1);
        setAcademicInfo([...academicInfo, {}])
    }

    const handleDeleteRow = (index) => {
        const rowData = [...academicInfo];
        rowData.splice(index, 1); 
        setAcademicInfo(rowData);
      };

    const handleInputChange = (index, key, value) => {
        const rowData = [...academicInfo];
        rowData[index][key] = value;
        setAcademicInfo(rowData);

    }
    
    const handleGenderChange = (event) => {
        setGender(event.target.value);
      };
    
    const handleHobbiesChange = (event) => {
        const hobby = event.target.value;
        if (event.target.checked) {
          setHobbies([...hobbies, hobby]);
        } else {
          
          setHobbies(hobbies.filter((h) => h !== hobby));
        }
      };

    const handleFileChange =  (e) => {
        setPhoto(e.target.files[0]);
    };

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('student_id', student_id);
        formData.append('name', name);
        formData.append('nrc', nrc);
        formData.append('address', address);
        formData.append('hobbies', hobbies);
        formData.append('gender', gender);
        formData.append('dob', dob);
        formData.append('photo', photo);
        formData.append('region', region);

        if(academicInfo.length !== 0) {
        formData.append('academicInfo', JSON.stringify(academicInfo));
        }
        


        try {
            const res = await helpers.registerNewStudent(formData);
    
            if (res && res.message === "Ok") {
                navigate('/');
            } else {
                console.error("Error registering student");
                throw new Error("Unable to register new student");
            }
        } catch (error) {
            console.error("Error registering student", error.message);
            throw new Error("Unable to register new student");
        }

    };
    console.log(academicInfo);
    return (
        
        <>
        <Box sx={{
            diplay: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <form className='register-form' onSubmit={handleSubmit}>
            <label htmlFor="studentId">Student ID:</label>
            <input className='register-input' value={student_id} onChange={(e) => setStudentId(e.target.value)} type="text" id="studentId" name="student_id" required/>


            <label htmlFor="name">Name:</label>
            <input className='register-input' value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" required/>

            <label htmlFor="dob">Date of Birth:</label>
            <input className='register-input' value={dob} onChange={(e) => setDob(e.target.value)} type="date" id="dob" name="dob" required/>

            <label htmlFor="nrc">NRC Number:</label>
            <input className='register-input' value={nrc} onChange={(e) => setNrc(e.target.value)} type="text" id="nrc" name="nrc" required/>

            <label htmlFor="nrc">Region:</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)} id="myanmarRegions">
                <option value="">Select Region</option>
                <option value="ayeyarwady">Ayeyarwady Region</option>
                <option value="bago">Bago Region</option>
                <option value="chin">Chin State</option>
                <option value="kachin">Kachin State</option>
                <option value="kayin">Kayin State</option>
                <option value="kayah">Kayah State</option>
                <option value="magway">Magway Region</option>
                <option value="mandalay">Mandalay Region</option>
                <option value="mon">Mon State</option>
                <option value="rakhine">Rakhine State</option>
                <option value="sagaing">Sagaing Region</option>
                <option value="shan">Shan State</option>
                <option value="tanintharyi">Tanintharyi Region</option>
                <option value="yangon">Yangon Region</option>
            </select>
            <label htmlFor="address">Address:</label>
            <textarea  value={address} onChange={(e) => setAddress(e.target.value)}  id="address" name="address" rows="4" required></textarea>
            <h2>Gender</h2>
            <div className='radio'>
                <label>
                    <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange}/>
                    Male
                </label>

                <label>
                    <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange} />
                    Female
                </label>

                <label>
                    <input type="radio" name="gender" value="preferNotToSay" checked={gender === 'preferNotToSay'} onChange={handleGenderChange} />
                    Prefer not to say
                </label>
            </div>
            <h2>Hobbies</h2>
            <div className='checkbox'>
                <label>
                    <input type="checkbox" name="hobbies" value="reading" checked={hobbies.includes('reading')} onChange={handleHobbiesChange} />
                    Reading
                </label>

                <label>
                    <input type="checkbox" name="hobbies" value="gaming" checked={hobbies.includes('gaming')} onChange={handleHobbiesChange} />
                    Gaming
                </label>

                <label>
                    <input type="checkbox" name="hobbies" value="traveling" checked={hobbies.includes('traveling')} onChange={handleHobbiesChange} />
                    Traveling
                </label>

                <label>
                    <input type="checkbox" name="hobbies" value="cooking" checked={hobbies.includes('cooking')} onChange={handleHobbiesChange} />
                    Cooking
                </label>

                <label>
                    <input type="checkbox" name="hobbies" value="sports" checked={hobbies.includes('sports')} onChange={handleHobbiesChange} />
                    Sports
                </label>
            </div>
            <label htmlFor="photo">Photo:</label>
            <input onChange={handleFileChange} type="file" id="photo" name="photo" accept="image/*" required/>

            <Box
            sx={{   
                mt: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
                width: '100%',
                marginRight: 'auto',
                marginLeft: 'auto',
                mb: '2rem'
            }}
        >   
                <Typography sx={{fontSize: '20px', m: 'auto'}}>Add Academic Record</Typography>
                <TableContainer component={Paper}>
                <Table sx={{
                    bgcolor: '#141c29',
                }}>
                    <TableHead>
                    <TableRow>
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
                    <TableBody className="register-academic-table">
                    {academicInfo.map((row, index) => (  
                    <TableRow key={index} >
                        <TableCell scope='row'>
                            <input type="number" name="myanmar" value={row['myanmar']} onChange={(e) => handleInputChange(index, 'myanmar', e.target.value)}/>
                        </TableCell>
                        <TableCell scope='row'>
                            <input type="number" name="english" value={row['english']} onChange={(e) => handleInputChange(index, 'english', e.target.value)}/>
                        </TableCell>
                        <TableCell scope='row'>
                            <input type="number" name="math"   value={row['math']} onChange={(e) => handleInputChange(index, 'math', e.target.value)} />
                        </TableCell>
                        <TableCell scope='row' align='right'>
                            <input type="number" name="year" value={row['year']} onChange={(e) => handleInputChange(index, 'year', e.target.value)}/>
                        </TableCell>
                        <Box sx={{
                            mt: '10px',
                        }}>
                        <Deletebutton handleDeleteRow={() => handleDeleteRow(index)} />
                        </Box>
                    </TableRow>
                    ))}
                    </TableBody>

                    
                </Table>
                </TableContainer>
                <Button onClick={handleAddRow} sx={{ px:2, py:1, mt:2, width:'150px', borderRadius:2, bgcolor:'#141c29', color: 'white',
                        ":hover": {
                            bgcolor: "white",
                            color: 'black'
                        },
                       
                    }} >Add</Button> 
            </Box>

            <button className='register-button' type="submit">Register</button>
        </form>

        </Box>
        </>
    )
}


export default RegisterationForm;