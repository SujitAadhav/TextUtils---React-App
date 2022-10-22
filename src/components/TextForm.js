import React, {useState} from 'react'
import './Style.css'

export default function TextForm(props) {
    const handleUpClick = () => {
        // console.log("Uppercase was clicked" + text);
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to Uppercase", "success")
    }

    const handleLoClick = () =>{
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to Lowercase", "success")
    }
    
    const handleSpeakClick = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Auto read mode has been enabled", "success")
    }

    const handleClearClick = () => {
        let newText = '';
        setText(newText);
        props.showAlert("Text has been cleared", "success")
    }

    const handleCopyClick = () =>{
        let text = document.getElementById('myBox');
        text.select();
        navigator.clipboard.writeText(text.value);
        document.getSelection().removeAllRanges();
        props.showAlert("Coppied to clipboard", "success")
    }

    const handleExtraSpaces = () =>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces has been removed", "success")
    }

    const handleOnChange = (event) =>{
        // console.log("On Change");
        setText(event.target.value);
    }
    const [text, setText] = useState("Enter text here");
    //text = "New Text"; // Wrong way to change the state
    // setText("New Text"); // Correct way to change the state
  return (
   <>
    <div className="container my-3">
        <h1 style={{color: (props.mode === 'dark'? 'white':'black')}}>{props.heading}</h1>
        <div className="mb-3">
        <textarea className="form-control" onChange={handleOnChange} value={text} id="myBox" rows="8" style={{backgroundColor: (props.mode === 'dark'? 'gray':'white'), color: (props.mode === 'dark'? 'white':'black')}}></textarea>
        </div>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleSpeakClick}>Speak</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopyClick}>Copy Text</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
    </div>
    <div className="container my-3" style={{color: (props.mode === 'dark'? 'white':'black')}}>
        <h2>Your text summary</h2>
        <p>{text.split(" ").filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
        <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} Minutes read</p>
        <h2>Preview</h2>
        <p className='text-justify'>{text.length>0? text:'Nothing to preview'}</p>
    </div>
    </>
  )
}
