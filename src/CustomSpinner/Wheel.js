import WheelComponent from "./WheelComponent";

function Wheel() {
    const segments = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
    const segColors = [
        "#EE4040",
        "#F0CF50",
        "#815CD1",
        "#3DA5E0",
        "#FF9000",
    ];
    const onFinished = (winner) => {
        console.log(winner);
    };

    return (
        <div id="wheelCircle">
            <WheelComponent
                segments={segments}
                segColors={segColors}
                winningSegment='2'
                onFinished={(winner) => onFinished(winner)}
                primaryColor="black"
                primaryColoraround="#ffffffb4"
                contrastColor="white"
                buttonText=""
                isOnlyOnce={false}
                startSpin={true}
                size={120}
                upDuration={50}
                downDuration={1000}
            />
        </div>
    );
}

export default Wheel;
