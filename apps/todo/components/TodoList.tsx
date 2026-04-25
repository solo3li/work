import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addTodo, Todo } from '../store/todoSlice';
import { logout } from '../store/authSlice';
import TodoItem from './TodoItem';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LogOut, Plus, Ghost, Rocket, Coffee } from 'lucide-react-native';

export default function TodoList() {
  const user = useSelector((state: RootState) => state.auth.user);
  const todos = useSelector((state: RootState) => state.todos.items);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  const [category, setCategory] = useState<Todo['category']>('boring');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo({ text: newTodo, category }));
      setNewTodo('');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp} style={styles.header}>
        <View>
          <Text style={styles.welcome}>Sup, {user}!</Text>
          <Text style={styles.subtitle}>Don&apos;t do anything today.</Text>
        </View>
        <TouchableOpacity onPress={() => dispatch(logout())}>
          <LogOut size={24} color="#000" />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="What&apos;s the next big nothing?"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        
        <View style={styles.categoryRow}>
          <TouchableOpacity 
            style={[styles.catButton, category === 'boring' && styles.catActive]} 
            onPress={() => setCategory('boring')}
          >
            <Coffee size={18} color={category === 'boring' ? '#FFF' : '#000'} />
            <Text style={[styles.catText, category === 'boring' && styles.catTextActive]}>Meh</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.catButton, category === 'urgent' && styles.catActive]} 
            onPress={() => setCategory('urgent')}
          >
            <Rocket size={18} color={category === 'urgent' ? '#FFF' : '#000'} />
            <Text style={[styles.catText, category === 'urgent' && styles.catTextActive]}>PANIC!</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.catButton, category === 'silly' && styles.catActive]} 
            onPress={() => setCategory('silly')}
          >
            <Ghost size={18} color={category === 'silly' ? '#FFF' : '#000'} />
            <Text style={[styles.catText, category === 'silly' && styles.catTextActive]}>Hehe</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Plus size={30} color="#FFF" />
          <Text style={styles.addButtonText}>ADD TO CHAOS</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoItem todo={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFD5', // Papaya Whip
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  welcome: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FF69B4', // Hot Pink
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  inputSection: {
    backgroundColor: '#ADFF2F', // Green Yellow
    padding: 20,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#000',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  catButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
  catActive: {
    backgroundColor: '#000',
  },
  catText: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
  catTextActive: {
    color: '#FFF',
  },
  addButton: {
    backgroundColor: '#9400D3', // Dark Violet
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#000',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    marginLeft: 10,
  },
  listContent: {
    paddingBottom: 40,
  },
});
