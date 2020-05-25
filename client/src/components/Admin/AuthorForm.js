import React, { useContext, useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AdminContext from '../../context/AdminContext/AdminContext';

const AuthorForm = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const context = useContext(AdminContext);
    
    const handlingChange = (e)=>{
        let value = e.target.value
        let key = e.target.name
        context.setAuthorObject(prevAuthor => ({...prevAuthor, [key]: value}))
    }

    const handlingDateChange = date =>{
        setStartDate(date);
        context.setAuthorObject(prevAuthor => ({...prevAuthor, dateOfBirth: startDate}))
    }

    return (
        <React.Fragment>
            <div className='form-group'>
                <input 
                    type='text' 
                    id='form-name'
                    className="form-control"
                    onChange={handlingChange}
                    value={context.authorObject.firstName}  
                    name='firstName' 
                    placeholder="first name..." 
                    required
                />
            </div>
            <div className='form-group'>
                <input 
                    type='text' 
                    id='form-name' 
                    className="form-control"
                    onChange={handlingChange}
                    value={context.authorObject.lastName}
                    name='lastName' 
                    placeholder="last name..." 
                    required
                />
            </div>
            <div className='form-group d-flex justify-content-between'>
                <label className='text-light mt-1' style={{marginRight:'2.65rem'}}><h4>Date Of Birth</h4></label>
                <DatePicker 
                    className='form-control'
                    selected={startDate} 
                    onChange={handlingDateChange}
                    name='dateOfBirth' 
                    required
                />
            </div>
        </React.Fragment>
    );
};

export default AuthorForm;