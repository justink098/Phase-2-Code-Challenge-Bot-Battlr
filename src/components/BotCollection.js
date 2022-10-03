import React from "react";
import BotCard from "./BotCard";
import BotSpecs from "./BotSpecs";

function BotCollection({ removeBot, Loading, everyBot, listedBots, setlistedBots, current, setBot }) {

  const addBot = (botId, bot) => {
    const foundEnlistedBot = listedBots.find((bot) => bot.id === botId);
    if (foundEnlistedBot) {
      return;
    }
    setlistedBots(prevBots => [...prevBots, bot])
  };

  const viewBot = (bot) => {
    setBot(bot);
  }
  const goBack = () => {
    setBot(null);
  }

  return (
    <div className="ui four column grid">
      <div className="row">
        {Loading && <p>Loading...</p>}
        {!Loading && !current && everyBot.map((bot, index) => <BotCard removeBot={removeBot} key={index} viewBot={viewBot} bot={bot}></BotCard>)}
        {!Loading && current && <BotSpecs goBack={goBack} addBot={addBot} bot={current}></BotSpecs>}
      </div>
    </div>
  );
}

export default BotCollection;

