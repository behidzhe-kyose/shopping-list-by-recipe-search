import React from 'react';
import Grid from '@mui/material/Grid';
import RecipeSearch from './RecipeSearchForm';
import GoogleAuth from './GoogleAuth';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import '../styles/header.css'

const Header = () => {
    return (
        <div className="header">
            <Grid container p={3} alignItems="center">
                <Grid item xs={7}>
                    <RecipeSearch />
                </Grid>

                <Grid item xs={3} textAlign="right">
                    <Link to={`/shopping-list`}> 
                    <Button> Shopping List </Button>
                    </Link>
                </Grid>

                <Grid item xs={2} textAlign="right">
                    <GoogleAuth />
                </Grid>
            </Grid>
        </div>
    )
}

export default Header;