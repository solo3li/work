import { createSlice } from '@reduxjs/toolkit';
import { DUMMY_RIDES } from '../../constants/dummyData';

const rideSlice = createSlice({
  name: 'rides',
  initialState: {
    availableRides: DUMMY_RIDES,
    currentRide: null,
    offers: [],
  },
  reducers: {
    addRide: (state, action) => {
      state.availableRides.push(action.payload);
    },
    makeOffer: (state, action) => {
      state.offers.push(action.payload);
    },
    setCurrentRide: (state, action) => {
      state.currentRide = action.payload;
    },
  },
});

export const { addRide, makeOffer, setCurrentRide } = rideSlice.actions;
export default rideSlice.reducer;
