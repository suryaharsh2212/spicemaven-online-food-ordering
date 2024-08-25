import { phone } from 'phone';

const PhoneNoVerifier = (phno) => {
  const result = phone(phno, {
    country: "IN",              
    validateMobilePrefix: true,  
    strictDetection: false     
  });

  return result.isValid;
};



 
 import validator from 'validator';

 const EmailVerifier = (email) => {
   return validator.isEmail(email);
 };
 
 export {PhoneNoVerifier,EmailVerifier}