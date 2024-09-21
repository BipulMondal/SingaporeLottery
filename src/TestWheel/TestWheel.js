// SpinWheel.js
import React, { useEffect, useRef, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register necessary Chart.js components
Chart.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const TestWheel = () => {
    const wheelRef = useRef(null);
    const [spinDisabled, setSpinDisabled] = useState(false);
    const [finalValue, setFinalValue] = useState('Click On The Spin Button To Start');

    const rotationValues = [
        { minDegree: 0, maxDegree: 30, value: 2 },
        { minDegree: 31, maxDegree: 90, value: 1 },
        { minDegree: 91, maxDegree: 150, value: 6 },
        { minDegree: 151, maxDegree: 210, value: 5 },
        { minDegree: 211, maxDegree: 270, value: 4 },
        { minDegree: 271, maxDegree: 330, value: 3 },
        { minDegree: 331, maxDegree: 360, value: 2 },
    ];

    const data = [16, 16, 16, 16, 16, 16];
    const pieColors = [
        "#8b35bc",
        "#b163da",
        "#8b35bc",
        "#b163da",
        "#8b35bc",
        "#b163da",
    ];

    const valueGenerator = (angleValue) => {
        for (let i of rotationValues) {
            if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
                setFinalValue(`Value: ${i.value}`);
                setSpinDisabled(false);
                break;
            }
        }
    };

    useEffect(() => {
        const ctx = wheelRef.current.getContext('2d');
        const PI2 = Math.PI * 2;
        let myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [1, 2, 3, 4, 5, 6],
                datasets: [{
                    backgroundColor: pieColors,
                    data: data,
                }],
            },
            options: {
                responsive: true,
                animation: { duration: 0 },
                plugins: {
                    tooltip: false,
                    legend: {
                        display: false,
                    },
                    datalabels: {
                        color: '#ffffff',
                        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                        font: { size: 24 },
                    },
                },
                rotation: 0, // Initialize rotation at 0
            },
        });

        const spinWheel = () => {
            setSpinDisabled(true);
            setFinalValue('Good Luck!');

            let randomDegree = Math.floor(Math.random() * 360);
            let count = 0;
            let resultValue = 101;

            const rotationInterval = setInterval(() => {
                myChart.options.rotation += resultValue;
                myChart.update();

                if (myChart.options.rotation >= 360) {
                    count += 1;
                    resultValue -= 5;
                    myChart.options.rotation = 0;
                } else if (count > 15 && Math.round(myChart.options.rotation) === randomDegree) {
                    valueGenerator(randomDegree);
                    clearInterval(rotationInterval);
                    count = 0;
                    resultValue = 101;
                }
            }, 10);
        };

        const spinBtn = document.getElementById('spin-btn');
        spinBtn.addEventListener('click', spinWheel);

        return () => {
            spinBtn.removeEventListener('click', spinWheel);
        };
    }, []);

    return (
        <div className="wrapper">
            <div className="container">
                <canvas id="wheel" ref={wheelRef}></canvas>
                <button id="spin-btn" disabled={spinDisabled}>Spin</button>
                <img src="https://cutewallpaper.org/24/yellow-arrow-png/155564497.jpg" alt="spinner arrow" />
            </div>
            <div id="final-value">
                <p>{finalValue}</p>
            </div>
        </div>
    );
};

export default TestWheel;
