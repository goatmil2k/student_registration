import {useState, useEffect} from 'react';
import helpers from '../helpers/apirequest';
import  Button  from '@mui/material/Button';

const AddNew = (props) => {

    const [myanmar, setMyanmar] = useState('');
    const [english, setEnglish] = useState('');
    const [math, setMath] = useState('');
    const [year, setYear] = useState('');

    
    
    return (
        <div>
            <form className="record-form" onSubmit={props.handleSubmit}>
                <label htmlFor="myanmar">Myanmar:</label>
                <input value={myanmar} onChange={(e) => setMyanmar(e.target.value)}  type="number" id="myanmar" name="myanmar" min="0" max="100" required/>

             

                <label htmlFor="english">English:</label>
                <input value={english} onChange={(e) => setEnglish(e.target.value)}   type="number" id="english" name="english" min="0" max="100" required/>

              

                <label htmlFor="math">Math:</label>
                <input  value={math}  onChange={(e) => setMath(e.target.value)}  type="number" id="math" name="math" min="0" max="100" required/>

               

                <label htmlFor="year">Year:</label>
                <select value={year} onChange={(e) => {setYear(e.target.value); console.log(e.target.value)}} id="year" name="year" required>
                <option value="" disabled>Select Year</option>
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
    
                </select>

                <Button type="submit" sx={{ width:'100px', borderRadius:2, bgcolor:'#141c29', color: 'white',
                            ":hover": {
                                bgcolor: "white",
                                color: 'black'
                            }
                        }}  >Submit</Button>
        </form>
    </div>
    )
}

export default AddNew;