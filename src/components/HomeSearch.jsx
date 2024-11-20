import React, {useState, useEffect, useRef} from "react"
import { useNavigate } from "react-router-dom";
import './HomeSearch.css'
import loadingGif from '../assets/loading.gif'

function HomeSearch(){
    const [chosenYear, setChosenYear] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [circuits, setCircuits] = useState([]);
    const [chosenCircuitId, setChosenCircuitId] = useState("");
    const [isYearSelected, setIsYearSelected] = useState(false);
    const [isCircuitSelected, setIsCircuitSelected] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const abortControllerRef = useRef(null);
    const BASE_URL = `https://ergast.com/api/f1/${chosenYear}`;
    const navigate = useNavigate();

    var yearsList = []
    for(let i = 2023;i>=1950;i--) // populates array with list of valid years(1950-2023)
        yearsList.push(i);

    function handleYearChange(event){
        setChosenYear(event.target.value);

        if(event.target.value === "")
        {
            setIsYearSelected(false);
            setChosenCircuitId("");
        }
        else{
            setIsYearSelected(true);
        }
    }

    function handleChosenCircuitChange(event){
        setChosenCircuitId(event.target.value);

        if(event.target.value === ""){
            setIsCircuitSelected(false);
        }
        else{
            setIsCircuitSelected(true);
        }
    }

    function search(){
        if(!isYearSelected || !isCircuitSelected){
            setErrorMessage(true);
            return;
        }
        else{
            setErrorMessage(false);
            navigate(`/results/${chosenYear}/${chosenCircuitId}`);
        }
        
    }

    useEffect(() => {
        if(!chosenYear) return;
        
        const fetchCircuits = async () => {
            abortControllerRef.current?.abort(); // aborts if a controller exists
            abortControllerRef.current = new AbortController(); // sets curr to new controller

            setIsLoading(true);

            try{
                const response = await fetch(`${BASE_URL}/circuits.json`, {
                    signal: abortControllerRef.current?.signal,
                });
                const circuits = await response.json();
                setCircuits(circuits.MRData.CircuitTable.Circuits);
            } catch (e) {
                if(e.name === "AbortError"){
                    console.log("Aborted");
                    return;
                }

                setError(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCircuits();
    }, [chosenYear]);

    if(error)
    {
        console.log(error);
        return <div className="error">
            An Error Occured: Please Try Again
            <button onClick={() => window.location.reload(false)}>Refresh</button>
        </div>
    }

    return (
        <div className="search-container">
            <p className="title">Search for a Race!</p>
            <p className="description">Enter a year and Circuit</p>
            <div className="select-container">
            <select value={chosenYear} onChange={handleYearChange}>
                <option key={0} value="">Select a year</option>
                {yearsList.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <select value={chosenCircuitId} onChange={handleChosenCircuitChange}>
                <option key={-1} value="">Select a Circuit</option>
                {isYearSelected && Array.isArray(circuits) && circuits.map(circuit => (
                    <option key={circuit.circuitId} value={circuit.circuitId}>
                        {circuit.circuitName}
                    </option>
                ))}
            </select>
            </div>
            <button className="search-button" onClick={search}>Search</button>
            {errorMessage && <p className="error-message">Please select year and circuit</p>}
            {isLoading && <img className="loading" src={loadingGif} alt=""/>}
        </div>
    );

}

export default HomeSearch