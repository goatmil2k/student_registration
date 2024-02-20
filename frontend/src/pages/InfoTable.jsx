import { useEffect, useState } from 'react';
import  helpers  from '../helpers/apirequest.js';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import AcademicInfo from '../components/AcdemicInfo.jsx';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';




const InfoTable = () => {
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [isButtonClicked, setButtonClicked] = useState(false);
    const [isUpdateMode, setUpdateMode] = useState(false);

    //setId(props.id);

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

    const handleAddRow = async () => {

        const myanmar = '';
        const english = '';
        const math = '';
        const student_year = '';
        try{
            const res = await helpers.addAcademicInfo(id, myanmar, english, math, student_year);
            if (res.status === 200) {
                const latestInfo = res.data.newAcademicInfo;
                setAcademicInfo((prevAcademicInfo) => {
                const prevArray = prevAcademicInfo || [];
                return [...prevArray, latestInfo];
            })
            }
            
        }catch(err) {
            console.error(err);
        }
        
    }

    const handleDeleteRow = async (index, id) => {

        try{
            if(id) {
                const res = await helpers.deleteARecord(id);
                if( res && res.status === 200) {
                    setAcademicInfo((prevAcademicInfo) => {
                        const prevArray = prevAcademicInfo || [];
                        const updatedInfo = prevArray.filter((info) => info.id !== id);
                        return updatedInfo;
                    })
                }
                else {
                    console.error('Error deleting academic record:', res.data.message);
                }


            }
           
            
        }catch(err) {
            console.error("Error deleting record", err.message);
        }
        
      };

   

    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const [photoSrc, setPhotoSrc] = useState('');
    const [name, setName] = useState('');
    const [student_id, setStudentId] = useState('');
    const [dob, setDob] = useState('');
    const [formattedDob, setFormattedDob] = useState('');
    const [gender, setGender] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [address, setAddress] = useState('');
    const [region, setRegion] = useState('');
    const [nrc, setNrc] = useState('');
    const [academicInfo, setAcademicInfo] = useState([]);
    const [id, setId] = useState('');
    const [photo, setPhoto] = useState();

    
    const confirmDelete = async () => {
        try {

            const res = await helpers.deleteStudentInfo(id);

            if(res.message === 'Ok') {
                navigate('/');
            }

        }catch(err){
            console.log("Could not delete data: ", err.message);
        }
    }
    useEffect(() => {
        const getInfo = async () => {
            const ID = path.split('/infopage/').join('');
            try {
                const data = await helpers.getAStudent(ID);

                if(data) {
                    const dobFromDatabase = data.generalInfo[0].dob;

                    const dobDate = new Date(dobFromDatabase);

                    const newDob = dobDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                    setId(data.generalInfo[0].id);
                    setName(data.generalInfo[0].name);
                    setStudentId(data.generalInfo[0].student_id);
                    setDob(data.generalInfo[0].dob);
                    setFormattedDob(newDob);
                    setAddress(data.generalInfo[0].address);
                    setRegion(data.generalInfo[0].region);
                    setHobbies(data.generalInfo[0].hobbies.split(','));
                    setGender(data.generalInfo[0].gender);
                    setNrc(data.generalInfo[0].nrc);
                    setAcademicInfo(data.academicInfo);
                    const bufferData = data.generalInfo[0].photo.data;
                    const arrayBufferView = new Uint8Array(bufferData);
                    const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
                    const imageUrl = URL.createObjectURL(blob);
                    setPhotoSrc(imageUrl);
                }

            }catch(error) {
                console.log("Error fetching student data");
            }
        }
        getInfo();
    }, [path]);

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    
    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('student_id', student_id);
        formData.append('name', name);
        formData.append('nrc', nrc);
        formData.append('address', address);
        formData.append('hobbies', hobbies);
        formData.append('gender', gender);
        formData.append('region', region);
        formData.append('dob', dob);
        formData.append('photo', photo);

        if( academicInfo && academicInfo.length !== 0) {
            formData.append('academicInfo', JSON.stringify(academicInfo));
        }

        try {
            toast.loading("Updating", {id: 'update'});
            const res = await helpers.updateStudentInfo(id, formData);

            if (res && res.data.message === "Ok") {
                console.log("Data Updated Successfully");
                toast.success("Updated Successfully", {id: 'update'});
                window.location.reload();
            }
        }catch(err) {
            toast.error("Something Went Wrong.", {id: 'update'});
            console.error("Error updating info", err.message);
        }
    };
    
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexWrap: 'wrap'
        }}>
            <Box sx={{
                display: 'flex',
                flex: { md: 0.8, xs: 1, sm: 1},
                flexDirection: 'column',
            }}>
                <Box sx={{
                    display: 'flex',
                    width: '60%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    m: 'auto'
                }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}>
                    <Typography sx={{
                        fontSize: '30px',
                        color: 'white',
                        mb: 2,
                        mx: 'auto',
                        pt: '0.5rem'
                    }}>General Information</Typography>
                </Box>
                
                <Box sx={{
                        display: 'flex',
                        jutifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>
                        <form>
                        <Button type="submit" onClick={handleSubmitUpdate}  sx={{px: '10px', width:'150px', borderRadius:2, bgcolor:'#141c29', color: 'white', ":hover": {
                            bgcolor: "white",
                            color: 'black'
                        }  }}>Save Changes</Button>
                        </form>
                        <Button onClick={confirmDelete} sx={{ml: '1rem', px: '10px', width:'150px', borderRadius:2, bgcolor:'#a53030', color: 'white', ":hover": {
                            bgcolor: "white",
                            color: 'black'
                        }  }}>
                            Delete
                        </Button>
                </Box>
                </Box>
                
                <Box sx={{
                    width: '60%',
                    height: '100vh',
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'scroll',
                    overflowX: 'hidden',
                    scrollBehavior: 'smooth',
                    overflowY: 'auto',
                    backgroundColor: '#141c29',
                    padding: '1rem',
                    borderRadius: '5px',
                }}>
                    <form className='info-form'>
                        <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid white',
                                pb: '5px',
                                mb: '1rem',
                            }}>
                                <Typography sx={{ width: '50%'}}>Name</Typography>
                                <input value={name} onChange={(e) => setName(e.target.value)}  className='update-input' required/>
                        </Box>
                        <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid white',
                                pb: '5px',
                                mb: '1rem',
                            }}>
                                <Typography sx={{ width: '50%'}}>Student ID</Typography>
                                <input value={student_id} onChange={(e) => setStudentId(e.target.value)} className='update-input' required/>
                        </Box>
                        <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid white',
                                pb: '5px',
                                mb: '1rem',
                            }}>
                                <Typography sx={{ width: '50%'}}>Date Of Birth</Typography>
                                <Box sx={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <Typography sx={{ ml: 'auto', mr: '20px', fontSize: '25px'}}>{formattedDob} </Typography>
                                    <input style={{width: "9%"}} type="date" value={dob} onChange={(e) =>  setDob(e.target.value)} required/>
                                </Box>
                                
                        </Box>
                        <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid white',
                                pb: '5px',
                                mb: '1rem',
                            }}>
                                <Typography sx={{ width: '50%'}}>NRC Number</Typography>
                                <input className='update-input' value={nrc} onChange={(e) => setNrc(e.target.value) } required/>
                        </Box>
                        <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid white',
                                pb: '5px',
                                mb: '1rem',
                            }}>
                                <Typography sx={{ width: '50%'}}>Region</Typography>
                                <select value={region} onChange={(e) => setRegion(e.target.value)} id="myanmarRegions" required>
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
                        </Box>
                        <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid white',
                                pb: '5px',
                                mb: '1rem',
                            }}>
                                <Typography sx={{ width: '50%'}}>Address</Typography>
                                <textarea value={address} onChange={(e) => setAddress(e.target.value)} id="address" name='address' row='2' required></textarea>
                        </Box>
                        <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid white',
                                pb: '5px',
                                mb: '1rem',
                            }}>
                                <Typography sx={{ width: '50%'}}>Gender</Typography>

                                <label><input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={handleGenderChange}/> Male</label>
                                <label><input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={handleGenderChange}/> Female</label>
                                <label><input type="radio" name="gender" value="Prefer-not-To-Say" checked={gender === 'Prefer-not-To-Say'} onChange={handleGenderChange}/>Prefer Not To Say</label>
                                
                                
                                
                        </Box>
                        <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid white',
                                pb: '5px',
                                mb: '1rem',
                            }}>
                                <Typography sx={{width: '50%'}}>Hobbies</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: '5px',
                                    }}>
                                    <input type="checkbox" name="hobbies" value="reading" checked={hobbies.includes('reading')} onChange={handleHobbiesChange} /><label> Reading </label>
                                </Box>

                                <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: '5px',
                                }}>
                                    <input type="checkbox" name="hobbies" value="gaming" checked={hobbies.includes('gaming')} onChange={handleHobbiesChange} /><label> Gaming</label> 
                                </Box>

                                <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: '5px',
                                }}>
                                    <input type="checkbox" name="hobbies" value="traveling" checked={hobbies.includes('traveling')} onChange={handleHobbiesChange} /><label> Traveling</label>
                                </Box>

                                <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: '5px',
                                }}>
                                    <input type="checkbox" name="hobbies" value="cooking" checked={hobbies.includes('cooking')} onChange={handleHobbiesChange} /><label> Cooking</label>
                                </Box>

                                <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: '5px',
                                }}>
                                    <input type="checkbox" name="hobbies" value="sports" checked={hobbies.includes('sports')} onChange={handleHobbiesChange} /><label> Sports</label>
                                </Box> 
                                
                        </Box>
                        <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                pb: '5px',
                                mb: '1rem',
                            }}>
                                <Typography sx={{mb: '1rem'}}>Profile Photo</Typography>
                                <img className='student-image' src={`${photoSrc}`} />
                                <input style={{marginTop: '10px', fontSize: '15px'}} onChange={handleFileChange} type="file" id="photo" name="photo" accept="image/*"/>
                        </Box>
                </form>
                </Box>
            </Box>
            <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                    width: '65%',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    mb: '2rem'
                }}>
                     <Typography sx={{
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        fontSize: '30px',
                        color: 'white',
                        mb: 2,
                        pt: '0.5rem',
                    }}>Academic Record</Typography>
                    <AcademicInfo id={id} academicInfo={academicInfo} handleInputChange={(index, key, value) => handleInputChange(index, key, value)} handleAddRow={handleAddRow} handleDeleteRow={(index, id) => handleDeleteRow(index, id)}/>
            </Box>
            
    </Box>
    )
}

export default InfoTable;