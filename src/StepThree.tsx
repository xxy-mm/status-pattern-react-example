import { FC, useContext, type ChangeEvent } from 'react'

import type { State } from './State.interface'
import { StateContext } from './StateProvider'

type Values = { remark: string }

export const StepThree: FC<{ state: State<Values> }> = ({ state }) => {
  const { prev, submit, forceUpdate } = useContext(StateContext)

  const onRemarkChange = (e: ChangeEvent<HTMLInputElement>) => {
    state.values = { remark: e.target.value }
    forceUpdate()
  }
  return (
    <div>
      <div className="flex gap-2">
        <label htmlFor="remark">remark</label>
        <div className="flex flex-col">
          <input
            type="text"
            value={state.values.remark}
            onChange={onRemarkChange}
            id="remark"
          />
          {state.errors.remark ? (
            <p className="text-red-600 text-xs">Invalid remark</p>
          ) : null}
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4 text-sm">
        <button
          className="rounded text-white px-2 py-0.5 bg-red-600"
          onClick={() => prev()}
        >
          prev
        </button>
        <button
          className="rounded text-white px-2 py-0.5 bg-blue-600"
          onClick={() => submit()}
        >
          submit
        </button>
      </div>
    </div>
  )
}

export class StateThree implements State<Values> {
  hasError = false
  values = { remark: '' }

  errors = {}

  validate() {
    const errors = {
      remark: this.values.remark.trim().length < 6,
    }
    this.hasError = Object.values(errors).some((v) => v)
    this.errors = errors
    return errors
  }
  component() {
    return <StepThree state={this} />
  }
}
