import React, {Component, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            running: false,
            startTime: new Date(),
            oldTime:0,
            lapTime: 0,
            laps: [],
            newLapTime:0,
            startTimeLap: new Date(),
            oldTimeLap:0,
        };
        this.LapButton = this.LapButton.bind(this);
        this.StartButton = this.StartButton.bind(this);
        this.StartRunning =this.StartRunning.bind(this);
        this.ResetRunning =this.ResetRunning.bind(this);
        this.TimeLap = this.TimeLap.bind(this);
        this.TimeDisplay = this.TimeDisplay.bind(this);

    };
    StartRunning = () =>{
        return(
            this.setState({running: true})
        );
    }
    ResetRunning = () =>{
        return(
            this.setState({running: false})
        );
    }
    LapButton = () =>{
        return (
          <View style={[styles.buttonLeft]}>
              <TouchableOpacity                
                  style={styles.lapBut}
                    onPress={this.state.running ? this.handleLap : this.handleReset}
                >
                  <Text style={styles.timeTextLap}>{this.state.running ? "Lap" : "Reset" }</Text>
              </TouchableOpacity>
          </View>
        )
      }

    StartButton = ()=>{
        var colorBut  = !this.state.running ? styles.startBut : styles.stopBut;
        var colorText = !this.state.running ? styles.startText : styles.stopText;
        return(
        <View style={[styles.buttonRight]}>
            <TouchableOpacity                
                style={[{
                    alignSelf: 'center',
                    height: 100,
                    width: 100,
                    marginTop: 10,
                    backgroundColor: '#1B1B1C',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius:50,
                    
                },colorBut]}
                onPress={this.state.running ? this.handleStop : this.handleStart}
                >
                <Text style={[styles.timeTextLap,colorText]}>{this.state.running ? "Stop" : "Start"}</Text>
            </TouchableOpacity>
        </View> )
    }  

    TimeDisplay(duration){
        var milliseconds = Math.floor((duration % 1000) / 10),
              seconds = Math.floor((duration / 1000) % 60),
              minutes = Math.floor((duration / (1000 * 60)) % 60)
      
        return (
          <View style={[styles.time]}>
              <View style={[styles.minute]}>
                  <Text style={styles.timeText}>{(minutes < 10) ? "0" + minutes : minutes}</Text>
              </View>
              <Text style={styles.timeText}>:</Text>
              <View style={[styles.second]}>
                  <Text style={styles.timeText}>{(seconds < 10) ? "0" + seconds : seconds}</Text>
              </View>
              <Text style={styles.timeText} >.</Text>
              <View style={[styles.milisecond]}>
                  <Text style={styles.timeText}>{(milliseconds < 10) ? "0" + milliseconds : milliseconds}</Text>
              </View>
          </View>
        )    
    }
    TimeLap(){
      const minLapTime = Math.min(...this.state.laps);
      const maxLapTime = Math.max(...this.state.laps);
      const lapsLength = this.state.laps.length;
      console.log(this.state.laps.length);
        return this.state.laps.map(function(time,index){
            var milliseconds = Math.floor((time % 1000) / 10),
              seconds = Math.floor((time / 1000) % 60),
              minutes = Math.floor((time / (1000 * 60)) % 60)
            if (time === minLapTime && (lapsLength > 1)) {          
                return(
                    <View style={[styles.lap]}>
                        <Text style={[styles.timeTextLap,{color: '#00FF37',marginVertical:20}]}>Lap {index+1}</Text>
                        <View style={[styles.timeLap]}>
                            <View style={[styles.minute]}>
                                <Text style={[styles.timeTextLap,{color: '#00FF37'}]}>{(minutes < 10) ? "0" + minutes : minutes}</Text>
                            </View>
                            <Text style={[styles.timeTextLap,{color: '#00FF37'}]}>:</Text>
                            <View style={[styles.second]}>
                                <Text style={[styles.timeTextLap,{color: '#00FF37'}]}>{(seconds < 10) ? "0" + seconds : seconds}</Text>
                            </View>
                            <Text style={[styles.timeTextLap,{color: '#00FF37'}]} >.</Text>
                            <View style={[styles.milisecond]}>
                                <Text style={[styles.timeTextLap,{color: '#00FF37'}]}>{(milliseconds < 10) ? "0" + milliseconds : milliseconds}</Text>
                            </View>
                        </View>
                    </View> 
                  ) 
            }
            else if (time === maxLapTime && (lapsLength > 1)) {
              return(
                <View style={[styles.lap]}>
                    <Text style={[styles.timeTextLap,,{color: 'red',marginVertical:20}]}>Lap {index+1}</Text>
                    <View style={[styles.timeLap]}>
                        <View style={[styles.minute]}>
                            <Text style={[styles.timeTextLap,{color: 'red'}]}>{(minutes < 10) ? "0" + minutes : minutes}</Text>
                        </View>
                        <Text style={[styles.timeTextLap,{color: 'red'}]}>:</Text>
                        <View style={[styles.second]}>
                            <Text style={[styles.timeTextLap,{color: 'red'}]}>{(seconds < 10) ? "0" + seconds : seconds}</Text>
                        </View>
                        <Text style={[styles.timeTextLap,{color: 'red'}]} >.</Text>
                        <View style={[styles.milisecond]}>
                            <Text style={[styles.timeTextLap,{color: 'red'}]}>{(milliseconds < 10) ? "0" + milliseconds : milliseconds}</Text>
                        </View>
                    </View>
                </View> 
              ) 
            }
            else {
                return(
                    <View style={[styles.lap]}>
                        <Text style={[{color: 'white',marginVertical:20},styles.timeTextLap]}>Lap {index+1}</Text>
                        <View style={[styles.timeLap]}>
                            <View style={[styles.minute]}>
                                <Text style={styles.timeTextLap}>{(minutes < 10) ? "0" + minutes : minutes}</Text>
                            </View>
                            <Text style={styles.timeTextLap}>:</Text>
                            <View style={[styles.second]}>
                                <Text style={styles.timeTextLap}>{(seconds < 10) ? "0" + seconds : seconds}</Text>
                            </View>
                            <Text style={styles.timeTextLap} >.</Text>
                            <View style={[styles.milisecond]}>
                                <Text style={styles.timeTextLap}>{(milliseconds < 10) ? "0" + milliseconds : milliseconds}</Text>
                            </View>
                        </View>
                    </View> 
                  ) 
            }
                      
        })
       
      }
    
    handleStart = () => {
      this.setState({ 
        startTime: Date.now(), 
        startTimeLap: Date.now(),
        running: true,
        oldTime: this.state.oldTime || 0 ,
        oldTimeLap: this.state.oldTimeLap || 0,

      });
      this.requestAnimationFrameId = requestAnimationFrame(this.updateTimer);
    }

    updateTimer=() => {
      if (this.state.running) {
        const lapTime = Date.now() - this.state.startTime + this.state.oldTime;

        this.setState({ lapTime:lapTime});
        this.requestAnimationFrameId = requestAnimationFrame(this.updateTimer);
      }
    }

    handleStop = () =>{      
      this.setState({running:false,oldTime:this.state.lapTime});
    }

    handleReset = () =>{
      this.setState({
        running: false,
        startTime: new Date(),
        oldTime:0,
        lapTime: 0,
        laps: [],
      });
    }

    handleLap = () =>{
      const lapTime = Date.now() - this.state.startTimeLap;
      this.setState(prevState => ({
        laps: [...prevState.laps, lapTime],
        oldTimeLap: prevState.oldTime + lapTime,
        startTimeLap: Date.now(), 
      }));
    }

    render(){
        return (
            <View style={styles.container}>
                
                <View style={{flex:3,alignSelf:'center',justifyContent:'flex-end'}}>
                    <Text style={{alignSelf:'center'}}>{this.TimeDisplay(this.state.lapTime)}</Text>
                </View>
                
                <View style={[styles.button,{flex:2}]}>
                    {this.LapButton()}
                    {this.StartButton()}                   
                </View>
                <View style={{flex:3,margin:20}}>
                    <ScrollView >
            
                        {this.TimeLap()}               
                    
                    </ScrollView>
                </View>
                
                             
            </View>
        )       
    }
    
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor:'black'   
  },
  lapBut:{
    alignSelf: 'center',
    height: 100,
    width: 100,
    marginTop: 10,
    backgroundColor: '#1B1B1C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1, 
  },
  startBut:{
    backgroundColor:'#19371F',
    
  },
  stopBut:{
    
    backgroundColor:'#441D1D',
  },
  startText:{
    color:'#00FF37',
  },
  stopText:{
    color:'red',
  },
  time:{
    flexDirection:'row',
    alignSelf:'center',

  },
  timeLap:{
    flexDirection:'row',
    alignSelf:'center',

  },
  minute:{

  },
  second:{

  },
  milisecond:{

  },
  button:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'flex-end'
    
  },
  buttonLeft:{
    
  },
  buttonRight:{

  },
  but:{
    borderRadius:30,
  },
  lap:{

    paddingHorizontal:20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderTopColor:'#1B1B1C',
    borderBottomColor:'#1B1B1C',
    borderWidth:1,
    
  },
  timeText:{
    fontSize:90,
    color:'white',
    fontWeight:'100',

  },
  timeTextLap:{
    color:'white',
    fontSize:20,
  },

});


