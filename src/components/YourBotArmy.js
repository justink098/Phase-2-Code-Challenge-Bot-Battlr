import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({ listedBots, removeBot }) {

  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          {listedBots.map((bot, index) => <BotCard removeBot={removeBot} key={index} bot={bot}></BotCard>)}
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;

