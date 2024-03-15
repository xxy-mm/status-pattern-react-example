import { FC, useContext, type ChangeEvent } from 'react'

import type { State, StepComponentProps } from './State.interface'
import { StateContext } from './StateProvider'

type Values = { name: string }

export const StepOne: FC<StepComponentProps<T>> = ({ state }) => {
  const { prev, next, forceUpdate } = useContext(StateContext)

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    state.values = { name: e.target.value }
    forceUpdate()
  }
  return (
    <div className="flex flex-col">
      <div className="flex gap-1">
        <label htmlFor="name" className="text-cyan-950">
          name
        </label>
        <div className="flex flex-col">
          <input
            className="border-pink-50 outline-none text-center"
            type="text"
            value={state.values.name}
            onChange={onNameChange}
            id="name"
          />
          {state.errors.name ? (
            <p className="text-red-500 text-xs">
              name should not be less than 6 letters
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex justify-end mt-10">
        <button
          className=" rounded  text-white px-2 py-0.5 bg-orange-600 mr-2"
          onClick={() => prev()}
        >
          prev
        </button>
        <button
          className="rounded bg-blue-600  text-white px-2"
          onClick={() => next()}
        >
          next
        </button>
      </div>
    </div>
  )
}

export class StateOne implements State<Values> {
  hasError = false
  values = { name: '' }

  errors = {}

  validate() {
    const errors = {
      name: this.values.name.trim().length < 6,
    }
    this.hasError = Object.values(errors).some((v) => v)
    this.errors = errors
    return errors
  }
  component() {
    return <StepOne state={this} />
  }
}
