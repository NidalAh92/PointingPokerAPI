import React, { useEffect, FunctionComponent, useState } from "react";
import connection from "../Hub/Connection";
import { Player } from "../Models/Player";
import { Button, Grid } from "@mui/material";
import KeyPadcompnent from "./KeyPadComponent";
import PlayersComponent from "./PlayersComponent";

type HomeProp = {
    sessionId: string | undefined,
    playerName: string | undefined,
    sprintName: string | undefined
}

export const HomeComponent: FunctionComponent<HomeProp> = (props) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [isShowVotes, setShowVotes] = useState(false);


    useEffect(() => {
        startConnection();
    }, []);


    const startConnection = async () => {
        try {

            await checkConnection();

            connection.on("PlayerJoined", (updatedPlayers: Player[]) => {
                setPlayers(updatedPlayers);
            });

            connection.on("PlayerVoted", (updatedPlayers: Player[]) => {
                setPlayers(updatedPlayers);
            });

            connection.on("ClearVoting", (updatedPlayers: Player[]) => {
                setPlayers(updatedPlayers);
            });

            connection.on("ShowVoting", (updatedPlayers: Player[]) => {
                setPlayers(updatedPlayers);
            });

        } catch (err) {
        }
    };

    const handleVoting = async (point: string) => {
        if (!props.sessionId) {
            return;
        }

        await checkConnection();

        await connection.invoke("UpdatePlayerVote", props.sessionId, point);
    }

    const showVoting = async () => {
        try {

            await checkConnection();
            await connection.invoke('ShowVoting', props.sessionId);
            setShowVotes(true);

        } catch (err) {
        }
    }

    const clearVoting = async () => {
        setShowVotes(false);

        try {

            await checkConnection();
            await connection.invoke('ClearVoting', props.sessionId);

        } catch (err) {
        }
    }



    const checkConnection = async () => {
        try {
            if (connection.state !== "Connected") {
                await connection.start();
            }
        } catch (err) {
        }
    }

    return (
        <>
            <div className="flex flex-col items-center min-h-screen space-y-10">

                <h1 className="text-5xl font-bold text-blue-600">{props.sprintName}</h1>

                <KeyPadcompnent handleVoting={handleVoting} />

                <PlayersComponent players={players} />

            </div>
        </>
    );
}

export default HomeComponent;