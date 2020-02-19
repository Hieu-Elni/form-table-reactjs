import React from 'react';
import './Input.css';
const input = (props) => {
    //props tu Table
    let inputElement = null;
    let classInput = "InputElement";
    if(props.valid && props.shouldValidation && props.touched){
        classInput +=" Invalid"
    }

    const showError = () => {
        let errorMessage = <div className="error_label">
                {
                    props.shouldValidation && props.valid ?
                        props.messageVa
                    :null
                }
        </div>;
        return errorMessage
    }
    switch(props.elementType){
        
        case('input'):
            inputElement = (
            <div className="pos"><input className={classInput} {...props.elementConfig} 
            value={props.value}
            
            onChange = {props.changed}
            onBlur = {props.leaveMoused}
            />
            {showError()}
            </div>
            );
        break;

        case ( 'textarea' ):
            inputElement = <textarea  className={classInput} {...props.elementConfig} 
            value={props.value}
            onChange = {props.changed}
            />;
            break;
        case ( 'select' ):
            
            inputElement = (
                <select
                className={classInput}
                    value={props.value}
                    onChange={props.changed}>
                     <option value="" disabled="disable">Select one</option>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;

        default:inputElement = <input className={classInput} 
        {...props.elementConfig} 
        value={props.value}/>

    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;