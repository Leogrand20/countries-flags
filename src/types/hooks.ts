import { ChangeEventHandler } from 'react'
import { SingleValue } from 'react-select'

import { RegionOptions } from '../components/search/CustomSelect'

export type OnSearchHandler = ChangeEventHandler<HTMLInputElement>

export type OnCheckboxHandler = ChangeEventHandler<HTMLInputElement>

export type OnSelectHandler = (reg: SingleValue<RegionOptions>) => void
