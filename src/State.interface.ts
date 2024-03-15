import type { ReactElement } from 'react'

export type StepComponentProps<T> = { state: Omit<State<T>, 'component'> }

export interface State<T = Record<string, unknown>> {
  hasError: boolean
  values: T
  errors: Partial<{ [prop in keyof T]: boolean }>
  validate(): Partial<{ [prop in keyof T]: boolean }>
  component(): ReactElement<State<T>>
}
