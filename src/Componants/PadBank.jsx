import { DrumPad } from "./Drumpad";

export const PadBank = ({ currentPadBank, power, updateDisplay }) => {
  const pads = currentPadBank.map((pad) => (
    <DrumPad
      power={power}
      updateDisplay={updateDisplay}
      key={pad.id}
      clip={pad.url}
      clipId={pad.id}
      keyTrigger={pad.keyTrigger}
      keyCode={pad.keyCode}
    />
  ));

  return <div className="pad-bank">{pads}</div>;
};
