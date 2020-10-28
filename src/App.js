import React, {useState} from 'react'
import logo from './logo.png';
import './App.css';
import axios from 'axios';
function App() {
  const [url, setUrl] = useState("")
  const [shortLink, setShortLink] = useState(false)

  const handleChange = event => {
    setUrl(event.target.value)
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
    /* Get the text field */
    var copyText = document.getElementById("url");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  } 
  
  let shortUrl;
  if (shortLink){
    shortUrl = <div><input type="text" id="url" value = {`http://98.242.245.160:5000/${url.shortID}`} /><button onClick={copyText()}>Copy text</button></div>
  } else {
  }
  return (
    <div className="App">
      <header className="">
        <img src={logo} style={{width: "10%"}}className="" alt="logo" />
        <form action="" onSubmit={handleSubmit}>
          <input class="input-group mb-3" type="url" name="url" id="url" onChange={handleChange}></input>
          <button type="submit">link it</button>
        </form>
        
        <br/>
        {shortUrl}
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
