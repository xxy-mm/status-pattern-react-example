import { FC, useContext, type ChangeEvent } from 'react'

import type { State } from './State.interface'
import { StateContext } from './StateProvider'

type Values = { email: string }

export const StepTwo: FC<{ state: State<Values> }> = ({ state }) => {
  const { prev, next, forceUpdate } = useContext(StateContext)

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    state.values = { email: e.target.value }
    forceUpdate()
  }
  return (
    <div>
      <div className="flex flex-row gap-2">
        <label htmlFor="email" className="">
          email
        </label>
        <div className="flex flex-col">
          <input
            className="text-center"
            type="text"
            value={state.values.email}
            onChange={onEmailChange}
            id="email"
          />
          {state.errors.email ? (
            <p className="text-red-600 text-xs">Invalid email</p>
          ) : null}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="px-2 py-0.5 bg-red-600 text-white rounded ml-2"
          onClick={() => prev()}
        >
          prev
        </button>
        <button
          className="px-2 py-0.5 bg-blue-600 text-white rounded ml-2"
          onClick={() => next()}
        >
          next
        </button>
      </div>
    </div>
  )
}

export class StateTwo implements State<Values> {
  hasError = false
  values = { email: '' }

  errors = {}

  validate() {
    const errors = {
      email: this.values.email.trim().length < 6,
    }
    this.hasError = Object.values(errors).some((v) => v)
    this.errors = errors
    return errors
  }
  component() {
    return <StepTwo state={this} />
  }
}
