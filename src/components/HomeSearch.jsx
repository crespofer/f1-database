import React, {useState, useEffect, useRef} from "react"
import './HomeSearch.css'

function HomeSearch(){
    const [chosenYear, setChosenYear] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [circuits, setCircuits] = useState();
    const [chosenCircuitId, setChosenCircuitId] = useState();

    const abortControllerRef = useRef(null);
    const BASE_URL = `https://ergast.com/api/f1/${chosenYear}`;

    var yearsList = []
    for(let i = 2023;i>=1950;i--) // populates array with list of valid years(1950-2023)
        yearsList.push(i);

    function handleYearChange(event){
        setChosenYear(event.target.value);
    }

    function whatever(){
        console.log(circuits.MRData.CircuitTable.Circuits);
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
                setCircuits(circuits);
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

    if(isLoading)
    {
        return <div>Is loading...</div>
    }

    if(error)
    {
        console.log(error);
    }

    return (
        <div className="search-container">
            <p className="title">Search for a Race!</p>
            <p className="description">Enter a year and Circuit</p>
            <select value={chosenYear} onChange={handleYearChange}>
                <option key={0} value="">Select a year</option>
                {yearsList.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <button onClick={whatever}>Test test test</button>
        </div>
    );

}

export default HomeSearch