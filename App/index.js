// import { StatusBar } from 'expo-status-bar';
import React, { useImperativeHandle } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Dimensions, Picker, Platform } from 'react-native';
const screen = Dimensions.get('window')

const formatNumber = number => `0${number}`.slice(-2)
const getRemaining = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60
    return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) }
}

export default function App() {
    const [isRunning, setIsRunning] = React.useState(false)

    const [remainingSeconde, setRemainingSeconde] = React.useState(5)

    const [selectedMinute, setSelectedMinute] = React.useState(0)
    const [selectedSeconde, setSelectedSeconde] = React.useState(5)

    const { minutes, seconds } = getRemaining(remainingSeconde)

    let id;

    React.useEffect(() => {
        return () => {
            if (id) {
                clearInterval(id)
            }
        };
    }, [id]);

    const start = () => {
        setRemainingSeconde(parseInt(selectedMinute, 10) * 60 + parseInt(selectedSeconde))
        setIsRunning(true),
            id = setInterval(() => {
                setRemainingSeconde(c => {
                    const newCount = c - 1
                    if (newCount === 0) {
                        clearInterval(id);
                        setRemainingSeconde(5)
                    }
                    if (newCount === 0) {
                        clearInterval(id);
                        setIsRunning(false)
                    }
                    return newCount
                });
            }, 1000);
    }
    const stopTimer = () => {
        clearInterval(id),
            id = null,
            setRemainingSeconde(5),
            setIsRunning(false)
    }
    const renderPicker = () => {
        return (
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={selectedMinute}
                    onValueChange={(itemValue) => {
                        setSelectedMinute(itemValue)
                    }}
                    mode='dropdown'
                >
                    {AVAILABLE_MINUTES.map((value) => {
                        return (<Picker.Item key={value} label={value} value={value} />)
                    })}
                </Picker>
                <Text style={styles.pickerItem}>minutes</Text>
                <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={selectedSeconde}

                    onValueChange={(itemValue) => {
                        setSelectedSeconde(itemValue)
                    }}
                    mode='dropdown'

                >
                    {AVAILABLE_SECONDES.map((value) => {
                        return (<Picker.Item key={value} label={value} value={value} />)
                    })}
                </Picker>
                <Text style={styles.pickerItem}>seconds</Text>

            </View>
        )
    }
    const createArray = length => {
        const array = []
        let i = 0
        while (i < length) {
            array.push(i.toString())
            i += 1
        }
        return array
    }
    const AVAILABLE_MINUTES = createArray(10)
    const AVAILABLE_SECONDES = createArray(60)
    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            {isRunning ? (
                <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>

            ) : (renderPicker())}
            {isRunning ? <TouchableOpacity style={[styles.button, styles.buttonStop]}
                onPress={stopTimer}>
                <Text style={[styles.buttonText, styles.buttonTextStop]}>stop</Text>
            </TouchableOpacity> :
                <TouchableOpacity style={styles.button} onPress={start}>
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>

            }


            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderWidth: 10,
        borderColor: '#89AAff',
        width: screen.width / 2,
        height: screen.width / 2,
        borderRadius: screen.width / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    buttonStop: {
        borderColor: '#ff851b'
    },
    buttonTextStop: {
        color: '#ff851b'
    },
    buttonText: {
        fontSize: 45,
        color: '#89AAff',
    },
    timerText: {
        fontSize: 90,
        color: 'white'
    },
    picker: {
        width: 50,
        ...Platform.select({
            android: {
                color: '#fff',
                backgroundColor: '#89AAff',
                marginLeft: 10
            }
        })
    },
    pickerItem: {
        fontSize: 20,
        color: 'white'
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }

});
