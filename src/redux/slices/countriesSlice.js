import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import { setError } from '../slices/errorSlice'

const countriesAdapter = createEntityAdapter({
  selectId: (country) => country.id,
  sortComparer: (a, b) => a.name.common.localeCompare(b.name.common),
})

const initialState = countriesAdapter.getInitialState({
  isLoading: false,
})

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async (_, { dispatch, rejectWithValue, extra: api }) => {
    try {
      return api.getAllCountries()
    } catch (error) {
      dispatch(setError(error.message))

      return rejectWithValue(error)
    }
  },
  {
    condition: (_, { getState }) => {
      const { isLoading } = getState().countries

      if (isLoading) return false
    },
  },
)

const countriesSlice = createSlice({
  name: 'countries',
  initialState,

  extraReducers: ({ addCase }) => {
    addCase(fetchCountries.pending, (state) => {
      state.isLoading = true
    })

    addCase(fetchCountries.fulfilled, (state, { payload }) => {
      state.isLoading = false

      countriesAdapter.setAll(state, [...payload])
    })

    addCase(fetchCountries.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const selectIsLoading = (state) => state.countries.isLoading

export const { selectAll } = countriesAdapter.getSelectors(
  (state) => state.countries,
)

export default countriesSlice.reducer
