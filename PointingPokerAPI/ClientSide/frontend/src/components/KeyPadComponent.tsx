import React, { FunctionComponent } from 'react'
import { Grid, Button } from '@mui/material'

type KeyPadProperties = {
    handleVoting: (ponit: string) => void
}

const KeyPadcompnent: FunctionComponent<KeyPadProperties> = (props) => {
    const points = [
        "0 points",
        "½ point",
        "1 point",
        "2 points",
        "3 points",
        "5 points",
        "8 points",
        "13 points",
        "20 points",
        "40 points",
        "100 points",
        "?",
    ];

    return (
        <>
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
                {points.map((point, index) => (
                    <button
                        key={index}
                        className="bg-blue-500 text-white font-bold text-xs py-2 px-4 rounded hover:bg-blue-600"
                        onClick={() => props.handleVoting(point)}
                    >
                        {point}
                    </button>
                ))}
            </div>
        </>
    );
}


export default KeyPadcompnent; 