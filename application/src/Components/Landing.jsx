import React, { useEffect } from 'react';

const Landing = ()=>{

    return(
        <div className="header mt-4 p-3 mb-3">
            <div className="slider">
                <label>Array Size :</label>
                <input type="range" min="10" max="100" id="slide" ></input>
            </div>
            <div className="btns">
                <button type="button" class="btn btn-outline-info p-3" id="bubble">Bubble Sort</button>
                <button type="button" class="btn btn-outline-info p-3">Selection Sort</button>
                <button type="button" class="btn btn-outline-info p-3">Insertion Sort</button>
                <button type="button" class="btn btn-outline-info p-3">Merge Sort</button>
                <button type="button" class="btn btn-outline-info p-3">Quick Sort</button>
            </div>
        </div>
    )
}


export default Landing;