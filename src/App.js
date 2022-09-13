import React from 'react';
import JSONDATA from "./MOCK_DATA.json";
import { useState,useMemo ,useEffect} from 'react';
import debounce from 'lodash.debounce';
import "./App.css";
function App() {
  const [searchWord, setSearchWord] = useState("");//allows us to track state 
  const [datas,setData]=useState(JSONDATA);
  const handleChange = (e) => {
    setSearchWord(e.target.value); //event handler for the target element within our React application
  };
  const debounceD = useMemo(() => {//returns a memoized value
    return debounce(handleChange, 900);
  }, []);
  useEffect(()=>{
   let inputs = JSONDATA.filter((val) => {
      if (val.first_name.toUpperCase().includes(searchWord.toUpperCase())) {            
       return val;
       }
       else if (searchWord === "") {
         return val;
       }})
       setData(inputs);
  },[searchWord])
  useEffect(() => {
    return () => {
      debounceD.cancel();
    }; });
  return (
    <center>
      <div className="App">
        <input id="searchbar" type="text" placeholder='search by name'onChange={debounceD}/>
        {
        datas.map((val, key) => {
          if(searchWord){
          let splitinput = val.first_name.split(searchWord)
          return <div><p>{splitinput[0]}<em>{searchWord}</em>{splitinput[1]}</p></div>
          }
          else {
            return <div><p>{val.first_name}</p></div>
          }
        })}
      </div>
    </center>
  );}
export default App;
// useMemo optimization technique for accelerating computer programs by caching 
// the results of heavy function calls and returning them when similar inputs are
//  encountered repeatedly
