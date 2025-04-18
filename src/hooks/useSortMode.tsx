import { useAppDispatch, useAppSelector } from '../redux/store'
import { setSortModeFilter } from '../redux/slices/filterSlice'
import { selectSortModeFilter } from '../redux/selectors/filter-selectors'
import { OnCheckboxHandler } from '../types/hooks'

export const useSortMode = (): [string | null, OnCheckboxHandler] => {
  const dispatch = useAppDispatch()
  const sortMode = useAppSelector(selectSortModeFilter)

  const setSortMode: OnCheckboxHandler = (e) => {
    dispatch(setSortModeFilter(e.target.value))
  }

  return [sortMode, setSortMode]
}
