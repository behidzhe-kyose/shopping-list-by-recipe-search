import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { fetchShoppingList, completeShoppingListItem, deleteShoppingListItem } from '../actions';


const ShoppingList = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId);
    const shoppingList = useSelector(state => state.shopping);
    const isSignIn = useSelector(state => state.auth.isSignedIn);
    
    useEffect(() => {
        if(isSignIn) {
            dispatch(fetchShoppingList(userId))
        }
        else {
            return <div> You are not signed in </div>
        }
    }, [isSignIn]);

    const completeItem = (item) => {
        dispatch(completeShoppingListItem(item.id, item.completed))
    }

    const deleteItem = (id) => {
        dispatch(deleteShoppingListItem(id))
    }

    const listLayoutJSX = (listItem) => {
        return (
            <ListItem disablePadding 
                key={listItem.id} 
                
                sx={listItem.completed ? { textDecoration: 'line-through' } : ''}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(listItem.id)}>
                      <DeleteIcon />
                    </IconButton>
                } 
            >
                <ListItemButton component="a" 
                    onClick={() => completeItem(listItem)} 
                    title={listItem.completed ? 'Add to List': `Complete ${listItem.item}`}
                >
                    <ListItemText primary={listItem.item} />
                </ListItemButton>
            </ListItem>
        )
    }

    
    const renderShoppingList = () => {
        if(isSignIn) {
            const completedItems = _.values(shoppingList).filter(item => item.completed).map(listItem => {
                return listLayoutJSX(listItem)
            })
            const uncompletedItems = _.values(shoppingList).filter(item => !item.completed).map(listItem => {
                return listLayoutJSX(listItem)
            })
            
            return [uncompletedItems, completedItems]
        }
        else {
            return <div>You are not signed in</div>
        }
    }
    return (
        <Container maxWidth="md" sx={{ marginTop: '30px'}} >
            <Paper elevation={3}>
                <Grid>{renderShoppingList()}</Grid>
            </Paper>
        </Container>
    )
}

export default ShoppingList;