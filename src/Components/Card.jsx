import React from 'react'
import { useState } from 'react'

const Card = () => {
    const [search, setsearch] = useState("");
    const [movies, setMovies] = useState([]);

    const handleSearch = async () =>{
        const res =await fetch(`https://www.omdbapi.com/?s=${search}&apikey=7a003102`);
        const data = await res.json();
        setMovies(data.Search);         
    }
    
    
    return ( 
        <div className="mt-2 text-center">
            <input type="text" value={search} onChange={(e)=>setsearch(e.target.value)} placeholder="Enter Movie Name.."/>
            <button onClick={handleSearch} className="btn search">Search</button>
            <div className="container">
                <div className="row">
                    {
                        movies ? (
                            movies.map((val)=>{
                    
                                return(
                                    <div className="col-10 col-md-4 mt-2">
                                        <div><img src={val.Poster} alt="poster" /></div>
                                        <h5>{val.Title}</h5>
                                    </div>
                                )
                            })
                        ):<h5 className="mt-3">Sorry nothing Found</h5>
                        
                    }
                </div>
            </div>
        </div>
    )
}

export default Card 
