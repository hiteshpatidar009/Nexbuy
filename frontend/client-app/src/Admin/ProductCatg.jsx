import React, { useEffect, useState } from 'react';
import axios from "axios";
 
function ProductCatg() {
 
    const[pcatgid , setPCatgId]=useState();
    const[pcatgname , setPCatgName ]=useState();
    // const[pcatgList , setPCatgList]=useState([]);

    const handlePCatgName=(evt)=>{
        setPCatgName(evt.target.value);

    }

   

    useEffect(()=>{
        axios.get("http://localhost:9669/productcatg/show").then((res)=>{
            setPCatgId(res.data.length+1);//this code will set product category Id automaically 
        }).catch((err)=>{
            alert(err);
        })
    })

    const handleSaveButton=()=>{
        var obj={
            PCatgId:pcatgid,
            PCatgName:pcatgname
         }
      axios.post("http://localhost:9669/productcatg/save",obj).then((res)=>{
        alert(res);

      }).catch((err)=>{
        alert(err);
      })

    }
    return(
        <div>
            <center>
                <h4>Manage Product  Category</h4>
                <table>
                    <tr>
                        <td>Product Category Id </td>
                        <td>{pcatgid}</td>
                    </tr>

                    <tr>
                        <td>Product Category Name </td>
                        <td><input type='text' onChange={handlePCatgName} /> </td>
                    </tr>

                    <tr>
                        <td>  </td>
                        <td><button type='submit' onClick={handleSaveButton} >submit</button> </td>
                    </tr>
                    
                </table>
            </center>
        </div>
    )


}
export default ProductCatg