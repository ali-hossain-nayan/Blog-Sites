import React from 'react'
import {Editor } from '@tinymce/tinymce-react';//as we box ki undar edit kar ney k liya tinymce use kara so editor onsey import hota hey
import {Controller } from 'react-hook-form';

//RTE->Real Time Editor . form ko different place mey edit kar ney k liya reference pass kar na lagta hey as we did it input field ko pass kara with
//forwardRef hooks sey leking react-hook-form mey hame ak parameter milte hey controller namesey jisney reference ka kam karta hey
export default function RTE({name, control, label, defaultValue =""}) {//here is control that ref ka kam kara
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
{/* inside the controller we pass kara our control ju bi control ko call kara usko yeh se response mile ga */}
    <Controller
    name={name || "content"}
    control={control}//here
    //render ki undar sab ko field bola jata hey aagar field ko undar kuch bhi change hoa then hamko batana with render k sath
    render={({field: {onChange}}) => (
      //and we pass our rendering value inside editor
        <Editor
        initialValue={defaultValue}//initial value default empty string rakha
        init={{//after initialing here we give the start mey kea howa
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}//here onChange ko call kiya
        />
    )}
    />

     </div>
  )
}
