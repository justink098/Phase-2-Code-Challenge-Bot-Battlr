import React, { useEffect, useState } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  const [Loading, setLoading] = useState(false);
  const [everyBot, setallBots] = useState([]);
  const [listedBots, setlistedBots] = useState([]);
  const [current, setBot] = useState(null);

  useEffect(() => {
    const getAllBots = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8002/bots');
        const responseData = await response.json();
        setallBots(responseData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getAllBots();
  }, [])

  const removeBot = async (botId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8002/bots/${botId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'accept': 'application/json' } });
      if(!response.ok){
        throw new Error('Error occured');
      }
      const responseData = await response.json();
      console.log(responseData);
      setBot(null);
      const inEnlisted = listedBots.find((bot) => bot.id === botId);
      if(inEnlisted){
        setlistedBots(prevBots => prevBots.filter((bot) => bot.id !== botId));
      }
      setallBots(prevBots => prevBots.filter((bot) => bot.id !== botId));
    } catch (err) {} finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <YourBotArmy removeBot={removeBot} listedBots={listedBots} />
      <BotCollection removeBot={removeBot} current={current} setBot={setBot} Loading={Loading} everyBot={everyBot} listedBots={listedBots} setlistedBots={setlistedBots} />
    </div>
  )
}

export default BotsPage;


