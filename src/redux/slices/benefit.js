import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import benefitService from '../../services/benefit';
import axios from 'axios';

const initialState = {
  loading: false,
  benefitsList: [],
  error: '',
  meta: {},
};

export const fetchBenefit = createAsyncThunk(
  'benefit/fetchBenefit',
  async (params) => {
    console.log({ params });
    console.log('fetch benefit isledi');

    return benefitService.getAll(params).then((res) => res);
  },
);

const benefit = createSlice({
  name: 'benefit',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBenefit.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBenefit.fulfilled, (state, action) => {
      const { payload } = action;
      state.loading = false;
      state.benefitsList = payload.data;
      state.error = '';
    });
    builder.addCase(fetchBenefit.rejected, (state, action) => {
      state.loading = false;
      state.benefitsList = [];
      state.error = action.error.message;
    });
  },
});

export default benefit.reducer;
