import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');

export const fetchChores = createAsyncThunk('chores/fetchChores', async () => {
  const response = await fetch('http://localhost:3000/api/chore', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch chores');
  }
  const data = await response.json();

  return data;
});

export const addChore = createAsyncThunk(
  'chores/addChore',
  async (newChore) => {
    const response = await fetch('http://localhost:3000/api/chore/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newChore),
    });

    if (!response.ok) {
      throw new Error('Failed to add chore');
    }

    const data = await response.json();
    return data;
  }
);

const choreSlice = createSlice({
  name: 'chores',
  initialState: {
    chores: [],
    choreLists: [], 
    loading: false,
    error: null,
  },
  reducers: {
    toggleChoreCompleted: (state, action) => {
      const chore = state.chores.find((c) => c._id === action.payload);
      if (chore) {
        chore.complete = !chore.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChores.fulfilled, (state, action) => {
        state.chores = action.payload.chores;
        state.choreLists = action.payload.choreLists;
        state.loading = false;
      })
      .addCase(fetchChores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addChore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addChore.fulfilled, (state, action) => {
        state.loading = false;
        state.chores.push(action.payload);
      })
      .addCase(addChore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleChoreCompleted } = choreSlice.actions;
export default choreSlice.reducer;
