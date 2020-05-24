import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AuthorForm = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <React.Fragment>
            <div className='form-group'>
                <input type='text' id='form-name' className="form-control" name='firstName' placeholder="first name..." required/>
            </div>
            <div className='form-group'>
                <input type='text' id='form-name' className="form-control" name='lastName' placeholder="last name..." required/>
            </div>
            <div className='form-group d-flex justify-content-between'>
                <label className='text-light mt-1' style={{marginRight:'2.65rem'}}><h4>Date Of Birth</h4></label>
                <DatePicker className='form-control' selected={startDate} onChange={date => setStartDate(date)} name='dateOfBirth' required/>
            </div>
        </React.Fragment>
    );
};

export default AuthorForm;