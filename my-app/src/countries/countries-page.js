import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemButton,
    Modal,
    backdropClasses,
} from "@mui/material";

import { Box } from "@mui/system"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import * as React from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { grey } from "@mui/material/colors"

export default function CountriesPage() {
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(null)

    const getCountries = () => {
        setLoading(true)
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
        getCountries()
    }, [])

    const handleOpen = (country) => {
        setSelectedCountry(country)
    }

    const handleClose = () => {
        setSelectedCountry(null)
    }

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Countries</h1>
            <button
				onClick={() => setSearch("")}
                style={{ margin: "auto", display: "block" }}
            >
                Clear Search
            </button>
            <br />
            <br />

            <Autocomplete
                disablePortal
                options={countries}
                getOptionLabel={(option) => option.name.common}
                style={{ width: 300, margin: "auto" }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="search for country"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                )}
				onChange={(e, value) => {
					setSearch(value.name.common)
				}}
            />
            <br />

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {countries && (
                <Grid container spacing={2}>
                    {countries
                        .filter((country) => {
                            if (search == null) return country
                            else if (
                                country.name.common
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            ) {
                                return country
                            }
                        })
                        .map((country) => (
                            <Grid item key={country.cca3} xs={12} sm={6} md={4}>
                                <Card sx={{ maxWidth: 345, margin: "auto" }}>
                                    <CardActionArea
                                        onClick={() => handleOpen(country)}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={country.flags.png}
                                            alt={country.name.common}
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {country.name.common}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Capital: {country.capital}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Region: {country.region}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            )}
            {selectedCountry && (
                <Modal
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    open={true}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h2 id="modal-modal-title">
                            {selectedCountry.name.common}
                        </h2>
                        <p id="modal-modal-description">
                            Capital: {selectedCountry.capital}
                        </p>
                        <p id="modal-modal-description">
                            Region: {selectedCountry.region}
                        </p>
                        <p id="modal-modal-description">
                            Subregion: {selectedCountry.subregion}
                        </p>
                        <p id="modal-modal-description">
                            Population: {selectedCountry.population}
                        </p>
                        <p id="modal-modal-description">
                            Area: {selectedCountry.area}
                        </p>
                        <p id="modal-modal-description">
                            Language:{" "}
                            {Object.values(selectedCountry.languages)[0]}
                        </p>
                        <p id="modal-modal-description">
                            Currency:{" "}
                            {Object.values(selectedCountry.currencies)[0].name}
                        </p>
                        <p id="modal-modal-description">
                            {" "}
                            <img
                                src={selectedCountry.flags.png}
                                alt={selectedCountry.name.common}
                            />
                        </p>
                    </Box>
                </Modal>
            )}
        </>
    )
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pointerEvents: "auto",
    outline: "none",
    backgroundColor: "#fff",
    zIndex: 9999,
    textAlign: "center",
}
