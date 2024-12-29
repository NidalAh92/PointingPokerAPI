import React, { useEffect, FunctionComponent, useState } from "react";
import { Button, Box, Typography, TextField, Grid } from '@mui/material'
import { useNavigate } from "react-router-dom";

export const SprintCompoenent: FunctionComponent = () => {
    const navigate = useNavigate();
    const [sprintName, setSprintName] = useState("");

    const generateNewSessionId = () => {

        if (!sprintName.trim()) return;

        const sessionId = Math.random().toString(36).substring(2, 15);
        navigate(`/sprint/${sessionId}/${sprintName}`);
    }

    return (
        <>
            <Grid>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item md={12}>
                        <Typography variant="h4" align="center">Start New Sprint</Typography>
                    </Grid>

                    <Grid item md={4}>
                        <TextField fullWidth label="Sprint Name" variant="outlined" onChange={(e) => setSprintName(e.target.value)} />
                    </Grid>

                    <Grid item md={2} >
                        <Button fullWidth variant="contained" color="primary" onClick={generateNewSessionId}>
                            START
                        </Button>
                    </Grid>

                </Grid>
            </Grid>
        </>
    );
}

export default SprintCompoenent; 