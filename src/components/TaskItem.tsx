import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import cancelIcon from "../assets/icons/X.png";
import editIcon from "../assets/icons/edit.png";
import { Task } from "./TasksList";

interface ITaskItem {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({
  item,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: ITaskItem) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setEditedTitle(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, editedTitle);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={editedTitle}
            editable={isEditing}
            onChangeText={setEditedTitle}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing && (
          <TouchableOpacity
            testID={`cancel-${index}`}
            onPress={handleCancelEditing}
            style={{ paddingHorizontal: 16 }}
          >
            <Image source={cancelIcon} />
          </TouchableOpacity>
        )}
        {!isEditing && (
          <TouchableOpacity
            testID={`edit-${index}`}
            onPress={handleStartEditing}
            style={{ paddingHorizontal: 12 }}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.divisionAction}></View>
        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => removeTask(item.id)}
          disabled={isEditing ? true : false}
          style={[
            isEditing ? { opacity: 0.2 } : { opacity: 1 },
            { paddingHorizontal: 12 },
          ]}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  divisionAction: {
    height: 24,
    width: 1,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
  iconsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
