import React, { useEffect, useState } from 'react';


const ArrayBars = ()=>{

    const [list, setlist] = useState([]);

    function controlElements(isdisabled){
        let InputElemArray = document.getElementsByClassName('block');
        for(var i=0;i<InputElemArray.length;i++){
            InputElemArray[i].disabled = isdisabled;
        }
    }


    // add red background to 2 values being compared
    async function addClassnames(id1,id2){
        const Elem1 = document.getElementById(`${id1}`);
        const Elem2 = document.getElementById(`${id2}`);
        Elem1.classList.add('select');
        Elem2.classList.add('select');

        // add a delay of 1sec
        await new Promise(resolve => setTimeout(resolve, 100));
        Elem1.classList.remove('select');
        Elem2.classList.remove('select');
    }

    async function delay(){
        await new Promise(resolve => setTimeout(resolve,100));
    }


    // Bubble sorting

    async function BubbleSort(){
        controlElements(1)
        //shallow copy of list[] 
        let arr=list;

        //bubble sort algorithm
        for(var i=0;i<arr.length-1;i++){
            for(var j=i+1;j<arr.length;j++){
                await addClassnames(arr[i].props.id,arr[j].props.id);

                //swap 2 values
                if(arr[i].props.id > arr[j].props.id){
                    [arr[j], arr[i]] = [arr[i], arr[j]];
                    setlist([...arr])
                }
            }
            //add a green background
            document.getElementById(`${arr[i].props.id}`).classList.add('success-sort')
        }
        
        // final array 
        for(var i=0;i<arr.length;i++){
            document.getElementById(`${arr[i].props.id}`).classList.remove('success-sort')
        }
        controlElements(0);
        setlist([...arr])
    }


    //Selection Sorting 

    async function SelectionSort(){
        controlElements(1);
        let arr=list;
        //selection sort algorithm
        for(var i=0;i<arr.length - 1;i++){
            let min_index = i;
            for(var j=i+1;j<arr.length;j++){
                await addClassnames(arr[min_index].props.id,arr[j].props.id);
                if(arr[min_index].props.id >= arr[j].props.id){
                    min_index= j;
                }
            }
            let temp = arr[i];
            arr[i] = arr[min_index];
            arr[min_index] = temp;
            setlist([...arr])
            document.getElementById(`${arr[i].props.id}`).classList.add('success-sort')
        }
        for(var i=0;i<arr.length;i++){
            document.getElementById(`${arr[i].props.id}`).classList.remove('success-sort')
        }
        setlist([...arr]);
        controlElements(0);

    }

    //Insertion Sorting 
    
    async function InsertionSort(){
        let arr = list;
        controlElements(1);
        for(var i=1;i<arr.length;i++){
            let key = arr[i].props.id;
            let key_div = arr[i];
            let j=i-1;
            document.getElementById(`${key}`).classList.add('min-idx')
            await delay();
            document.getElementById(`${key}`).classList.remove('min-idx')
            while(j>=0 && arr[j].props.id>key ){
                await addClassnames(arr[j].props.id,arr[j+1].props.id);
                arr[j+1] = arr[j];
                j--;
                setlist([...arr]);
            }
            arr[j+1] = key_div;
            setlist([...arr]);
            
        }
        controlElements(0);
        setlist([...arr]);
    }

    

    // Generate an array:
    function generatearray(){

        //slider value input
        const sliderValue=document.getElementById('slide').value;
        const arr = []

        //insert the bar created into arr[]
        for(let i=0;i<sliderValue;i++){
            const Bar_height = Math.floor(Math.random() * (560 - 200 + 1) ) + 200;
            arr.push(<div id={Bar_height} className="bars" style={{height:`${Bar_height}px`}}></div>);
        }

        setlist(arr);
    }

    return(
        <div>
            <div className="header mt-4 p-2 mb-3">
                <div className="slider">
                    <label>Array Size :</label>
                    <input type="range" min="10" className="block slider" max="70" id="slide" onChange={generatearray} ></input>
                    <button type="button" className="block btn-success p-2 mx-3 gen" onClick={generatearray}>New array</button>
                </div>
                <div className="btns">
                    <button type="button" className="block btn btn-outline-info p-2 bubble" onClick={BubbleSort}>Bubble Sort</button>
                    <button type="button" className="block btn btn-outline-info p-2 selection" onClick={SelectionSort}>Selection Sort</button>
                    <button type="button" className="block btn btn-outline-info p-2 insertion" onClick={InsertionSort}>Insertion Sort</button>
                </div>
            </div>
            <div className="array px-5 d-flex justify-content-center align-items-end">
                {                   
                    list.map((item,idx)=>{
                        return item
                    })
                }

            </div>
        </div>
    )

}

export default ArrayBars;