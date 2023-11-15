import "./App.css";
import { PadBank } from "./Componants/PadBank";
import { drumPads, pianoPads } from "./assets/AudioList";
import { useState, useEffect } from "react";

function App() {
  const [power, setPower] = useState(true);
  const [sliderVal, setSliderVal] = useState(0.3);
  const [currentPadBank, setCurrentPadBank] = useState(drumPads);
  const [display, setDisplay] = useState(String.fromCharCode(160));
  const [currentPadBankId, setCurrentPadBankId] = useState("Heater Kit");

  useEffect(() => {
    document.querySelectorAll(".clip").forEach((audioElement) => {
      audioElement.volumn = sliderVal;
    });
  }, [sliderVal]);

  const powerControl = () => {
    setPower(!power);
    setDisplay(String.fromCharCode(160));
  };

  const selectBank = () => {
    if (power) {
      if (currentPadBankId === "Heater Kit") {
        setDisplay("Smooth Piano Kit");
        setCurrentPadBank(pianoPads);
        setCurrentPadBankId("Smooth Piano Kit");
      } else {
        setDisplay("Heater Kit");
        setCurrentPadBank(drumPads);
        setCurrentPadBankId("Heater Kit");
      }
    }
  };
  const updateDisplay = (name) => {
    power && setDisplay(name);
  };

  const adjustVolumn = (e) => {
    if (power) {
      setSliderVal(e.target.value);
      setDisplay(`Volumn: ${Math.round(100 * e.target.value)}`);
      setTimeout(() => clearDisplay(), 1000);
    }
  };

  const clearDisplay = () => {
    setDisplay(String.fromCharCode(160));
  };
  return (
    <div id="drum-machine" className="container">
      <PadBank
        clipVolumn={sliderVal}
        power={power}
        currentPadBank={currentPadBank}
        updateDisplay={updateDisplay}
      />
      <div className="control-container">
        <div className="control">
          <p>Power</p>
          <div className="select" onClick={powerControl}>
            <div
              className="inner"
              style={power ? { float: "right" } : { float: "left" }}
            />
          </div>
        </div>
        <p id="display">{display}</p>
        <div className="volumn-slider">
          <input
            type="range"
            max="1"
            min="0"
            step="0.1"
            value="sliderVal"
            onChange={adjustVolumn}
          />
        </div>
        <div className="control">
          <p>Bank</p>
          <div className="select" onClick={selectBank}>
            <div
              className="inner"
              style={
                currentPadBank === drumPads
                  ? { float: "left" }
                  : { float: "right" }
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
