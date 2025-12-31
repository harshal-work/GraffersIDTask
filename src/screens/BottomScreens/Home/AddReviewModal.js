// src/screens/review/AddReviewModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AddReviewModal({ visible, onClose, onSubmit }: any) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Add Review</Text>
          <TextInput placeholder="Review" style={styles.input} onChangeText={setText} />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              onSubmit({ id: Date.now().toString(), name: 'User', rating, text });
              onClose();
            }}
          >
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  box: { width: '85%', backgroundColor: '#fff', borderRadius: 14, padding: 16 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 12 },
  btn: { backgroundColor: '#7A1FFF', padding: 12, borderRadius: 10 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
});
