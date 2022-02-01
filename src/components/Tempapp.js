import React,{useState,useEffect} from "react";
import  "./css/style.css"
import axios from "axios"
import styled from "styled-components"

const WeatherInfoIcons = {
    sunrise: "https://img.icons8.com/dotty/344/ffffff/sun.png",
   
  
    humidity: "https://img.icons8.com/external-justicon-lineal-justicon/344/ffffff/external-humidity-weather-justicon-lineal-justicon-1.png",
    wind: "https://www.svgrepo.com/show/192951/wind.svg",
    pressure: "https://img.icons8.com/ios/344/ffffff/pressure.png",
    sunset: "https://img.icons8.com/external-prettycons-lineal-prettycons/344/ffffff/external-night-weather-prettycons-lineal-prettycons-2.png",
   

}

const InfoContainer = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
`;
const InfoIcon = styled.img`
width: 36px;
height: 36px;
`;
const InfoLabel = styled.span`
display: flex;
flex-direction: column;
font-size: 14px;
margin: 15px;
& span {
  font-size: 12px;
  text-transform: capitalize;
}
`;

const WeatherInfoContainer = styled.div`
display: flex;
width: 90%;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
flex-wrap: wrap;
`;

const Weatherinfocomponent = (props)=>{
    const {name ,value} = props;
   
    
  
    
    return(
        <InfoContainer>
            <InfoIcon  src = {WeatherInfoIcons[name]}/>
            <InfoLabel>
               {value}
                <span>{name}</span>
            </InfoLabel>
        </InfoContainer>

    )
}


const Tempapp=()=>{

    const [city,setcity] = useState(null)
    const [search, setsearch] = useState("jaipur");
    const getTime = (t)=>{
        return `${new Date(t*1000).getHours()}:${new Date(t*1000).getMinutes()}`

    };
    // const isday = city.current.is_day;


    useEffect( ()=>{
        const fetchApi= async()=>{
            const response =await axios.get(`http://api.weatherapi.com/v1/current.json?key=ef3461bf00d148d8b34141638222801&q=${search}&aqi=no`)
            setcity(response.data);
            console.log(city);
        }
        fetchApi();
       
    }, [search,city])

   


    return(
        <>
            <div className="box">
               <div className="ondata" >
                  <input  className = "infeild"  type="text"  placeholder="Search.."
                       onChange={(event )=> setsearch(event.target.value)}
                  />  
               </div>
             
                    {!city ? (
                <p> data not found</p>
            ) : (
                <div>  
                  <div className="info">
                   <h2 className="location"><i className="fas fa-street-view"></i>{search}</h2>
                    <div className="spann" >
                         <h1 className="temp"> {city.current.temp_c}°C </h1>
                         <span >|{city.current.condition.text}</span>
                    </div>
                    <WeatherInfoContainer>
                        <Weatherinfocomponent name="sunrise" value={getTime(city.location.localtime_epoch)} />
                        <Weatherinfocomponent name="humidity" value={city.current.humidity}/>
                        <Weatherinfocomponent name="wind" value={city.current.wind_kph}/>
                        <Weatherinfocomponent name="pressure" value={city.current.pressure_in}/>
                    </WeatherInfoContainer>

                   </div>
                   <div className="wave -one"></div>
                   <div className="wave -two"></div>
                   <div className="wave -three"></div>
                </div>
            )}

            </div> 
           
        </>

    )

}
export default Tempapp;
