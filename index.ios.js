/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
var formatTime = require('minutes-seconds-milliseconds');

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: 0,
      timer: null,
      laps: [],
    };
    this.handleStartPress = this.handleStartPress.bind(this);
    this.handleLapPress = this.handleLapPress.bind(this);
    // this.renderLapList = this.renderLapList.bind(this);
    // this.renderLaps = this.renderLaps.bind(this);
  }
  handleStartPress() {
    var startTime = new Date();
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.setState({timer: null});
    } else {
      const timer = setInterval(() => {
        this.setState({
          timeElapsed: new Date() - startTime,
        });
      }, 30);
      this.setState({timer});
    }
  }
  handleLapPress() {
    this.setState({ laps: [...this.state.laps, this.state.timeElapsed]});
  }
  startStopText() {
    return (this.state.timer ? "Stop" : "Start");
  }
  startStopStyle() {
    return (this.state.timer ? styles.stopButton : styles.startButton);
  }
  startStopButton() {
    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.handleStartPress}
        style={[styles.button, this.startStopStyle()]}
      >
        <Text>
          {this.startStopText()}
        </Text>
      </TouchableHighlight>
    );
  }
  lapButton() {
    return (
      <TouchableHighlight
        underlayColor="gray"
        style={[styles.button, styles.lapButton]}
        onPress={this.handleLapPress}
      >
        <Text>
          Lap
        </Text>
      </TouchableHighlight>
    );
  }
  renderLaps() {
    if (this.state.laps.length > 0) {
      return this.state.laps.map((lap, index) => (
        <View key={index} style={styles.lapList}>
          <Text style={{ fontWeight: 'bold' }}>Lap #{index}</Text>
          <Text>{formatTime(lap)}</Text>
        </View>

      ));
    } else {
      return (<Text>No Laps Recorded!</Text>);
    }
  }
  renderLapList() {
    return (
      <View style={styles.lapList}>
        <Text style={styles.lapHeader}>
          Laps
        </Text>
        <View>
          {this.renderLaps()}
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.header]}>
          {/* YELLOW */}
          <View style={[styles.timerWrapper]}>
            {/* RED */}
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={[styles.buttonWrapper]}>
            {/* GREEN */}
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>
        <View style={[styles.footer, styles.lapList]}>
          {this.renderLapList()}
        </View>
      </View>
    );
  }
}

const border = (color) => (
  { borderColor: color, borderWidth: 4 }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  header: { // YELLOW
    flex: 1,
  },
  footer: { // BLUE
    flex: 1,
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timer: {
    fontSize: 60,
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: "#AAFFAA",
  },
  lapButton: {
    backgroundColor: "#AAAAFF",
  },
  stopButton: {
    backgroundColor: "#FFAAAA",
  },
  lapHeader: {
    fontWeight: 'bold',
    fontSize: 32,
    alignItems: 'center',
  },
  lapList: {
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('StopWatch', () => StopWatch);
