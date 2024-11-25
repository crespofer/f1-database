import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import RaceDescription from "../components/RaceDescription";
import NotFoundPage from "./NotFoundPage.jsx"
import loadingGif from "../assets/loading.gif"
import "./SearchResults.css"
import ChecoCelebration from "../components/ChecoCelebration";

function SearchPageResults(){
    const { year, circuitId } = useParams();
    const [results, setResults] = useState(null);
    const [raceInfo, setRaceInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isChecoFirst, setIsChecoFirst] = useState(false);

    const abortControllerRef = useRef(null);
    const URL = `https://ergast.com/api/f1/${year}/circuits/${circuitId}/results.json`;

    useEffect(() => {
        const fetchRaceData = async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            try{
                const response = await fetch(URL, {
                    signal: abortControllerRef.current?.signal,
                });
                const raceResults = await response.json();

                setRaceInfo(raceResults.MRData.RaceTable.Races[0]);
                setResults(raceResults.MRData.RaceTable.Races[0].Results); // stores drivers results

                if(raceResults.MRData.RaceTable.Races[0].Results[0].Driver.driverId === "perez"){
                    setIsChecoFirst(true);
                }
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

    if(error){
        console.log(error);
        return <NotFoundPage/>
    }

    if(!raceInfo){
        return <div><img className="loading-gif" src={loadingGif} alt="Loading..."/></div>
    }

    return (
        <div>
            <Header></Header>
            <RaceDescription raceName={raceInfo.raceName} round={raceInfo.round} season={raceInfo.season} date={raceInfo.date} circuitName={raceInfo.Circuit.circuitName} country={raceInfo.Circuit.Location.country}/>
            {isChecoFirst && <ChecoCelebration/>}
            <table className={`results-table ${isChecoFirst ? 'checo-celebration' : ''}`}>
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
                            <tr key={result.Driver.driverId}>
                                <td>{result.position}</td>
                                <td>{result.Driver.givenName} {result.Driver.familyName}</td>
                                <td>{result.Constructor.name}</td>
                                <td>{result.status === "Finished" ? result.Time.time : result.status}</td>
                                <td>{result.points}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default SearchPageResults