import { useCallback, useState , useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState('false');
  const [charAllowed, setCharAllowed] = useState('false');
  const [password, setPassword] = useState("");
  // useRef
  const passwordRef = useRef(null)

  const passWordGenerator = useCallback(() =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str+="0123456789"
    }
    if (charAllowed) {
      str += "!@#$%^&*~-_";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  },[length, numberAllowed, charAllowed, setPassword]
)
const copyPassword = useCallback(()=>{
  // to optimize and make more user friendly we can make our selected text bluish using function written below
  passwordRef.current?.select()
  // if we want to select within range then we can use this function
  // passwordRef.current?.setSelectionRange(0,6)
  window.navigator.clipboard.writeText(password)
},[password])
// we used callBack also to memoize the code we can make this function without using callBack hook
// const copyPassword =()=>{
//   window.navigator.clipboard.writeText(password)
// }

useEffect(()=>{passWordGenerator()}, [length, numberAllowed, charAllowed, passWordGenerator])
  return (
    <div className="w-full max-w-md mx-auto rounded-lg py-8 px-6 shadow-md text-pink-500 bg-gray my-8"> 
    <h2 className='text-white text-centre my-3'>Password Generator</h2>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref={passwordRef}
       />
      <button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" 
        min={1}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) =>{setLength(e.target.value)}}
        />
        <label>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked = {numberAllowed}
        id='numberInput'
        onChange={() =>{setNumberAllowed((prev) =>!prev);
        }}
        />
        <label htmlFor="numberInput"> Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked = {charAllowed}
        id='charInput'
        onChange={() =>{setCharAllowed((prev) =>!prev);
        }}
        />
        <label htmlFor="charInput"> Characters</label>
      </div>
    </div>
    </div>
      
  )
}

export default App
