import { useState, createContext } from 'react'

import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdowButton,
  StopCountdowButton,
} from './styles'

import { NewCycleForm } from './components/NewCycleFomr'
import { Countdow } from './components/Countdown'
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleID: string | null
  markCurrentCycleAsFinished: () => void
}

export const CycleContext = createContext({} as CyclesContextType)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null)

  // const task = watch('task')
  // const isInputDisabled = !task

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID)

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return { ...cycle, interruptDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleID(null)
  }

  return (
    <HomeContainer>
      <form /* onSubmit={handleSubmit(handleNewCicle)} */>
        <CycleContext.Provider
          value={{ activeCycle, activeCycleID, markCurrentCycleAsFinished }}
        >
          <NewCycleForm />
          <Countdow />
        </CycleContext.Provider>
        {activeCycle ? (
          <StopCountdowButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} /> Interromper
          </StopCountdowButton>
        ) : (
          <StartCountdowButton /* disabled={isInputDisabled} */ type="submit">
            <Play size={24} /> Começar
          </StartCountdowButton>
        )}
      </form>
    </HomeContainer>
  )
}
