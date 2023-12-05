import React, {useId} from 'react'
//select component for dropdown active or inactive 
function Select({
    //first we take options then label className as it is empty and others properties ko ley ne ki liya ...props pass kar dea
    options,
    label,
    className,
    ...props
}, ref) {//here we also pass the ref 
    const id = useId()
  return (
    <div className='w-full'>
        {/* if label hey then label ko pass kar dea */}
        {label && <label htmlFor={id} className=''></label>}
        <select
        //here select ki inside we have pass all the properties as variable and also our ref
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {/* here we didnt directly loop for the options bcz if options ki inside value nehi hoti toh loop karney sey crasshh ho sakta hey */}
            {/* so first we check agar options hey toh loop chalao  */}
            {options?.map((option) => (
                //options ki inside key and value pass karna pare ga.and options ko ham key and value hesebey pass kar dea as they are unique
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)//here we export select ki sath forwardRef ko bhi