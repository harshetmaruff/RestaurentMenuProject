import React, { useState, useEffect } from "react";
import './Button.css';

function CategoryButtons({SetFilter, Name}) {

    
    return(
        <button onClick={() => SetFilter(Name)}>
            { Name.toUpperCase() }
        </button>
    )
}

export default CategoryButtons;