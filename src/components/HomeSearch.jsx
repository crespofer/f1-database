import React, {useState, useEffect} from "react"
import './HomeSearch.css'

function HomeSearch(){
    const [chosenYear, setChosenYear] = useState();

    var yearsList = []
    for(let i = 2023;i>=1950;i--) // populates array with list of valid years(1950-2023)
        yearsList.push(i);

    function handleYearChange(event){
        setChosenYear(event.target.value);
    }

    return (
        <div className="search-container">
            <p className="title">Search for a Race!</p>
            <p className="description">Enter a year and Circuit</p>
            <select value={chosenYear} onChange={handleYearChange}>
                <option>Select a year</option>
                {yearsList.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
    );

}

export default HomeSearch