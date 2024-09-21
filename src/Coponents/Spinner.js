import React from 'react';
import { SpinWheel, ISpinWheelProps } from 'spin-wheel-game';

function Spinner() {
    function handleSpinFinish(result) {
        console.log(`Spun to: ${result}`);
        // Handle the result as needed
    }

    const segments = [
        { segmentText: 'Option 1', segColor: 'red' },
        { segmentText: 'Option 2', segColor: 'blue' },
        { segmentText: 'Option 3', segColor: 'green' },
        // Add more segments as needed
    ];

    const spinWheelProps = {
        segments,
        onFinished: handleSpinFinish,
        primaryColor: 'black',
        contrastColor: 'white',
        buttonText: 'Spin',
        isOnlyOnce: false,
        size: 190,
        upDuration: 100,
        downDuration: 600,
        fontFamily: 'Arial',
        arrowLocation: 'top',
        showTextOnSpin: true,
        isSpinSound: true,
    };

    return <SpinWheel {...spinWheelProps} />;
}

export default Spinner;
