// import React from 'react';

// //keyboard avoiding view
// import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

// const KeyboardAvoidingWrapper = ({children}) => {
//     return (
//         <KeyboardAvoidingView behavior="padding" style = {{flex : 1}}>      
//             <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
//                 <ScrollView> 
//                     {children}
//                 </ScrollView>
//             </TouchableWithoutFeedback>
//         </KeyboardAvoidingView>
//     );
// }

// export default KeyboardAvoidingWrapper;
import React from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
