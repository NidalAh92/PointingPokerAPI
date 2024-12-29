import React, { useEffect, FunctionComponent, useState } from "react";
import { Button, Box, Typography, TextField, Grid } from '@mui/material'
import { Player } from "../Models/Player";

type playerComponentProps =
    {
        players: Player[]
    }

export const PlayersComponent: FunctionComponent<playerComponentProps> = (props) => {

    const getVotingValue = (player: Player) => {

        if (player.votedValue) {
            return player.showVoting ? player.votedValue : 'Voted';
        }

        return '-';
    }

    return (
        <>
            <table className="table-auto w-1/2 mx-auto border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-center px-6 py-3 border border-gray-300">Players</th>
                        <th className="text-center   px-6 py-3 border border-gray-300">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.players.map((player) =>
                            <tr>
                                <td className="px-4 text-left border border-gray-300">
                                    {player.name}
                                </td>
                                <td className="px-4 text-left border border-gray-300">
                                    {getVotingValue(player)}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default PlayersComponent;