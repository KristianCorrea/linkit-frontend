import React, {useState} from 'react'
import logo from './logo.png';
import './App.css';
import axios from 'axios';
function App() {
  const [url, setUrl] = useState("")
  const [shortLink, setShortLink] = useState(false)

  const handleChange = event => {
    setUrl(event.target.value)
    setShortLink(false)
  }

  const handleSubmit = event => {
    event.preventDefault();

    const data = {
      url: url
    };

    axios.post(`https://link-itt.herokuapp.com/`, data)
      .then(res => {
        console.log(res.data[0]);
        setUrl(res.data[0])
        setShortLink(true)
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
      <h3>Here's your tinyer link.</h3>
      <input style={{width: `21%`, fontSize: "1.5rem"}} readonly type="text" id="shortUrl" value = {`https://link-itt.herokuapp.com/${url.shortID}`} /><button style={{fontSize: "1.5rem", fontFamily: "sans-serif"}}onClick= {copyText}>Copy to Clipboard</button>
    </div>
  } else {
  }
  return (
    <div className="App">
        <img src={logo} style={{width: "10%"}}className="" alt="logo" />
        <h2>Turn your long links into tiny links!</h2>
        <form action="" onSubmit={handleSubmit}>
          <input style= {{width: "30%", fontSize: "1.2rem", textAlign: "center"}} required placeholder="Insert long URL here" type="url" name="url" id="url" onChange={handleChange}></input>
          <br/>
          <button style={{marginTop: "1%", fontSize: "1.2rem"}}type="submit">Squeeze Link!</button>
        </form>
        
        <br/>
        
        {shortUrl}
    </div>
  );
}

export default App;
