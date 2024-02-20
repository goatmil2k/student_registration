import AppBar from '@mui/material/AppBar'
import ToolBar from '@mui/material/Toolbar'
import Nav from './Nav';
import { Typography } from '@mui/material';

const Header = () => {


    return (
        <AppBar sx={{ bgcolor: '#3b3a38', position: 'static', boxShadow: 'none'}}>
            <ToolBar sx={{ display: 'flex', alignItems: 'center', }}>
                <Nav bg="#1c1010" to="/" text="Home" textColor='#edd3d3' />  
                <Nav bg="#1c1010" to="/register" text="Register" textColor='#edd3d3' />
                <Typography sx={{
                    fontSize: '30px',
                    color: '#efcffa',
                    ml: '10rem'
                }}>Student Registeration Form</Typography>
                
                
            </ToolBar>
        </AppBar>
    )
}

export default Header;