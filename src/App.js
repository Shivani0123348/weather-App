
import { useEffect, useState } from 'react';
import './App.css';

function App() {
const [city,setcity]=useState("Kanpur");
const [weather,setweather]=useState(null);

const currentDate=new Date();
const months=[
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]
const month=months[currentDate.getMonth()];
const Day=currentDate.getDate();
const year=currentDate.getFullYear();
const formattedDate=`${month} ${Day} ${year}`

const API_KEY="44b67479646d0645fd52402e61dba5f5"
const fetchweather= async()=>{
  let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
  
  response=await response.json();
  setweather(response);
console.log(response);

}

useEffect(()=>{
  fetchweather();
  
},[])

const handleSubmit=(e)=>{
  e.preventDefault();
 fetchweather(); 
}
return(
  <>
  <div style={{backgroundColor:"lightblue",width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <div style={{backgroundColor:"white",height:"70%",width:"20%",boxShadow:"0px 4px 8px rgba(0,0,0,0.3)",display:"flex",flexDirection:"column",gap:"0px",alignItems:"center"}}>
    <p style={{color:"black"}}>{formattedDate}</p>
   {weather&&(
    <>
     <h3 style={{color:"black"}}>{weather.name}</h3>
    <img src="https://imgs.search.brave.com/CEVb94gVCaYTRzUURsMPoG_kipzy9q7BevWR7rsDk9Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1Lzc5LzUzLzQw/LzM2MF9GXzE1Nzk1/MzQwNjRfUkpKQ2ts/ODNqaTB1dFEwZEVZ/Tko0QnRuTEVwamhM/U0guanBn" alt="Current Weather Condition" style={{height:"20%",width:"20%",borderRadius:"50%"}}/>
   <h1 style={{color:"black"}}>{weather.main.humidity}</h1>
   <p style={{color:"black"}}>{weather.weather[0].main}</p>
   <form onSubmit={handleSubmit} >
   <input type="text" placeholder="Enter City" style={{width:"80%",textAlign:"center", margin:"0 0 0 1.5vw"}}value={city} onChange={(e)=>setcity(e.target.value)} />
   <button type="submit"style={{backgroundColor:"black",color:"white",width:"30%",height:"50%",marginTop:"0.3vw",marginLeft:"6.8vw",borderRadius:"0 4px 0 4px"}}>GET</button>
   </form>
   </>
   )}
    </div>
    </div> 
  </>
);
 
}

export default App;
