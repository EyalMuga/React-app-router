import { AppBar, MenuItem, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "./layout.css";

export default function Layout() {
    const currLocation = useLocation()


    return (
        <Box>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <MenuItem>
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="countries/" className="nav-link">
                            Countries
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="chuck-norris-joke/" className="nav-link">
                            Chuck Norris Joke
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="about/" className="nav-link">
                            About
                        </Link>
                    </MenuItem>
                </Toolbar>
            </AppBar>

            <Outlet />
        </Box>
    );
}
