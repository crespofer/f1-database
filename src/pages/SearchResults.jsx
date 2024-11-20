import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function SearchPageResults(){
    const params = useParams();

    return (
        <div>
            <Header></Header>
            <h1>Year: {params.year}</h1>
            <h1>Circuit: {params.circuit}</h1>
        </div>
    );
}

export default SearchPageResults