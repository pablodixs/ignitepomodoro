import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmount,
  Separator,
  StartCountdowButton,
  TaskInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestion"
          />
          <datalist id="task-suggestion">
            <option value="Alun" />
          </datalist>
          <label htmlFor="minutesAmout">durante</label>
          <MinutesAmount
            type="number"
            id="minutesAmout"
            step={5}
            min={5}
            max={60}
            placeholder="00"
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdowButton disabled type="submit">
          <Play size={24} /> Começar
        </StartCountdowButton>
      </form>
    </HomeContainer>
  )
}
