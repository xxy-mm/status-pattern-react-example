import React, { FC, useEffect, useState, type PropsWithChildren } from 'react'
import type { State } from './State.interface'
import { StateOne } from './StepOne'
import { StateThree } from './StepThree'
import { StateTwo } from './StepTwo'

interface StateContextType {
  state: State
  forceUpdate: () => void
  next: () => void
  prev: () => void
  submit: () => void
}

export const StateContext = React.createContext<StateContextType>(
  {} as StateContextType
)

const states: State[] = [new StateOne(), new StateTwo(), new StateThree()]

const correctInitialStep = (step: number) => {
  return step < 0 ? 0 : step > states.length - 1 ? states.length - 1 : step
}

/**
 * step starts from 0 since array index starts from 0
 * I don't wanna add extra conversions
 */
export const StateProvider: FC<PropsWithChildren<{ step: number }>> = ({
  step: initialStep,
  children,
}) => {
  initialStep = correctInitialStep(initialStep)
  const [step, setStep] = useState(initialStep)
  const [state, setState] = useState<State>(states[initialStep])
  const [, setChanged] = useState(false)

  const forceUpdate = () => setChanged((changed) => !changed)
  const validate = () => {
    state.validate()
    forceUpdate()
    return !state.hasError
  }
  const next = () => {
    if (!validate()) return
    const nextStep = correctInitialStep(step + 1)
    setStep(nextStep)
  }

  const prev = () => {
    // let's not validate when user navigates back
    // only validate when user navigates to the next step
    // if (!validate()) return
    const prevStep = correctInitialStep(step - 1)
    setStep(prevStep)
  }

  const submit = () => {
    if (!validate()) return
    const index = states.findIndex((state) => {
      state.validate()
      return state.hasError
    })
    if (index !== -1) {
      setStep(index)
      return
    }
    const values = states.reduce((acc, curr) => {
      return {
        ...acc,
        ...curr.values,
      }
    }, {})

    console.log(values)
  }

  useEffect(() => {
    setState(states[step])
  }, [step])

  return (
    <StateContext.Provider value={{ next, prev, forceUpdate, state, submit }}>
      {children}
    </StateContext.Provider>
  )
}
