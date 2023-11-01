import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { React, useState } from "react";

const SetGoalBox = (props) => {
  let {
    handleSetGoalBox,
    goal,
  } = props
  const [newGoal, setNewGoal] = useState(0);
  
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      if (newGoal !== 0) {
        handleSetGoalBox(newGoal);
      } 
    }
  }

  function handleClick(e) {
    if (newGoal !== 0) {
      handleSetGoalBox(newGoal);
      setNewGoal(0);
    } else {
      alert('Something is missing...');
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel htmlFor="goal">Goal</InputLabel>
        <OutlinedInput
          id="goal"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
          type="number"
          value={goal}
          onChange={(e) => {
            setNewGoal(e.target.value);
          }}
          onKeyDown={(e) => handleKeyPress(e)}
        />
      </FormControl>
      <Button variant="contained" type="button" onClick={handleClick}>
        Set Goal
      </Button>
    </div>
  );
};


export default SetGoalBox;
