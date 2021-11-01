import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import { getRecipes } from '../actions';


const RecipeSearch = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(inputValue)
            
        }, 1000)

        return () => {
            clearTimeout(timerId)
        }
    }, [inputValue]) 

    useEffect(() => {
        if(debouncedTerm) {
            dispatch(getRecipes(debouncedTerm))
        }

    }, [debouncedTerm])

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    return (
        <>
            <TextField
                id="recipe-search-input"
                label="Search Recipe"
                type="text"
                value={inputValue}
                onChange={handleChange}
            />
        </>
    )
}

export default RecipeSearch;