import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios';
import AdminContext from '../../context/AdminContext/AdminContext'

const CategoryForm = (props) => {
    const context = useContext(AdminContext)
    const handlingChange = (e)=>{
        let value = e.target.value
        context.setCategoryObject(cat => ({...cat, name: value}))
    }

    return (
        <React.Fragment>
            <div className='form-group'>
                <input 
                    type='text' 
                    className="form-control" 
                    onChange={handlingChange} 
                    name='name' 
                    value={context.categoryObject.name} 
                    placeholder='Enter the category name...' 
                    required 
                />
            </div>
        </React.Fragment>
    );
};

export default CategoryForm;