import { loginUser } from "@/store/auth-slice";
import CommonForm from "../../components/common/form";
import { LoginFormControls } from "../../config/index";
import React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const intialState = {
  email : '',
  password : ''
}

function AuthLogin(){
  const [formData, setFormData] = useState(intialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();
  function onSubmit(e){
    e.preventDefault();
    console.log(formData);
    dispatch(loginUser(formData)).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        toast({
          title: data?.payload?.message,
          description: 'You have successfully logged in',

        });
      }else{
        toast({
          title: data?.payload?.message,
          variant: 'destructive'
        });
      }
    })

  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Sign in to your account
      </h1>
      <p>
        Don't have an account
        <Link className="font-medium text-primary" to='/auth/register'>&nbsp; Register</Link>
      </p>
      <CommonForm 
        formControls={LoginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit = {onSubmit}
        buttonText={'sign Up'}
      />

    </div>
  );
}
export default AuthLogin;