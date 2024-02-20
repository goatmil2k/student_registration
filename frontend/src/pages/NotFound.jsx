import Box from '@mui/material/Box';
import Deletebutton from '../components/Deletebutton';

const NotFound = () => {
    return (
    
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <Deletebutton />
                <div className="not-found">
                    <h1>Error 404: Student Not Found</h1>
                    <p>Make sure you have the right name or studentId.</p>
                </div>
            </Box>
    )
}


export default NotFound;