import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/layout";
import Home from "./Home/home";
import CountriesPage from "./countries/countries-page";
import CountryDetails from "./countries/countries-details";
import ChuckNorrisJokePage from "./chuck-norris-joke/chuck-norris-joke";
import AboutPage from "./about/about";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>   
                <Route path="/" element={<Home />} />
                <Route path="countries/" element={<CountriesPage />}>
                    <Route path=":countryCode" element={<CountryDetails />} />
                </Route>
                <Route path="chuck-norris-joke/" element={<ChuckNorrisJokePage />} />
                <Route path="about/" element={<AboutPage />} />
            </Route>
        </Routes>
    )
}
