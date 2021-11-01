import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const recipes = useSelector(state => state.recipes);

    const renderRecipes = () => {
        return recipes.map(recipe => {
            const { id, title, image } = recipe;
            return (
                <Link to={`recipe/${id}`} key={id}>                        
                    <ImageListItem key={id}>
                    <img
                        src={`${image}?w=248&fit=crop&auto=format`}
                        srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={title}
                        subtitle={title}
                    />
                    </ImageListItem>
                </Link>
            )
        })
    }

    return (
        <div>
            <Container maxWidth="md">
                <Box sx={{ flexGrow: 1 }}>
                    <ImageList sx={{transform: 'translateZ(0)'}} gap={10}>
                        {renderRecipes()}
                    </ImageList>
                </Box>
            </Container>
        </div>
    )
}

export default RecipeList;