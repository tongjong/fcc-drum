import { useEffect, useState } from "react";

const activePadStyle = {
  backgroundColor: "#d79494",
  boxShadow: "0 3px #d79494",
  height: 77,
  marginTop: 13,
};

const inactivePadStyle = {
  backgroundColor: "rgb(109, 106, 106)",
  marginTop: 10,
  boxShadow: "3px 3px 5px black",
};

export const DrumPad = ({
  clip,
  clipId,
  keyTrigger,
  keyCode,
  power,
  updateDisplay,
}) => {
  const [padStyle, setPadStyle] = useState(inactivePadStyle);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === keyCode) {
        playSound();
      }
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [power, keyCode]);

  const activatePad = () => {
    if (power) {
      setPadStyle((currentStyle) =>
        currentStyle.backgroundColor === "#d79494"
          ? inactivePadStyle
          : activePadStyle
      );
    } else {
      setPadStyle(inactivePadStyle);
    }
  };

  const playSound = () => {
    const audioElement = document.getElementById(keyTrigger);
    audioElement.currentTime = 0;
    audioElement.play();
    activatePad();
    setTimeout(() => activatePad(), 100);
    updateDisplay(clipId.replace(/-/g, " "));
  };
  return (
    <div className="drum-pad" id={clipId} onClick={playSound} style={padStyle}>
      <audio className="clip" id={keyTrigger} src={clip} />
      {keyTrigger}
    </div>
  );
};
