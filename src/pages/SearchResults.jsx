import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import RaceDescription from "../components/RaceDescription";
import NotFoundPage from "./NotFoundPage.jsx"
import loadingGif from "../assets/loading.gif"
import "./SearchResults.css"

function SearchPageResults(){
    const { year, circuitId } = useParams();
    const [results, setResults] = useState(null);
    const [raceInfo, setRaceInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const abortControllerRef = useRef(null);
    const URL = `https://ergast.com/api/f1/${year}/circuits/${circuitId}/results.json`;

    useEffect(() => {
        const fetchRaceData = async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            //setIsLoading(true);

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

    }, [year, circuitId]);

    function whatever(){
        console.log(results);
    }

    if(error){
        return <NotFoundPage/>
    }

    if(!raceInfo){
        return <div><img src={loadingGif} alt="Loading..."/></div>
    }

    return (
        <div>
            <Header></Header>
            <RaceDescription raceName={raceInfo.raceName} round={raceInfo.round} season={raceInfo.season} date={raceInfo.date} circuitName={raceInfo.Circuit.circuitName} country={raceInfo.Circuit.Location.country}/>
            <table className="results-table">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Time/Status</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        results.map(result => (
                            <tr>
                                <td>{result.position}</td>
                                <td>{result.Driver.givenName} {result.Driver.familyName}</td>
                                <td>{result.Constructor.name}</td>
                                <td>{result.status === "Finished" ? result.Time.time : result.status}</td>
                                <td>{result.points}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {/* <button onClick={whatever}>Click</button> */}
        </div>
    );
}

export default SearchPageResults