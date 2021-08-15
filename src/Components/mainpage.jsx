import { object } from 'prop-types';
import React,{useState,useEffect} from 'react'
import Card from './Card'
import firebase from './fire'

const Mainpage = (props) => {

    const [data, setdata] = useState({
        name:"",url:""
    });

    const [fetchdata, setfetchdata] = useState([{}]);

    let name,value;
    const handleChange = (e) =>{
        name=e.target.name;
        value=e.target.value;
        setdata({...data,[name]:value})
    }
    
    const handleSubmit =async(e) =>{
        e.preventDefault();
        const {name,url}=data;
        if(name && url){
            const res = await fetch("https://tracelink-baa57-default-rtdb.firebaseio.com/traclinkdatabase.json",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body:JSON.stringify({name,url})
            });
            const response = await res.json();
            console.log(response);
            if(response){
                setdata({name:"",url:""})
                alert("data added");
            }
        }else{
            alert("please insert all the fields")
        }
    }

    const getData =async ()=>{
        firebase.database().ref('traclinkdatabase').on('value',snapshot=>{
            if (snapshot.val()!= null){
                setfetchdata({
                 ...snapshot.val()
                })
            }
        })
    }
    useEffect(() => {
        getData();
    }, [])
    

    return (
        <>
            <div className="row header pt-2">
                <div className="col-4 ps-4"><h2>Movie Web</h2></div>
                <div className="col-4 text-center">
                <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add Data
                </button>
                <button type="button" className="btn ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                    View Data
                </button>

                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Tracelink</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form method="post" > 
                                <label>Name</label>
                                <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Enter image name"/> <br />
                                <label className="mt-3">Image</label>
                                <input type="text" name="url" value={data.url} onChange={handleChange} placeholder="Enter image url"/>
                                <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                            </form>
                        </div>
                        
                        </div>
                    </div>
                    </div>
                    <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Tracelink</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6"><h5>Name</h5></div>
                                <div className="col-6"><h5>Image</h5></div>
                            </div>
                        <p>
                            {
                                Object.keys(fetchdata).map(val=>{
                                    return <div className="row">
                                        <div className="col-6"><p>{fetchdata[val].name}</p></div>
                                        <div className="col-6"><img src={fetchdata[val].url} alt="image" className="img-fluid mb-2"/></div>
                                        
                                        </div>
                                })
                            }
                        </p>
                        </div>
                        
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-4 text-end pe-5"><button onClick={props.handleLogout} className="logout btn">Logout</button></div>
                
            </div>
           <Card/>
        </>
    )
}

export default Mainpage
