import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { List, ListItem, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ListItemText from '@mui/material/ListItemText';
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert';
import { addShoppingListItem, getRecipe } from '../actions';


const RecipeDetails = (props) => {
    const dispatch = useDispatch();
    const recipeId = props.match.params.id;
    const recipes = useSelector(state => state.recipes);
    const isSignedIn = useSelector(state => state.auth.isSignedIn);


    useEffect(() => {
        if(isSignedIn) {
            console.log(recipeId)
            dispatch(getRecipe(recipeId))
        }
    }, [isSignedIn]);


    const [snackBar, setSnackBar] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });

    const { vertical, horizontal, open } = snackBar;
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    }); 

    const addShoppingCard = (item) => {
        dispatch(addShoppingListItem(item))

        setSnackBar({ ...snackBar, open: true  });
        setTimeout(() => {
            setSnackBar({ ...snackBar, open: false  });
        }, 1000)
    }

    const renderRecipe = (id) => {
        const recipe = recipes.find(el => el.id == id)
        console.log(recipe)

        if(recipe) {
            const ingredients = recipe.nutrition.ingredients.map(ingredient => {
                return (
                    <ListItem key={ingredient.name}
                        secondaryAction={
                            
                            <IconButton color="primary" aria-label="Add to shopping list" edge="end" 
                                onClick={() => addShoppingCard(ingredient.name)}>
                                {isSignedIn ? <AddShoppingCartIcon /> : '' }
                            </IconButton>
    
                        }>
                        <ListItemText>{ingredient.name}</ListItemText>
                    </ListItem>
                )
            })
    
            const steps = recipe.analyzedInstructions.map(instruction => {
                return instruction.steps.map(step => {
                    return (
                        <ListItem key={step.step} sx={{ paddingLeft: 0}}>
                            {step.step}
                        </ListItem>
                    )
                })
            })
            
            return (
                <>
                    <Grid item xs={12}>
                        <Typography component='h2' pt={2} pb={3} textAlign='center' fontWeight={600}>{recipe.title}</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <img src={recipe.image} style={{maxWidth: '340px', borderRadius: '5px'}} alt={recipe.title} />
                        <List>{steps}</List>
                        
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={5} pl={3} sx={{ marginLeft: '-1px'}}>
                        <List>{ingredients}</List>
                    </Grid>
                </>
            )
        }
    }


    return (
        <Container maxWidth="md">
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                open={open}
                key={vertical + horizontal}
            >
                <Alert severity="success">Added to Shopping List</Alert>
            </Snackbar>
            <Paper elevation={3}>
                <Grid container pl={3} pr={3}>
                    {renderRecipe(recipeId)}
                </Grid>
            </Paper>
        </Container>
    )
}

export default RecipeDetails;