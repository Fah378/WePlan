import React from 'react';
import { Modal, View, Text, Button } from 'react-native';

const MarkerModal = ({ visible, onConfirm, onCancel }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 5 }}>
                    <Text>Do you want to select this place?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                        <Button title="Yes" onPress={onConfirm} />
                        <Button title="No" onPress={onCancel} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default MarkerModal;