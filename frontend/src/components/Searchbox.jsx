import Box from '@mui/material/Box';
import { useState } from 'react';


const Search = ({handleChange}) => {
    return (
        <>
            <Box sx={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }
            }>
                <input  onChange={handleChange} className="search-box" placeholder="Search Student"></input>
            </Box>
        </>
    )
}

export default Search;