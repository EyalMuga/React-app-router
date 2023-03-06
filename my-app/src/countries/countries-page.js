import { Grid, List, ListItem, ListItemButton } from "@mui/material";
import { Box } from "@mui/system";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete"
import getCountry from "./countries-page";


export default function CountriesPage() {
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState(null)

    const getCountries = () => {
        setLoading(true);
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((response) => {
                setCountries(response.data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error)
                setLoading(false)
            })
    }

    useEffect(() => {
        getCountries();
    }, [])

    return (
        <>
            <h1>Countries</h1>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={countries}
                getOptionLabel={(option) => option.name.common}
                style={{ width: 300 }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="country"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                )}
			/>
				{loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {countries && (
                <List>
                    {countries
                        .filter((country) => {
                            if (search == null) return country
                            else if (
                                country.name.common
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            ) {
                                getCountry()
                            }	
						})}
				</List>
			)}
			</>
		)
	}