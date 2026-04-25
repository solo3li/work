import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: 'boring' | 'urgent' | 'silly';
}

interface TodoState {
  items: Todo[];
}

const initialState: TodoState = {
  items: [
    { id: '1', text: 'Argue with a wall', completed: false, category: 'silly' },
    { id: '2', text: 'Convince a cat that I am its leader', completed: true, category: 'urgent' },
    { id: '3', text: 'Write a love letter to a sandwich', completed: false, category: 'boring' },
    { id: '4', text: 'Actually do some work (Optional)', completed: false, category: 'boring' },
  ],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string; category: Todo['category'] }>) => {
      state.items.push({
        id: Date.now().toString(),
        text: action.payload.text,
        completed: false,
        category: action.payload.category,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((i) => i.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
