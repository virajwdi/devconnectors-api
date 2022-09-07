const validators= require('validator');
const isEmpty = require ('./isEmpty');

module.exports =function validationExperianceForm(data){
    let errors = {}
    
    data.title= !isEmpty(data.title) ? data.title : "";
    data.company= !isEmpty(data.company) ? data.company : "";
    data.from= !isEmpty(data.from) ? data.from : "";

    if(validators.isEmpty(data.title)){
        errors.title= "Job title is required";
    }
    
    if(validators.isEmpty(data.company)){
        errors.title= "Company name is required";
    }
    
    if(validators.isEmpty(data.from)){
        errors.title= "Job start date is required";
    }

    
  return {
    errors,
    isValid: isEmpty(errors)
  };
};