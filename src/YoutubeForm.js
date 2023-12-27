import React ,{useEffect}from 'react';
import {useForm,useFieldArray,FieldErrors} from 'react-hook-form';
import {DevTool} from '@hookform/devtools';
//let rendercount=0;
// type FormValues = {
//   username: string;
//   email: string;
//   channel: string;
// };

const YoutubeForm=()=>{
    const form=useForm({
      defaultValues:{
        username:'batman',
        email:'',
        channel:"",
        social:{
          twitter:"a",
          facebook:"b"
        },
        phoNumbers:["",""],
        phNumber:[{number:""}],
        age:0,
        date:new Date(),
        mode:"all",
      },
    });
    const{register,control,handleSubmit,formState,watch,getValues,setValue,reset,trigger}=form;
    const{errors,disabled,isDirty,isValid,isSubmitting,isSubmitted,isSubmitSucessful,submitCount}=formState;
    const{fields,append,remove}=useFieldArray({
      name:"phNumber",
      control
    });
    const onSubmit=(data)=>{
        console.log("form submitted",data);
    }
    useEffect(()=>{
      if(isSubmitSucessful){
        reset();
      }
    },[isSubmitSucessful,reset]);
  //   const onError=(errors:FieldErrors())=>{
  //     console.log("form error",errors)
  //   }
  // // useEffect(()=>{
  //  const sub= watch((value)=>{
  //     console.log(value),
  //   })
  //   return ()=>sub.unsubscribe();
  // },[watch])
    //rendercount++;
    const handlerval=()=>{
      console.log("get val",getValues());
    }
    const setVal=()=>{
           setValue("username","");
    }
    return(<>
    <>
    <h1>youtube form </h1>
    
      <form onSubmit={handleSubmit(onSubmit)}>
         <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username"{...register("username",{
          required: {
            value:true,
            message:"username is req."},
        })}/>
        <p className='error'>{errors.username?.message}</p>
        </div>
        <div>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email"{...register("email",{
          pattern:{
            value:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9]+(?:\.[a-zA-Z0-9-]+)*$/,
            message:'invalid email'
          },validate:{
            notAdmin:(fieldValue)=>{
              return  ( fieldValue!=="admin@example.com"||
              "enter a diff email address");
          },},
          notBlackListed:(fieldValue)=>{
            return !fieldValue.endsWith("baddomain.com"||"this domain is not support")
          },
          emailAvailable:async(fieldValue)=>{
            const responese=await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`)
            const data=responese.json();
            return data.length==0 || "email alredy exit"
          },


        })}/>
         <p className='error'>{errors.email?.message}</p>
         </div>

         <div>
        <label  htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel",{
          required:{
            value:true,
            message:'req channel name',
          }
        })}/>
        <p className='error'>{errors.channel?.message}</p>
</div>
<br/>
<div>
        <label htmlFor="twitter">Twitter</label>
        <input type="text" id="twitter"{...register("social.twitter",{
          disabled:watch("channel"===""),
          required:"enter twitter profile",
        }
         ,
        )}/>
        </div>
        <br/>
        <div>

        <label htmlFor="facebook">Facebbok</label>
        <input type="text" id="facebook"{...register("social.facebook")}/>
</div>
<br/>
<div>
        <label htmlFor="primary-phone">Primary phone number</label>
        <input type="text" id="primary-phone"{...register("phoneNumbers.0",{
          required:{
            value:true,
            message:"it is a compalsry req"
          },
        })}/>
        <p className='error'>{errors.phoNumbers?.message}</p>
</div>
<br/>
<div>
        <label htmlFor="secondary-phone">Secondary phone number</label>
        <input type="text" id="secondary-phone"{...register("phoneNumbers.1",{
          required:{
            value:true,
            message:"it is a compalsry req"
          }
        })}/>
        <p className='error'>{errors.phoNumbers?.message}</p>
        </div>
        <div>
        <label  htmlFor="agel">Age</label>
        <input type="number" id="age" {...register("age",{
          valueAsNumber:true,
          required:{
            value:true,
            message:'age is required',
          }
        })}/>
        <p className='error'>{errors.age?.message}</p>
</div> 

<div>
        <label  htmlFor="dob">Date</label>
        <input type="date" id="dob" {...register("dob",{
           valueAsDate:true,
          required:{
            value:true,
            message:'date is req.',
          }
        })}/>
        <p className='error'>{errors.date?.message}</p>
</div>
        
      <label>List if phone numbers</label>
      <div>
        {fields.map((val,index) => {
          return(
                  <div className="form-control" key={val.id}>
                    <input type="text" {...register(`phNumbers.${index}.number`)}/>
                    {(
                      index>0 && (<button type="button" onClick={()=>remove(index)}>Remove</button>
                      )
          )}
                  </div>
          );
        })}
      </div>
      <button type="button" onClick={()=>append({number:""})}>Add number</button>
      
       <button disabled={!isDirty || isSubmitting}>Submit</button>
       <button onClick={()=>{reset()}}>Reset</button>
       <button onClick={()=>{trigger("channel")}}>Validate</button>
       <button type="button" onClick={handlerval}>Get Value</button>
       <button type="button" onClick={setVal}>set Value</button>
       
      </form>
      </>
      <DevTool control={control}/>
    </>)
};

export default YoutubeForm;
