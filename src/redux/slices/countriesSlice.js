import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { setError } from '../slices/errorSlice'

const initialState = {
  countries: [],
  isLoading: false,
}

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
      state.countries = [...payload]
    })

    addCase(fetchCountries.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const selectCountries = (state) => state.countries.countries
export const selectIsLoading = (state) => state.countries.isLoading

export default countriesSlice.reducer
