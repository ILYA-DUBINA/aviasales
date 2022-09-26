/* eslint-disable indent */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { showAllTransfer, showNonStop, showOneTransfer, showTwoTransfer, showThreeTransfer } from './const';

export const fetchAviasales = createAsyncThunk('aviasales/fetchAviasales', async function (_, { rejectWithValue }) {
  try {
    const response = await fetch('https://front-test.dev.aviasales.ru/search');

    const data = await response.json();

    const responseTwo = await fetch(`https://front-test.dev.aviasales.ru/tickets?searchId=${data.searchId}`);

    const dataTwo = await responseTwo.json();

    if (!response.ok || !responseTwo.ok) {
      throw new Error('Server Error');
    }

    return dataTwo.tickets.slice(0, 6);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const aviasalesSlice = createSlice({
  name: 'aviasales',
  initialState: {
    imgBackSidebar: 'custom-checkbox',
    allTransfer: false,
    nonStop: false,
    oneTransfer: false,
    twoTransfer: false,
    threeTransfer: false,
    emptyTransferArray: [],
    emptyTransferNonStop: [],
    emptyTransferOneTransfer: [],
    emptyTransferTwoTransfer: [],
    emptyTransferThreeTransfer: [],
    emptyTransferArrayContainer: [],
    emptyTransferArrayContainerAll: [],
    status: null,
    error: null,
  },
  reducers: {
    addClickTransfers(state = this.initialState, action) {
      console.log(state.nonStop);
      switch (action.payload.type) {
        case showAllTransfer:
          return { ...state, allTransfer: !state.allTransfer };
        case showNonStop:
          return { ...state, nonStop: !state.nonStop, allTransfer: false };
        case showOneTransfer:
          return { ...state, oneTransfer: !state.oneTransfer, allTransfer: false };
        case showTwoTransfer:
          return { ...state, twoTransfer: !state.twoTransfer, allTransfer: false };
        case showThreeTransfer:
          return { ...state, threeTransfer: !state.threeTransfer, allTransfer: false };
        default:
          return state;
      }
    },
    addFilterTransfers: (state, action) => {
      // if (action.payload.number === 0) {
      //   state.emptyTransferArray = state.emptyTransferNonStop.filter(
      //     (itemThree) =>
      //       itemThree.segments[0].stops.length === action.payload.number ||
      //       itemThree.segments[1].stops.length === action.payload.number
      //   );
      // } else {
      //   state.emptyTransferNonStop = state.emptyTransferNonStop.filter(
      //     (itemThree) =>
      //       itemThree.segments[0].stops.length === action.payload.number ||
      //       itemThree.segments[1].stops.length === action.payload.number
      //   );
      //   state.emptyTransferArray = [...state.emptyTransferArray, ...state.emptyTransferNonStop];
      // }

      if (state.allTransfer) {
        state.emptyTransferArray = state.emptyTransferArrayContainerAll;
      } else if (state.nonStop) {
        state.emptyTransferArray = state.emptyTransferNonStop.filter(
          (itemThree) =>
            itemThree.segments[0].stops.length === action.payload ||
            itemThree.segments[1].stops.length === action.payload
        );
      } else if (state.oneTransfer) {
        state.emptyTransferArray = state.emptyTransferOneTransfer.filter(
          (itemThree) =>
            itemThree.segments[0].stops.length === action.payload ||
            itemThree.segments[1].stops.length === action.payload
        );
      } else if (state.twoTransfer) {
        state.emptyTransferArray = state.emptyTransferTwoTransfer.filter(
          (itemThree) =>
            itemThree.segments[0].stops.length === action.payload ||
            itemThree.segments[1].stops.length === action.payload
        );
      } else if (state.threeTransfer) {
        state.emptyTransferArray = state.emptyTransferThreeTransfer.filter(
          (itemThree) =>
            itemThree.segments[0].stops.length === action.payload ||
            itemThree.segments[1].stops.length === action.payload
        );
      } else {
        state.emptyTransferArray = [];
      }
    },
    searchCheapestTicket: (state) => {
      state.emptyTransferArray = state.emptyTransferArrayContainer.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    },
    searchFastestTicket: (state) => {
      state.emptyTransferArray = state.emptyTransferArrayContainer.sort(
        (a, b) => parseFloat(a.segments[0].duration) - parseFloat(b.segments[0].duration)
      );
    },
    searchOptimalTicket(state) {
      let number = state.emptyTransferArray.length / 2;

      state.emptyTransferOneTransfer = state.emptyTransferArray.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
      state.emptyTransferTwoTransfer = state.emptyTransferArray.sort(
        (a, b) => parseFloat(a.segments[0].duration) - parseFloat(b.segments[0].duration)
      );
      state.emptyTransferThreeTransfer = state.emptyTransferOneTransfer.filter(
        (item, index, array) => array[index] === array[number]
      );
      state.emptyTransferNonStop = state.emptyTransferTwoTransfer.filter(
        (item, index, array) => array[index] === array[number]
      );

      const objectsEqual = (o1, o2) => {
        typeof o1 === 'object' && Object.keys(o1).length > 0
          ? Object.keys(o1).length === Object.keys(o2).length &&
            Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
          : o1 === o2;
      };
      const arraysEqual = (a1, a2) => a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));

      if (arraysEqual(state.emptyTransferThreeTransfer, state.emptyTransferNonStop) === true) {
        state.emptyTransferArray = [...state.emptyTransferThreeTransfer, ...state.emptyTransferNonStop];
      } else {
        state.emptyTransferArray = state.emptyTransferThreeTransfer;
      }
    },
  },
  extraReducers: {
    [fetchAviasales.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchAviasales.fulfilled]: (state, action) => {
      state.status = 'resolved';
      // state.emptyTransferArray = action.payload;
      state.emptyTransferArrayContainer = action.payload;
      state.emptyTransferArrayContainerAll = action.payload;
      state.emptyTransferNonStop = action.payload;
      state.emptyTransferOneTransfer = action.payload;
      state.emptyTransferTwoTransfer = action.payload;
      state.emptyTransferThreeTransfer = action.payload;
    },
    [fetchAviasales.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const {
  addClickTransfers,
  addFilterTransfers,
  filterPost,
  searchCheapestTicket,
  searchFastestTicket,
  searchOptimalTicket,
} = aviasalesSlice.actions;

export default aviasalesSlice.reducer;
