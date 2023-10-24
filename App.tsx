import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [state, setState] = useState({ ...initialState });

  const addDigit = (n) => {
    //console.debug(typeof state.displayValue) // para ver o debug roda o comando >>>  react-native log-android
    const clearDisplay = displayValue === '0' || state.clearDisplay;

    if (n === '.') {
      if (clearDisplay || state.operation) {
        n = '0' + n;
      } else if (displayValue.includes('.')) {
        return;
      }
    }

    const currentValue = clearDisplay ? '' : displayValue;

    const newDisplayValue = currentValue + n;
    setDisplayValue(newDisplayValue);

    if (n !== '.') {
      const newValue = parseFloat(newDisplayValue);
      const values = [...state.values];
      values[state.current] = newValue;
      setState({ ...state, values, clearDisplay: false });
    }
  };

  const clearMemory = () => {
    setDisplayValue('0');
    setState({ ...initialState });
  };

  const setOperation = (operation) => {
    if (state.current === 0) {
      setState({ ...state, operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === '=';
      const values = [...state.values];

      try {
        values[0] = eval(`${values[0]} ${state.operation} ${values[1]}`);
        values[0] = parseFloat(values[0].toFixed(5));
      //console.warn(`${values[0]}`);
      } catch (e) {
        values[0] = state.values[0];
      }

      values[1] = 0;
      setState({
        ...state,
        displayValue: `${values[0]}`.toString(), 
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
      //clearDisplay: !equals,
        clearDisplay: true,
        values,
      });
      setDisplayValue(values[0]);
    }
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Display value={displayValue} />
          <View style={styles.buttons}>
            <Button label="AC" triple onClick={clearMemory} />
            <Button label="/" operation onClick={setOperation} />
            <Button label="7" onClick={() => addDigit('7')} />
            <Button label="8" onClick={() => addDigit('8')} />
            <Button label="9" onClick={() => addDigit('9')} />
            <Button label="*" operation onClick={setOperation} />
            <Button label="4" onClick={() => addDigit('4')} />
            <Button label="5" onClick={() => addDigit('5')} />
            <Button label="6" onClick={() => addDigit('6')} />
            <Button label="-" operation onClick={setOperation} />
            <Button label="1" onClick={() => addDigit('1')} />
            <Button label="2" onClick={() => addDigit('2')} />
            <Button label="3" onClick={() => addDigit('3')} />
            <Button label="+" operation onClick={setOperation} />
            <Button label="0" double onClick={() => addDigit('0')} />
            <Button label="." onClick={() => addDigit('.')} />
            <Button label="=" operation onClick={setOperation} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default App;