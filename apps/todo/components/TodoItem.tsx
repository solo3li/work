import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo, Todo } from '../store/todoSlice';
import Animated, { Layout, FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { Trash2, CheckCircle, Circle } from 'lucide-react-native';

interface Props {
  todo: Todo;
}

export default function TodoItem({ todo }: Props) {
  const dispatch = useDispatch();

  const getCategoryColor = () => {
    switch (todo.category) {
      case 'urgent': return '#FF4500'; // Orange Red
      case 'silly': return '#9370DB'; // Medium Purple
      default: return '#4682B4'; // Steel Blue
    }
  };

  return (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      layout={Layout.springify()}
      style={[styles.container, { borderColor: getCategoryColor() }]}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={() => dispatch(toggleTodo(todo.id))}
      >
        {todo.completed ? (
          <CheckCircle size={24} color="#32CD32" />
        ) : (
          <Circle size={24} color="#000" />
        )}
        <Text style={[styles.text, todo.completed && styles.completedText]}>
          {todo.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => dispatch(removeTodo(todo.id))}
        style={styles.deleteButton}
      >
        <Trash2 size={20} color="#FF0000" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderWidth: 4,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    transform: [{ rotate: '-1deg' }], // Slightly tilted for "funny" look
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
    color: '#000',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#AAA',
    fontStyle: 'italic',
  },
  deleteButton: {
    padding: 5,
  },
});
