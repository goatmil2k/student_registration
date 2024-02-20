import { Box, Typography } from "@mui/material";
import DataTable from '../components/Table';
import Search from "../components/Searchbox";
import { useEffect, useState } from "react";
import helpers from '../helpers/apirequest';


function formatDate (date) {
    const inputDate = new Date(date);
    const formattedDOB = inputDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });
    return formattedDOB;
  }

  
const Home = () => {

    const [userData, setUserData] = useState([]);
    var [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isOnSearch, setOnSearch] = useState(false);

    function handleChange(e) {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await helpers.getAllStudents();

            const dataFormatted = data.map((obj) => ({
                id: obj.id,
                name: obj.name,
                studentId: obj.student_id,
                gender: obj.gender,
                address: obj.address,
                region: obj.region,
                nrc: obj.nrc,
                hobbies: obj.hobbies,
                dob: formatDate(obj.dob)
              }));

            setUserData(dataFormatted);
          } catch (error) {
            console.error("Error:", error.message);
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        if (searchInput.length > 0) {
          let array = [];
          setOnSearch(true);
          for (let i = 0; i < userData.length; i++) {
            if (Object.values(userData[i]).includes(searchInput)) {
              array.push(userData[i]);
            }
          }
          setSearchResult(array);
        } else {
          setOnSearch(false);
        }
      }, [searchInput, userData]);

      
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                fontFamily: 'inherit',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mx: 'auto'
                }}
            >
                <Box sx={{
                    width: '80%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Typography sx={{
                                pt: '1rem',
                                fontSize: '30px',
                                color: '#efcffa' 
                                }}>
                                   List Of Registered Students
                    </Typography>
                    
                    <Search handleChange={handleChange} />
                </Box>
                <Box
                    sx={{
                        pt: '1rem',
                        width: "80%",
                    }}
                >

                    
                    <DataTable data={isOnSearch ? searchResult : userData }/>
                </Box>
            </Box>
        </Box>
    )
}


export default Home;