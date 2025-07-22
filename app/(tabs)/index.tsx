import { createHomeStyles } from '@/assets/styles/home.styles';
import EmptyState from '@/components/EmptyState';
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from '@/components/TodoInput';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Todo = Doc<"todos"> // 이건 또 뭐하는거임? 

// item에 대한 명확한 이해도 필요할듯

export default function Index() {
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodos);
  const editTodo = useMutation(api.todos.updateTodos);
  const isLoading = todos === undefined; // 이거 정확하게 이해해야함 로딩상태 관리하는 것 같은데

  if (isLoading) return <LoadingSpinner />

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({id});

    } catch (error) {
      console.error("Error toggling todo", error);
      Alert.alert("Error", "Fail to toggle todo");
    }
  }

  const handleDeleteTodo = async (id: Id<"todos">) => {
    try {
      await deleteTodo({ id });
      
    } catch (error) {
      console.error("Error delete todo", error);
      Alert.alert("Error", "Fail to delete todo");
    }
  }

  const handleEditTodo = async (id: Id<"todos">) => {
    try {
      
    } catch (error) {
      console.error("Error edit todo", error);
      Alert.alert("Error", "Fail to edit todo");
    }
  }
  
  const renderTodoItem = ({ item }: { item: Todo }) => {
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient colors={colors.gradients.surface}
        style={homeStyles.todoItem}// 그라데이션 x,y 개념 체크해야함
          start={{ x: 0, y: 0 }}
          end={{x: 1, y: 1}}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)} // 이런식으로 일단 onPress 함수 없이 제작 가능
          >
            <LinearGradient colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
              style={[homeStyles.checkboxInner, { borderColor: item.isCompleted ? "transparent" : colors.border },]}>
              {item.isCompleted && <Ionicons name='checkmark' size={18} color="#fff" />}
            </LinearGradient>
          </TouchableOpacity>
          
            <View style={homeStyles.todoTextContainer}>
              <Text
                style={[
                  homeStyles.todoText,
                  item.isCompleted && {
                    textDecorationLine: "line-through",
                    color: colors.textMuted,
                    opacity: 0.6,
                  },
                ]}
              >
                {item.text}
            </Text>

                          <View style={homeStyles.todoActions}>
                <TouchableOpacity onPress={() => handleEditTodo} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                    <Ionicons name="pencil" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                    <Ionicons name="trash" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
          </View>
        </LinearGradient>
      </View>
    )
  }

  return (
    <LinearGradient colors={colors.gradients.background} style = {homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle}/>
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent} // 왜 이걸로 한번 더 스타일을 주는거임?
          ListEmptyComponent={<EmptyState />}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
