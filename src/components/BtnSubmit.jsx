import React from 'react';
import { Link } from "react-router-dom";


function BtnSubmit({ content}) {
  return (

  <button className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">{content}</button>

  )
}

export default BtnSubmit