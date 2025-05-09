import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');

export const addChild = createAsyncThunk(
  'children/addChild',
  async (childName) => {
    const response = await fetch('http://localhost:3000/api/child/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: childName }),
    });

    if (!response.ok) {
      throw new Error('Failed to add child');
    }

    const data = await response.json();
    return data; //returns saved child obj
  }
);

export const fetchChildren = createAsyncThunk(
  'children/fetchChildren',
  async () => {
    const response = await fetch('http://localhost:3000/api/child/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch children');
    }

    const data = await response.json();
    return data.children; // Should be an array of children
  }
);

const childSlice = createSlice({
  name: 'children',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addChild.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addChild.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
      })
      .addCase(addChild.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchChildren.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      });
  },
});

export default childSlice.reducer;
