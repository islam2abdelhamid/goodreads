import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios';

const CategoryForm = (props) => {
    return (
        <React.Fragment>
            <div className='form-group'>
                <input type='text' className="form-control" name='name' placeholder='Enter the category name...' required />
            </div>
        </React.Fragment>
    );
};

export default CategoryForm;