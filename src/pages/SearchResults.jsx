import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import RaceDescription from "../components/RaceDescription";
import NotFoundPage from "./NotFoundPage.jsx"

function SearchPageResults(){
    const { year, circuitId } = useParams();
    const [results, setResults] = useState();
    const [raceInfo, setRaceInfo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const abortControllerRef = useRef(null);
    const URL = `https://ergast.com/api/f1/${year}/circuits/${circuitId}/results.json`;

    useEffect(() => {
        const fetchRaceData = async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            setIsLoading(true);

            try{
                const response = await fetch(URL, {
                    signal: abortControllerRef.current?.signal,
                });
                const raceResults = await response.json();

                setRaceInfo(raceResults.MRData.RaceTable.Races[0]);
                setResults(raceResults.MRData.RaceTable.Races[0].Results); // stores drivers results
            } catch(e) {
                if(e.name === "AbortError"){
                    console.log("Aborted");
                    return;
                }
                setError(e);
            } finally{
                setIsLoading(false);
            }
        };
        fetchRaceData();

    }, []);

    function whatever(){
        console.log(raceInfo);
        console.log(results);
    }

    if(error){
        return <NotFoundPage/>
    }

    return (
        <div>
            <Header></Header>
            <RaceDescription raceName={raceInfo.raceName} round={raceInfo.round} season={raceInfo.season} date={raceInfo.date} circuitName={raceInfo.Circuit.circuitName} country={raceInfo.Circuit.Location.country}/>
            {/* <button onClick={whatever}>Click</button> */}
        </div>
    );
}

export default SearchPageResults