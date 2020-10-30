import React, {useState} from 'react'
import logo from './logo.png';
import './App.css';
import axios from 'axios';
import Loader from 'react-loader-spinner'

function App() {
  const [url, setUrl] = useState("")
  const [shortLink, setShortLink] = useState(false)
  const [generatingLink, setGeneratingLink] = useState(false)

  const handleChange = event => {
    setUrl(event.target.value)
    setShortLink(false)
  }

  const handleSubmit = event => {
    event.preventDefault();

    const data = {
      url: url
    };
    setGeneratingLink(true);
    setTimeout(() => {  console.log("World!"); }, 4000);
    axios.post(`https://link-itt.herokuapp.com/`, data)
      .then(res => {
        console.log(res.data[0]);
        setUrl(res.data[0])
        setShortLink(true)
        setGeneratingLink(false);
      })
      .catch(error => {
        console.log(error)
      })
  }

  function copyText() {
    if (document.getElementById("shortUrl")){
      /* Get the text field */
      var copyText = document.getElementById("shortUrl");
  
      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    
      /* Copy the text inside the text field */
      document.execCommand("copy");
    }
    
  } 
  
  let shortUrl;
  if (shortLink){
    shortUrl = 
    <div>
      <h3 style={{fontWeight: "normal"}}>Here's your tinyer link.</h3>
      <a href={`https://link-itt.herokuapp.com/${url.shortID}`} >
        <input style={{width: `21%`, fontSize: "1.5rem", textDecoration: "underline", color: "blue"}} readOnly type="text" id="shortUrl" value = {`https://link-itt.herokuapp.com/${url.shortID}`} />
      </a>
      <button class="copy" style={{fontSize: "1.2rem", fontFamily: "sans-serif"}} onClick={copyText}>Copy</button>
    </div>
  } else {
  }
  return (
    <div className="App">
        <img src={logo} style={{width: "13%"}}className="" alt="logo" />
        <h2 style={{fontWeight: "normal"}}>Turn your long links into tiny links!</h2>
        <form action="" onSubmit={handleSubmit}>
          <input style= {{width: "30%", fontSize: "1.2rem", textAlign: "center"}} required placeholder="Insert long URL here" type="url" name="url" id="url" onChange={handleChange}></input>
          <br/>
          {generatingLink ? <div><Loader style={{marginTop: "2%"}} type="Oval" color="#00BFFF" height={50} width={80} /><h3 style={{fontWeight: "normal"}}>Generating Link...</h3></div> : <button class="shortify" style={{marginTop: "1%", fontSize: "1.2rem"}}type="submit">Shortify</button>}
        </form>
        
        <br/>
        
        {shortUrl}
    </div>
  );
}


export default App;
