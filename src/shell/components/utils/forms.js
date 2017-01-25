import React from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import moment from 'moment';

import { SimpleSelect } from 'react-selectize';
import 'react-selectize/themes/index.css';

const renderInput = field => {
    let label = null;
    if (field.placeholder) {
        label = <label> {field.placeholder} </label>
    }

    return (
        <div className="form-group">
            {label}
            <div>
                <input {...field.input} className="form-control" />
                {field.meta.error && field.meta.touched && <span className="text-danger"> {field.meta.error} </span>}
            </div>
        </div>
    )
}

const renderDate = field => {

    return (
        <div>
            <label> {field.placeholder} </label>
            <div>
                <DatePicker {...field.input} className="form-control"
                    selected={field.input.value ? moment(field.input.value) : null}
                    />
                {field.meta.error && field.meta.touched && <span className="text-danger"> {field.meta.error} </span>}
            </div>
        </div>
    )
}

const renderSelect = field => {
    console.log(field.input.value)
    let label = null;
    if (field.placeholder) {
        label = <label> {field.placeholder} </label>
    }
    let labelKey = field.labelKey ? field.labelKey : 'name';
    let valueKey = field.valueKey ? field.valueKey : 'id';
    let options = field.options || [];
    options = options.map((record)=> {
       return {
            label: record[labelKey],
            value: record[valueKey]
        }
    })
    return (
        <div>
         {label}
            <div className>
               <SimpleSelect 
                    {...field.input}
                    options = {options} 
                    value={field.input.value}
                    theme="bootstrap3" 
                    onBlur={() => {
                        console.log('blurred ahahahahah')
                        //const { value } = field.input
                        //if (!value) return field.input.onBlur(null)
                        console.log(field.input)
                        //return value.value ? field.input.onBlur(value.value) : field.input.onBlur(value)
                        field.input.onBlur(field.input.value)
                    }}
                    onValueChange={(val) => {
                        console.log('changed with value---' + val)
                        console.log(val)
                        
                        if(!val) {
                           field.input.onChange(null)
                        }
                           else {
                                field.input.onChange(val);
                           }
                        //return val.value ? field.input.onChange(val.value) : field.input.onChange(val);
                        
    
                }}/>
            </div>
        </div>
    );
}

const renderSelect2 = field => {
    
    let label = null;
    if (field.placeholder) {
        label = <label> {field.placeholder} </label>
    }
    let labelKey = field.labelKey ? field.labelKey : 'name';
    let valueKey = field.valueKey ? field.valueKey : 'id';

    return (
        <div>
            {label}
            <div className>
                <Select
                    {...field.input}
                    options={field.options}
                    value={field.input.value[valueKey]}
                    valueKey={valueKey}
                    labelKey={labelKey}
                    onBlur={() => {
                        field.input.onBlur(field.input.value)
                    } }
                    onChange={(val) => {
                        console.log('changed with value---' + val)
                        console.log(val)

                        field.input.onChange(val);
                    } }
                    />
            </div>
        </div>
    );
}



// const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
//   <div>
//         <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null} />
//         {touched && error && <span>{error}</span>}
//   </div>
// );

// export default renderDatePicker

const renderCheckbox = field => {
    return (

        <label className="checkbox-inline">
            <input {...field.input} type="checkbox" /> {field.placeholder}
        </label>
    );
}

const renderRadio = field => {
    return (
        <label className="radio-inline">
            <input  {...field.input} value={field.input.value} type="radio" />
            {field.placeholder}
        </label>

    );
}

export { renderInput, renderCheckbox, renderRadio, renderDate, renderSelect, renderSelect2 };
