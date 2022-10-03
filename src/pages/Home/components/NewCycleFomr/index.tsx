import { useContext } from 'react'

import { FormContainer, MinutesAmount, TaskInput } from './styles'
import { CycleContext } from '../..'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        type="text"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestion"
        disabled={!!activeCycle}
        {...register('task')}
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
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
