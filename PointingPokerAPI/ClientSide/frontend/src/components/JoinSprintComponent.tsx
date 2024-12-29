import React, { useEffect, FunctionComponent, useState } from "react";
import { Button, Box, Typography, TextField, Grid } from '@mui/material'
import { useNavigate, useParams } from "react-router-dom";
import connection from "../Hub/Connection";
import HomeComponent from "./HomeComponent";


export const JoinSprintComponent: FunctionComponent = () => {
    const [playerName, setPlayerName] = useState("");
    const navigate = useNavigate();
    const { sessionId, sprintName } = useParams();
    const [hasJoined, setHasJoined] = useState(false);

    const joinSprint = async () => {
        try {
            if (!playerName.trim()) return;

            if (connection.state !== "Connected") {
                await connection.start();
            }

            const player = { name: playerName, sessionId: sessionId, votedValue: '' };
            connection.invoke("JoinSprint", player);

            setHasJoined(true);
        } catch (ex) { }
    };

    return (
        <>
            {!hasJoined ?
                <Grid>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item md={12}>
                            <Typography variant="h4" align="center">Join {sprintName} Sprint</Typography>
                        </Grid>

                        <Grid item md={4}>
                            <TextField fullWidth label="Player Name" variant="outlined" onChange={(e) => setPlayerName(e.target.value)} />
                        </Grid>

                        <Grid item md={2} >
                            <Button fullWidth variant="contained" color="primary" onClick={joinSprint}>
                                Join
                            </Button>
                        </Grid>

                    </Grid>
                </Grid> : <HomeComponent sessionId={sessionId} playerName={playerName} sprintName={sprintName} />
            }
        </>
    );
}

export default JoinSprintComponent;