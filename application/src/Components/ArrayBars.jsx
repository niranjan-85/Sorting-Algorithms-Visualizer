import React, { useEffect, useState } from 'react';


const ArrayBars = ()=>{

    const [list, setlist] = useState([]);

    // add red background to 2 values being compared
    async function addClassnames(id1,id2){
        const Elem1 = document.getElementById(`${id1}`);
        const Elem2 = document.getElementById(`${id2}`);
        Elem1.classList.add('select');
        Elem2.classList.add('select');

        // add a delay of 1sec
        await new Promise(resolve => setTimeout(resolve, 5000));
        Elem1.classList.remove('select');
        Elem2.classList.remove('select');
    }

    async function delay(){
        await new Promise(resolve => setTimeout(resolve,5000));
    }


    // Bubble sorting

    async function BubbleSort(){
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
        setlist([...arr])
    }


    //Selection Sorting 

    async function SelectionSort(){
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
    }

    //Insertion Sorting 
    
    async function InsertionSort(){
        let arr = list;
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
        setlist([...arr]);
    }



    async function  _mergeArrays (a, b) {
        const c = []
        let arr = list

        let i=0;
        let j=0;
        while (i<a.length && j<b.length) {
            if(a[i].props.id > b[j].props.id){
                c.push(b[j]);
                j++;
            }
            else{
                c.push(a[i]);
                i++;
            }
        }

      
        //if we still have values, let's add them at the end of `c`
        while (i<a.length) {
          c.push(a[i]);
          i++
        }
        while (j<b.length) {
          c.push(b[j]);
          j++;
        }

        for(i=0;i<c.length;i++){
            arr[i] = c[i];
            await addClassnames(c[i].props.id,c[i].props.id);
        }
        setlist([...arr])

        return c;
      }
      
    async function mergeSort(a) {
        if (a.length < 2) return a
        const middle = Math.floor(a.length / 2)
        const a_l = a.slice(0, middle)
        const a_r = a.slice(middle, a.length)
        const sorted_l = await mergeSort(a_l)
        const sorted_r = await mergeSort(a_r)
        return  await _mergeArrays(sorted_l, sorted_r);
      }


    async function auxmerge(){
        let arr = list;
        const a = await mergeSort(arr);
        setlist([...a])
    }
    

    // Generate an array:
    function generatearray(){

        //slider value input
        const sliderValue=document.getElementById('slide').value;
        const arr = []

        //insert the bar created into arr[]
        for(let i=0;i<sliderValue;i++){
            const Bar_height = Math.floor(Math.random() * (760 - 200 + 1) ) + 200;
            arr.push(<div id={Bar_height} className="bars" style={{height:`${Bar_height}px`}}></div>);
        }

        setlist(arr);
    }

    return(
        <div>
            <div className="header mt-4 p-3 mb-3">
                <div className="slider">
                    <label>Array Size :</label>
                    <input type="range" min="10" max="100" id="slide" onChange={generatearray} ></input>
                    <button type="button" className="btn btn-success p-2 mx-3" onClick={generatearray}>New array</button>
                </div>
                <div className="btns">
                    <button type="button" className="btn btn-outline-info p-3" onClick={BubbleSort}>Bubble Sort</button>
                    <button type="button" className="btn btn-outline-info p-3" onClick={SelectionSort}>Selection Sort</button>
                    <button type="button" className="btn btn-outline-info p-3" onClick={InsertionSort}>Insertion Sort</button>
                    <button type="button" className="btn btn-outline-info p-3" onClick={auxmerge}>Merge Sort</button>
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