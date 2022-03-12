import React, { useEffect, useState, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthDispatch } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({


    grow: {
        flexGrow: 1
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    button: {

        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    navButton: {
        color: "white",
        marginRight: "15px"
    }
}));

const Dropdown = ({ value, options, placeholder = "Select", onChange }) => {
    const node = useRef();
    const classes = useStyles();
    const [open, setOpen] = useState(false);


    const handleClick = (e) => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setOpen(false);
    };
    const dispatch = useAuthDispatch();
    const handleChange = (selectedValue) => {
        onChange(selectedValue);
        setOpen(false);
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    return (
        <div ref={node} className="dropdown">
            {value == "Profile" ?
                <Button className={`${classes.navButton} ${classes.button}`} href={"/student/profile"}>
                    <Typography variant="body1" noWrap>
                        {value || placeholder}
                    </Typography>
                </Button> :
                <Button className={`${classes.navButton} ${classes.button}`} onClick={(e) => setOpen(!open)}>
                    <Typography variant="body1" noWrap>
                        {value || placeholder}
                    </Typography>  <FaCaretDown></FaCaretDown>
                </Button>
            }
            {
                open && (
                    <ul className="dropdown-menu">
                        {options.map((opt) => (
                            <li
                                className="dropdown-menu-item"
                                onClick={(e) => handleChange(opt)}
                            >
                                <Typography variant="body1" noWrap>
                                    {opt}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div >
    );
};

export default Dropdown;
