import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import EditIcon from '@material-ui/icons/Edit';
import TrashIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Done";
import Input from '../../Component/UI/Input';


const row = ( 
      x,
      i,
      // header,
      handleRemove,
      startEditing,
      editIdx,
      handleChange,
      changeProvince,
      stopEditing,
      formElementsArray,
      formValidCheck
) => {
 const currentlyEditing = editIdx === i;
 //console.log(currentlyEditing)
 // TableRow la element cua Table dc khai bao phia duoi
    return (
      <TableRow key={`tr-${i}`}>
        
        {
        
          formElementsArray.map((y,k) => (
            <TableCell key={`trc-${k}`}>
              
              { currentlyEditing ? 
              <Input 
                    key={y.id}
                    elementType={y.config.elementType}
                    elementConfig={y.config.elementConfig}
                    value={[y.config.value]}
                    valid = {!y.config.valid}
                    shouldValidation = {y.config.validation}
                    messageVa = {y.config.validationMessage}
                    touched = {y.config.touched}
                  //  leaveMoused = {(event) =>this.inputChangedHandler(event, formElement.id)}
                    changed={(e => (y.id === 'province' ? changeProvince(e, y.id,i) :handleChange(e, y.id, i)))}
                    
              />
              : x[y.id]
            }
           </TableCell>
           
           )
          ) 
        }
        <TableCell>
          {currentlyEditing ? (
              formValidCheck ? (
                <CheckIcon onClick={() => stopEditing()} />
              ): "Valid"
            
          ) : (
            <EditIcon onClick={() => startEditing(i)} />
          )}
          {/* <TableCell>{formValidCheck}</TableCell>
              // ko in dc ra gia tri formValidCheck nhung no van co?
          */}
        </TableCell>
        <TableCell>
          <TrashIcon onClick={() => handleRemove(i)} />
        </TableCell>
      </TableRow>
    )
}

export default ({
  data,
//  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  changeProvince,
  stopEditing,
  formElementsArray,
  formValidCheck

}) => (
 
  <Table>
    <TableHead>
   
      <TableRow>
     
      {formElementsArray.map((x, i) => (
       
          <TableCell key={`thc-${i}`}>call{x.config.call}</TableCell>
        ))}
         
          </TableRow>
      
      </TableHead>
      <TableBody>
      {data.map((x, i) =>
        row(
          x,
          i,
      //    header,
          handleRemove,
          startEditing,
          editIdx,
          handleChange,
          changeProvince,
          stopEditing,
          formElementsArray,
          formValidCheck
        )
      )}
      </TableBody>
  </Table>
)