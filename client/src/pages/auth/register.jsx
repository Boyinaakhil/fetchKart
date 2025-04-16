import CommonForm from "../../components/common/form";
import { registerFormControls } from "../../config/index";
import React from "react";
import {useState} from "react";
import { useDispatch } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { registerUser } from "../../store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const intialState = {
  userName : '',
  email : '',
  password : ''
}

function AuthRegister(){
  const [formData, setFormData] = useState(intialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {toast } = useToast();

  function onSubmit(event){
    event.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{
      if(data?.payload?.success){
        toast({title: data?.payload?.message, variant: 'success'});
        navigate("/auth/login");
      }
      else{
        toast({
          title: data?.payload?.message,
          variant: 'destructive'
        });
      }
      });

  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Create new account
      </h1>
      <p>
        Already have an account
        <Link className="font-medium text-primary" to='/auth/login'>&nbsp; Login</Link>
      </p>
      <CommonForm 
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit = {onSubmit}
        buttonText={'sign Up'}
      />

    </div>
  );
}
export default AuthRegister;