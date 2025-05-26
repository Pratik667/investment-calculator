import { useState } from 'react';
import './App.css';
import Header from './component/Header';
import UserInput from './component/UserInput';
import Results from './component/Results';

function App() {
  const [userInput, setUserInput] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10,
    });
    
    const validDuration = userInput.duration >= 1;

    function handleChange(inputIdentifier, newValue) {
        setUserInput((prevUserInput) => {
            return {
                ...prevUserInput,
                [inputIdentifier]: +newValue
            };
        });
    }
  return (
    <>
    <Header />
    <UserInput userInput={userInput} handleChange={handleChange}/>
    {!validDuration && <p>Please Enter a Valid Duration.</p>}
    {validDuration && <Results userInput={userInput} />}
    </>
  )
}

export default App
