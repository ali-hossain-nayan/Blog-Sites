import React from 'react'
//container is like a box which takes the properties as a children in container add
//style for all properties like height,width header ,footer and this is apply for 
//all components 
function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
  
}
//when we return the one line then need not use () it like function one line return 
//no need carlibases
export default Container