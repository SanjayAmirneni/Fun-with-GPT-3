import React, { useState } from 'react';
import './App.css';
const { Configuration , OpenAIApi} = require("openai")



function App() {
 
  const [promptValue, setPromptValue] = useState("");

  const [reply, setReply] = useState([]);


     const configuration = new Configuration({
      apiKey:process.env.REACT_APP_OPENAI_SECRET,
    });


  const submit= async (e) => {



        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion("text-curie-001", {
          prompt: promptValue,
          temperature: 0,
          max_tokens: 6,
        });

        // console.log(response)
        
        if(response.data){
          let itemList = reply.slice();
          itemList.push({"prompt":promptValue,"response":response.data.choices[0].text})
          setReply(itemList)
        }
  }


  return (
          <> 
              <form className="request__container" onSubmit={e=>e.preventDefault()}>
                <h1 className='request__header'>Fun whith AI</h1>
                <p className='request__p'>Enter prompt</p>
                <textarea className='request__textarea'
                  onKeyUp={(e)=>setPromptValue(e.target.value)}
                  placeholder='Enter prompt here...'>
                </textarea>
                <button className='request__button' onClick={submit}>Submit</button>
              </form>

            <div className="request__response">
              {reply.length>0?<h1>Responses</h1>:""}
              {reply?.map((ele,i)=>{
                return (
                  <div key={i} className="request__data" >
                    <div className='reply__data'>
                      <p className='reply__prompt grid__item1'><strong>Prompt&nbsp;&nbsp;&nbsp;</strong></p>
                      <p className='grid__item2'>{ele.prompt}</p>
                    </div>
                    <div className='reply__data'>
                      <p className='reply__response grid__item1'><strong>Response</strong></p>
                      <p className='grid__item2'>{ele.response}</p>
                    </div>
                  </div>
                  )
                })}
            </div>

          </>

  )
}

export default App;
