import React from "react";
//inside button we pass some value first one is children
export default function Button({
    children,
    type = "button",//button type these are default value we have taken
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",//className take empty bcz if someone one give the value then we can override it
    ...props
}) {
    return (
        //here bgColor,textColor,className variable pass bcz if user want to pass the value we can overide it
        //default className ham kuch de dea and one thing ...props pass kora bcz if user want pass more attribut then we can spread it as we can accept it
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {/* children orginally the text */}
            {children}
        </button>
    );
}