import React, {useId} from 'react'
//forwardRef is a hooks which pass the reference of the state for example: we have a login page and also have a input field which we will use for 
//login like password,email ki liya. so input field ak jaygay but our login page onnu jaygay where we want to use those input field then we need a react 
//hooks call forwardRef which pass those input field state ka reference and we can use it.its the usecase.
const Input = React.forwardRef( function Input({
    //this properties same as we have used for Button
    label,
    type = "text",
    className = "",
    ...props
}, ref){//this our ref is reference we want to use for different place
    const id = useId()
    return (
        <div className='w-full'>
            {/* if label pass kara toh label ka properties dea rakha */}
            {label && <label 
            className='inline-block mb-1 pl-1' 
            //here id is optional we can ignore it... it will use for seo purpose or say accessibility ki liya
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}//here we pass our important things ref that we will use for different component
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input