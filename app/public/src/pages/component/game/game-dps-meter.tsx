import React, { useState } from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import GameBlueDpsMeter from "./game-blue-dps-meter"
import GameRedDpsMeter from "./game-red-dps-meter"
import GameBlueHealDpsMeter from "./game-blue-heal-dps-meter"
import GameRedHealDpsMeter from "./game-red-heal-dps-meter"
import { useAppSelector } from "../../../hooks"
import { getAvatarSrc } from "../../../utils"
import "./game-dps-meter.css"
import { loadPreferences, savePreferences } from "../../../preferences"

let lastOpponentName = ""

export default function GameDpsMeter() {
  const opponentName = useAppSelector(
    (state) => state.game.currentPlayerOpponentName
  )
  if(opponentName != lastOpponentName && opponentName != "") {
    lastOpponentName = opponentName
  }
  const opponentAvatar = useAppSelector(
    (state) => state.game.currentPlayerOpponentAvatar
  )
  const avatar = useAppSelector((state) => state.game.currentPlayerAvatar)
  const name = useAppSelector((state) => state.game.currentPlayerName)
  const [isOpen, setOpen] = useState(loadPreferences().showDpsMeter)

  function toggleOpen() {
    setOpen(!isOpen)
    savePreferences({ showDpsMeter: !isOpen })
  }

  if (opponentAvatar == "") {
    return null
  } else {
    return (
      <>
        <div
          id="game-dps-icon"
          className="nes-container clickable"
          title={`${isOpen ? "Hide" : "Show"} battle stats`}
          onClick={toggleOpen}
        >
          <img src="/assets/ui/dpsmeter.svg" />
        </div>
        <div
          className="nes-container hidden-scrollable game-dps-meter"
          hidden={!isOpen}
        >
          <header>
            <div>
              <img
              src={getAvatarSrc(avatar)}
              className="pokemon-portrait"
              ></img>
              <p>{name}</p>
            </div>
            <h2>Vs</h2>
            <div>
              <img
                src={getAvatarSrc(opponentAvatar)}
                className="pokemon-portrait"
              ></img>
              <p>{opponentName || lastOpponentName}</p>
            </div>
          </header>
          <Tabs>
            <TabList>
              <Tab key="damage">
                <p>Damage</p>
              </Tab>
              <Tab key="heal">
                <p>Heal</p>
              </Tab>
            </TabList>

            <TabPanel>
              <GameBlueDpsMeter />
              <GameRedDpsMeter />
            </TabPanel>

            <TabPanel>
              <GameBlueHealDpsMeter />
              <GameRedHealDpsMeter />
            </TabPanel>
          </Tabs>
        </div>
      </>
    )
  }
}
