import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

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

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null)

  const task = watch('task')
  const isInputDisabled = !task

  function handleNewCicle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...cycles, newCycle])
    setActiveCycleID(id)
    setAmountSecondsPassed(0)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID)

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} • Ignite Pomodoro`
    } else {
      document.title = 'Ignite Pomodoro'
    }
  }, [seconds, minutes, activeCycle])

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
      <form onSubmit={handleSubmit(handleNewCicle)}>
        <NewCycleForm />

        <Countdow
          activeCycle={activeCycle}
          setCycles={setCycles}
          activeCycleID={activeCycleID}
        />

        {activeCycle ? (
          <StopCountdowButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} /> Interromper
          </StopCountdowButton>
        ) : (
          <StartCountdowButton disabled={isInputDisabled} type="submit">
            <Play size={24} /> Começar
          </StartCountdowButton>
        )}
      </form>
    </HomeContainer>
  )
}
