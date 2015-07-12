'use strict'
export {B4};
import React from 'react';


function createWebSocket(path) {
    let host = window.location.hostname;
    if(host == '') host = 'localhost';
    let uri = 'ws://' + host + ':3015' + path;

    let Socket = "MozWebSocket" in window ? MozWebSocket : WebSocket;
    return new Socket(uri);
}

const DES_ws = createWebSocket('/');

class ScoreBoard extends React.Component {

  constructor(props) {
    super(props);
  }
  render () {
      var formatted = this.props.scoreB.map(function(line) {
        return (<p key={line.id}>{line}</p>);
      });
      console.log(formatted);
      console.log(this);
        return (
            <div>
                Score Board <br /> name_score_group <br />
                {formatted}
            </div>
        )
    }
  }

class GroupNew extends React.Component {
  constructor(props) {
    super(props);
  }

  handleEnter (event) {
    let group = event.target.value;
    if (group == '') {
      return
    } else {
      if( event.keyCode == 13 ) {
        this.props.setGroup(group);
      }
    }
  }
  click (event) {
    let group = event.target.value;
    if (group == '') {
        return
    } else {
      this.props.setGroup(group);
    }
  }
  render () {
    console.log(this);
    if ((this.props.hidden2)) { return ( null ) }
    return (
      <div>
        <label>New Group<input type="text" id='cow' onKeyDown={this.handleEnter.bind(this)}
          onClick={this.click.bind(this)} style={{width: 90, backgroundColor: '#d8d17d', marginLeft: 10}} />
        </label>
      </div>
    );
  }
};

class ChangeColor extends React.Component {
  constructor(props) {
    super(props);
  }
  handleEnter (event) {
    let color = event.target.value;
    if ( event.keyCode == 13 && color != '') {
        this.props.changeC(color);
      }
    }
  click (event) {
    let color = event.target.value;
    if (color != '') {
      this.props.changeC(color);
    }
  }
  render () {
    console.log(this);
    return (
      <div style={{fontSize: 22}}>
        <label>
          <input type="text" onKeyDown={this.handleEnter.bind(this)} onClick={this.click.bind(this)}
          style={{width: 70, backgroundColor: '#d8d17d'}} />
          Font Color
        </label>
      </div>
    );
  }
};

class ChangeBackground extends React.Component {
  constructor(props) {
    super(props);
  }

  handleEnter (event) {
    let color = event.target.value;
    if ( event.keyCode == 13 && color != '') {
        this.props.changeB(color);
      }
    }
  click (event) {
    let col = event.target.value;
    if (col != '') {
      this.props.changeC(col);
    }
  }
  render () {
    console.log(this);
    return (
      <div style={{fontSize: 22}}>
        <label>
          <input type="text" onKeyDown={this.handleEnter.bind(this)} onClick={this.click.bind(this)}
          style={{width: 70, backgroundColor: '#d8d17d'}} />
          Background Color
        </label>
      </div>
    );
  }
};

class Solutions extends React.Component {
    constructor(props) {
      super(props);
      let formatted;
  }
  clickHandler () {
    this.props.solFunc();
  }
  render () {
    if (this.props.hidden2) { return ( null ) }
    let formatted = this.props.sol.map(function(line) {
      return (<p>{line}</p>);
    });
    return (
      <div onClick={this.clickHandler.bind(this)} >
          Solutions (click) <br /> <br />
          {formatted}
      </div>
    )
  }
}

class SetGoal extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChange (event) {       // ISSUE: Input box does not receive input without this handleChange function. ??
    goal = event.target.value;
    this.props.change({goal: goal});
    this.props.setgoal(goal);
  }
  handleEnter (event) {
    if (this.props.goal == '') {
      return
    } else {
      if( event.keyCode == 13 ) {
        this.props.setgoal(goal);
      }
    }
  }
  click (event) {
    if (this.props.name == '') {
        return
    } else {
      this.props.setgoal(goal);
    }
  }
  render () {
    console.log(this);
    if ((this.props.hidden2)) { return ( null ) }
    let name = this.props.name;
    return (
      <div >
        <input type="text" name={name} onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleEnter.bind(this)} />
        {this.props.goal}
        <button onClick={this.click.bind(this)}>New goal</button>
      </div>
    );
  }
};

class Solutions2 extends React.Component {
    constructor(props) {
      super(props);
      let formatted;
  }
  clickHandler () {
    this.props.solFunc();
  }
  render () {
    let formatted = this.props.sol.map(function(line) {
      return (<p>{line}</p>);
    });
    if (this.props.hidden2) { return ( null ) }
    return (
        <div  onClick={this.clickHandler.bind(this)} >
          <div>
            Solutions <br /> <br />
            {formatted}
          </div>
        </div>
    )
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange (event) {       // ISSUE: Input box won't accept data without this handleChange function. ??
    this.props.change({name: event.target.value});
  }
  handleEnter (event) {
    if (this.props.name == '') {
      this.props.change({
        scoreB: [``],
        info: ``
      });
    }
    else {
    let ENTER = 13;
      if( event.keyCode == ENTER ) {
        let name = this.props.name;
        this.props.change({
          hidden: true,
          hidden2: false,
          name: name,
          buttonDisplay: 'inline',
          buttonDisplay2: 'inline',
          buttonDisplay3: 'inline',
          buttonDisplay5: 'inline',
          buttonDisplay15: 'inline'
          });
        DES_ws.send('CC#$42'+name);
      }
    }
  }
  click () {
    if (this.props.name == '') {
      this.props.change({
        scoreB: [`Please enter a name.`],
        info: `Please enter a name.`
      });
    } else {
      let name = this.props.name;
      this.props.change({
        hidden: true,
        hidden2: false,
        name: name,
        buttonDisplay: 'inline',
        buttonDisplay2: 'inline',
        buttonDisplay3: 'inline',
        buttonDisplay5: 'inline',
        buttonDisplay15: 'inline'
        });
      DES_ws.send('CC#$42'+name);
    }
  }
  render () {
    console.log(this);
    if ((this.props.hidden)) { return ( null ) }
    let name = this.props.name;
    return (
      <div>
        <input autoFocus type="text" name={name} onChange={this.handleChange.bind(this)}
          style={{backgroundColor: '#d8d17d'}}
        onKeyDown={this.handleEnter.bind(this)} />
        {this.props.name}
        <button onClick={this.click.bind(this)} style={{backgroundColor: '#d8d17d', color: '#f00'}} >
          Join
        </button>
      </div>
    );
  }
};

class B4 extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        d1: 0,
        d2: 0,
        d3: 0,
        d4: 0,
        mes0: 'Number',
        mes1: 'Operator',
        mes2: 'Number',
        temp: 'temp',
        sol: [],
        message1: 0,
        message2: 0,
        message3: 0,
        message4: 0,
        mAr: [0,0,0,0,'result'],
        op1: '+',
        op2: '-',
        op3: '*',
        op4: '/',
        op5: 'Concat',
        selection0: '77777',
        selection1: '88888',
        selection2: '99999',
        res: 'result',
        resPrevious: 'whatever',
        setInterval : 0,
        str1: "",
        str2: "",
        str3: "",
        str4: "",
        hidden: false,
        hidden2: true,
        togDice: false,
        name: "",
        DS_T: "SCORE!",
        N: 0,
        STRING: '',
        impossibleClicker: "a@F$Uy&imp",
        scoreClicker: "a@F$Uy&sc",
        interruptClicker: "a@F$intrup%$",
        scoreB: ["Greetings new player."],
        group: 'solo',
        info: 'Please enter a name.',
        used: [],
        dynamicBg: '#000000',
        dynamicColor: '#d5f765',
        dynamicFont: 20,
        test: false,
        message: '',
        score: false,
        impossible: false,
        interrupt: false,
        goal: 29,
        sty: {color: '#d5f765', width: 50, marginLeft: 30, padding: 10},
        buttonColor0: '#83f7d7',
        buttonColor1: '#83f7d7',
        buttonColor2: '#83f7d7',
        buttonColor3: '#83f7d7',
        buttonColor4: '#acf9a2',
        buttonColor5: '#acf9a2',
        buttonColor6: '#acf9a2',
        buttonColor7: '#acf9a2',
        buttonColor8: '#acf9a2',
        buttonColor9: '#83f7d8',
        buttonColor10: '#f4f7af',
        buttonColor11: '#f4f7af',
        buttonColor12: '#f4f7af',
	      buttonColor13: '#f4f7af',
        buttonColor14: '#f4f7af',
        buttonColor: '#83f7d7',
        colorB42: '#000',
        buttonDisplay: 'none',
        buttonDisplay2: 'none',
        buttonDisplay3: 'none',
        buttonDisplay4: 'none',
        buttonDisplay5: 'none',
        buttonDisplay15: 'none',
        chatMessage: ''
      }

let that = this;

DES_ws.onopen = function(e) {
	console.log("DES_ws.onopen");
  }

DES_ws.onmessage = function(event) {
  console.log("$$$$$$$$$$$$$$$$$$$$$___ incoming data ____")
  console.log(event.data);
  console.log("&&&&&&&&&&&&&&&&&&&& ___ that was incoming data ____")
  let gameArray = event.data.split(",");
  let d2 = event.data.substring(0,6);
  let d3 = event.data.substring(2,6);
  let sendersGroup = gameArray[1];   // The sender's group.
  let sender = gameArray[2];
  let extra = gameArray[3];
  let ext4 = gameArray[4];
  let ext5 = gameArray[5];
  let ext6 = gameArray[6];
  let ext7 = gameArray[7];
  let ext8 = gameArray[8];
  let group = that.state.group;
  let name = that.state.name;
  console.log('################################################### gameArray #################');
  console.log(gameArray);
  console.log('################################################# That was gameArray ##########');
  // let p = $(document.createElement('p')).text(event.data);
  let ar = extra.split("<br>");
  let ar2 = ar.map(function (x) {
    return x.split("_")
  })
  function inGroup (x) {
    return x[2] == ' ' + group
  }
  let ar3 = ar2.filter(inGroup)
  console.log("44444444444444444444444444444444444444444444444444444 ar, ar2, ar3 ")
  console.log(ar);
  console.log(ar2);
  console.log(ar3);
  console.log("4444444444444444444444444444444444444444444444444444444444444444444")

  if ( ( that.state.group === gameArray[1]) ||
        name === sender || extra === '%#8*&&^1#$%^' || d2 === "CB#$42" ) {
      switch (d2) {

          case "CC#$42":
            if (extra === '%#8*&&^1#$%^')  {
              that.setState({info: `You entered a name which is already taken`})
              setTimeout( function() {
                document.location.reload(false);
              },2000);
            }
            else {
              that.setGroup('solo');
              DES_ws.send(`CO#$42,solo,${name},${name}`);
            }
          break;

          case "CZ#$42":
              let sol = extra.split("<br />");
              that.setState({sol: sol});
            //  $("#a2").html(sender + " clicked SOLUTIONS.<br><br>");
          break;

          case "CA#$42":               // Triggered by ROLL
              that.setState
              ({
                message1: extra,
                message2: ext4,
                message3: ext5,
                message4: ext6,
                str1: '',
                str2: '',
                str3: '',
                scoreClicker: "a@F$Uy&sc",
                impossibleClicker: "a@F$Uy&imp",
                interruptClicker: "a@F$intrup%$",
                sol: [],
                d1: extra,
                d2: ext4,
                d3: ext5,
                d4: ext6,
                buttonDisplay2: 'inline',
                buttonDisplay3: 'inline',
                buttonDisplay15: 'inline',
                score: false,
                impossible: false,
                interrupt: false,
                DS_T: 'SCORE!'
              });
          break;

          case "CE#$42":
              that.setState
              ({
                message1: extra,
                message2: ext4,
                message3: ext5,
                message4: ext6,
              });
          break;

          case "CB#$42":
            that.setState({
              scoreB: ar3
            });
            console.log("________________________CB extra");
            console.log(extra);
            console.log("________________________CB extra");
            //  }
          break;

          case "CD#$42":
            if (sender !== name) {
              that.setState({buttonDisplay2: 'none'});
              that.setState({buttonDisplay3: 'none'});
              that.setState({buttonDisplay4: 'none'});
            }
          break;

          case "CF#$42":
            that.setState
            ({
              mes0: 'Number',
              mes1: 'Operator',
              mes2: 'Number',
              res:  'result'
            });
          break;

          case "CH#$42":
            that.setState
            ({
              hidden: true,
              str1: extra,
              str2: ext4,
              str3: ext5
            });
          break;

          case "CJ#$42":
              that.setState
              ({
                hidden2: false,
                hidden5: false
              });
          break;

          case "CK#$42":
              that.setState
              ({
                DS_T: extra
              });
          break;

          case "CP#$42":
              that.setState({res: extra});
          break;

          case "CQ#$42":
              that.state[extra]=ext4;
              that.forceUpdate();
          break;

          case "CR#$42":
            that.setState({
              buttonDisplay2: 'inline',
              buttonDisplay15: 'inline',
              message1: 0,
              message2: 0,
              message3: 0,
              message4: 0,
              info: ''
            });
          break;

          case "CS#$42":
            if (sender !== name) {
              that.state[extra]=ext4;
              that.forceUpdate();
            };
          break;

          case "CY#$42":           // Clicked "SCORE!"
            that.setState( {
              scoreClicker: extra,
              score: true,
              message: '',
              DS_T: 10,
              buttonDisplay3: 'none',
              buttonDisplay15: 'none',
            } )
            if (extra !== name) {
                setTimeout ( function() {
                  that.setState({buttonDisplay15: 'inline'});
                },8000 )
            }
          break;

          case "XY#$42":              // Clicked "SCORE!" after "IMPOSSIBLE"
            that.setState( {
              interruptClicker: extra,
              interrupt: true,
              message: '',
              DS_T: 10,
              buttonDisplay2: 'inline',
              buttonDisplay4: 'none',
              buttonDisplay15: 'none'
            } )
            if (extra !== name) {
              }
              setTimeout ( function() {
                that.setState({buttonDisplay15: 'inline'});
              },8000 )
          break;

          case "DY#$42":                 // Clicked "IMPOSSIBLE"
            that.setState({
              impossibleClicker: extra,
              impossible: true,
              message: '',
              DS_T: 60,
              buttonDisplay2: 'none',
              buttonDisplay3: 'none',
              buttonDisplay4: 'inline',
              buttonDisplay15: 'none'
            })
          break;

          case "DC#$42":
            console.log("___________________########$$$$$$$$__________Name taken.");
            that.setState({})
          break;

          case "DZ#$42":
            let this2 = that;
            if (that.state.scoreClicker !== name) {
              let solutions = extra;
              that.delay(8000)
              .then( function() {
                  this2.setState({
                    sol: solutions.split("<br />"),
                  });
              })
            }
          break;

          case "IA#$42":
            that.setState({info: extra});
          break;

          case "SX#$42":
            DES_ws.send(`SX#$42,${group},${name},filler`);
            //  DES_ws.send("SX#$42," + groupM + "," + playerM + "," + rollM);
          break;

          default:
              console.log( "fell through to default");
          break;
      }
    }
  }

  setInterval( () => {
    let name = this.state.name;
    let group = this.state.group;
    let scoreClicker = this.state.scoreClicker;
		let impossibleClicker = this.state.impossibleClicker;
		let interruptClicker = this.state.interruptClicker
		let score = this.state.score;
		let impossible = this.state.impossible;
		let interrupt = this.state.interrupt;

    if ( this.state.DS_T > 0 ) {
      this.setState({DS_T: this.state.DS_T - 1});
      this.setState({info: this.state.DS_T});
    }

    if ( this.state.DS_T*1 === 0 ) {
      this.setState ({
            message1: 0,
            message2: 0,
            message3: 0,
            message4: 0,
            info: '',
            buttonDisplay2: 'inline',
            buttonDisplay3: 'none',
            buttonDisplay4: 'none'
        })
  	  let z = scoreClicker === name;
  		let z2 = impossibleClicker === name;
  		let z3 = interruptClicker === name;
  	  let gr = group;
      if (!interrupt) {
				if (z) {
        	DES_ws.send(`CG#$42,${gr},${name},-1`);
          this.setState({DS_T: `10 seconds expired. Deduct one point from ${scoreClicker}`});
      	}
			  else if (z2) {
        	DES_ws.send(`CG#$42,${gr},${name},1`);
          this.setState({DS_T: `60 seconds expired. One point for ${impossibleClicker}`});
				}
			}
      else if (interrupt) {
		    this.setState( {DS_T: `10 seconds expired. One point awarded to ${that.state.impossibleClicker}
	One point deducted from ${this.state.interruptClicker}`} )
				if (z2) {
					DES_ws.send(`CG#$42,${group},${name},1`);
					DES_ws.send(`CG#$42,${group},${interruptClicker},-1`);
      	}
		  }
		}
  }, 1000 )
}

isElement (x, ar) {
  var value = false;
  ar.map( e => {
	if (x === e) {
	  value = true;
	};
  })
  return value;
}

  getStyles () {
    return {
      padding: "1em",
      borderRadius: 5,
      background: this.state.dynamicBg
    };
  }

  changeBackground (color) {
    this.setState({
      dynamicBg: color
    });
  }

  changeColor (col) {
    this.setState({
      dynamicColor: col,
      sty: {color: col, width: 50, marginLeft: 30, padding: 10}
    });
  }

increaseFont () {
  let x = this.state.dynamicFont;
  if (x > 0) {
    this.setState( {dynamicFont: (x + 4) })
  }
}

decreaseFont () {
  let x = this.state.dynamicFont;
  if (x < 80) {
    this.setState( {dynamicFont: (x - 4) })
  }
}

  hoverHandler () {
    this.setState( {buttonColor: '#f99094' })
  }
  leaveHandler () {
    this.setState( {buttonColor: '#83f7d8' })
  }
  hoverHandler0 () {
    this.setState( {buttonColor0: '#f99094' })
  }
  leaveHandler0 () {
    this.setState( {buttonColor0: '#83f7d8' })
  }
  hoverHandler1 () {
    this.setState( {buttonColor1: '#f99094' })
  }
  leaveHandler1 () {
    this.setState( {buttonColor1: '#83f7d8' })
  }
  hoverHandler2 () {
    this.setState( {buttonColor2: '#f99094' })
  }
  leaveHandler2 () {
    this.setState( {buttonColor2: '#83f7d8' })
  }
  hoverHandler3 () {
    this.setState( {buttonColor3: '#f99094' })
  }
  leaveHandler3 () {
    this.setState( {buttonColor3: '#83f7d8' })
  }

  hoverHandler4 () {
    this.setState( {buttonColor4: '#f99094' })
  }

  leaveHandler4 () {
    this.setState( {buttonColor4: '#acf9a2' })
  }

  hoverHandler5 () {
    this.setState( {buttonColor5: '#f99094' })
  }

  leaveHandler5 () {
    this.setState( {buttonColor5: '#acf9a2' })
  }

  hoverHandler6 () {
    this.setState( {buttonColor6: '#f99094' })
  }

  leaveHandler6 () {
    this.setState( {buttonColor6: '#acf9a2' })
  }

  hoverHandler7 () {
    this.setState( {buttonColor7: '#f99094' })
  }

  leaveHandler7 () {
    this.setState( {buttonColor7: '#acf9a2' })
  }

  hoverHandler8 () {
    this.setState( {buttonColor8: '#f99094' })
  }

  leaveHandler8 () {
    this.setState( {buttonColor8: '#acf9a2' })
  }

  hoverHandler9 () {
    this.setState( {buttonColor9: '#f99094' })
  }

  leaveHandler9 () {
    this.setState( {buttonColor9: '#83f7d8' })
  }

  hoverHandler10 () {
    this.setState( {buttonColor10: '#f99094' })
  }

  leaveHandler10 () {
    this.setState( {buttonColor10: '#f7b16f' })
  }

  hoverHandler11 () {
    this.setState( {buttonColor11: '#f99094' })
  }

  leaveHandler11 () {
    this.setState( {buttonColor11: '#f7b16f' })
  }

  hoverHandler12 () {
    this.setState( {buttonColor12: '#f99094' })
  }

  leaveHandler12 () {
    this.setState( {buttonColor12: '#f7b16f' })
  }

  hoverHandler13 () {
    this.setState( {buttonColor13: '#f99094' })
  }

  leaveHandler13 () {
    this.setState( {buttonColor13: '#83f7d8' })
  }

  hoverHandler14 () {
    this.setState( {buttonColor14: '#f99094' })
  }

  leaveHandler14 () {
    this.setState( {buttonColor14: '#83f7d8' })
  }

  hoverHandler15 () {
    this.setState( {buttonColor5: '#f99094' })
  }

  leaveHandler15 () {
    this.setState( {buttonColor5: '#acf9a2' })
  }


  solutions () {
    let group = this.state.group;
    let name = this.state.name;
    let goal = this.state.goal;
    DES_ws.send( `CZ#$42,${group},${name},${goal}` );
  }

  moreUsed (x) {
    let ar = this.state.used;
    ar.push(x);
    this.setState({ used: ar });
  }

  delay(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
  }

  displayHandler () {
    console.log("##################$$$$$$$$$$$$$$$$$$$$$$$$___ IN displayHandler ___")
  }

  rollDice () {
    let col = this.state.dynamicColor;
    this.setState({
      DS_T: 'SCORE!',
      used: [],
      test: false,
      score: false,
      impossible: false,
      interrupt: false,
      message: 'You must click SCORE in order to gain a point.',
      sty: {color: col, width: 50, marginLeft: 30, padding: 10},
      colorB42: '#ff0000',
      buttonDisplay2: 'inline',
      buttonDisplay3: 'inline',
      buttonDisplay15: 'inline'
    });
    let name = this.state.name;
    let group = this.state.group;
    DES_ws.send(`CK#$42,${group},${name},SCORE!`);
    DES_ws.send(`CF#$42,${group},${name},filler`);
    let that = this;
    let delay = this.delay
    let s = DES_ws.readyState
    if (s === 1) {
      DES_ws.send(`CA#$42,${group},${name},6,6,12,20`);
    } else this.delay(300).then( function () {
      that.rollDice()
    })
    // this.setState({sty: {color: '#d5f765',
    //      fontSize: "38", textAlign: "center", padding: "20",  }});
  }

  getSolutions () {
      let name = this.state.name;
      let group = this.state.group;
      let a = this.state.d1;
      let b = this.state.d2;
      let c = this.state.d3;
      let d = this.state.d4;
      DES_ws.send(`CZ#$42,${group},${name},${a},${b},${c},${d},20`);
  }

  handleGroupA () {
    let name = this.state.name;
    DES_ws.send( `CO#$42,GroupA,${name},handleGroupA` );
    this.setState({group: 'GroupA'});
  }

  handleGroupB () {
    let name = this.state.name;
    DES_ws.send( `CO#$42,GroupB,${name},handleGroupB` );
    this.setState({group: 'GroupB'});
  }

  handleGroupC () {
    let name = this.state.name;
    DES_ws.send( `CO#$42,GroupC,${name},handleGroupC` );
    this.setState({group: 'GroupC'});
  }

  setGroup (x) {
    var name = this.state.name;
    this.setState({group: x});
    DES_ws.send( `CO#$42,${x},${name},filler` );
  }

  setInfo (x) {
    let name = this.state.name;
    let group = this.state.group;
    DES_ws.send( `IA#$42,${group},${name},${x}` );
  }

  setNumberAr (result,str,test) {
    let w1 = this.state.message1;
    let w2 = this.state.message2;
    let w3 = this.state.message3;
    let w4 = this.state.message4;
    let startArray = [w1, w2, w3, w4, result];
    this.newNums(result,str,test,teststartArray);
  }

  calc (mes0,mes1,mes2) {
    let that = this;
    let res = 0;
    let delay = this.delay;
    let n = this.state.N;
    let resP = this.state.resPrevious;
    let ar5 = [mes0,mes2];
    let test = (resP === mes0 || resP === mes2);
    DES_ws.send(`XXXXX In calc where test is defined resP: ${resP}   mes0: ${mes0}   mes2: ${mes2}   test: ${test}`);
    this.setState({
      test: test
    });
    switch (mes1) {
      case "+": that.comp( parseFloat(mes0) + parseFloat(mes2),mes0,mes1,mes2,test );
      break;
      case "-": that.comp( parseFloat(mes0) - parseFloat(mes2),mes0,mes1,mes2,test );
      break;
      case "*": that.comp( parseFloat(mes0) * parseFloat(mes2),mes0,mes1,mes2,test );;
      break;
      case "/": that.comp( parseFloat(mes0) / parseFloat(mes2),mes0,mes1,mes2,test );
      break;t
      case "Concat": that.comp( parseFloat(mes0+""+mes2),mes0,mes1,mes2,test );
      break;
      default : 'operator not selected';
    }
  }

  comp (result,mes0,mes1,mes2,test) {
    let str = `${mes0} ${mes1} ${mes2} = ${result}`;
    this.setState({
      STRING: str,
      resPrevious: result.toString(),
      message: '',
      colorB42: '#ff0000'
    })
    let w1 = this.state.message1;
    let w2 = this.state.message2;
    let w3 = this.state.message3;
    let w4 = this.state.message4;
    let startArray = [w1, w2, w3, w4, result];
    this.newNums(result,str,test,startArray);
  }

  newNums (result,str,test,x) {
    let j = 0;
    let gr = this.state.group;
    let ar = [];
    let clock = '';
    let name = this.state.name;
		let impossibleClicker = this.state.impossibleClicker;
		let interrupt = this.state.interrupt;
    let test2 = this.state.score || this.state.impossible;
    for (let k in x) {
        if (x[k] !== "" && x[k] !== undefined) {
        ar[j] = x[k];
        j += 1;
      }
    }
    DES_ws.send(`XXXXX in newNums ${ar}`);
    if (j === 3) {
      DES_ws.send(`CQ#$42,${gr},${name},str1,${str}`);
      DES_ws.send(`CE#$42,${gr},${name},${ar[0]},${ar[1]},${ar[2]},`);
      this.setState({message: 'You must use the red number in order to score in this round.'});
      if (test2) {
			  DES_ws.send( `CK#$42,${gr},${name},10` );
      }
    }
    else if (j === 2) {
      DES_ws.send(`CQ#$42,${gr},${name},str2,${str}`);
      DES_ws.send(`CE#$42,${gr},${name},${ar[0]},${ar[1]},,`);
      DES_ws.send(`XXXXX,${result === 20},${test},${interrupt},`);
      if ( (result === 20) && test && test2 && !interrupt ) {
          clock = `One point for ${name}`
          DES_ws.send( `CR#$42,${gr},${name},${name}` );
          DES_ws.send( `CG#$42,${gr},${name},1` );
      }
	  	else if ( (result === 20) && test && test2 && interrupt ) {
        clock = `One point for ${name}.
        Two points deducted from ${impossibleClicker}`;
        DES_ws.send( `CR#$42,${gr},${name},${name}` );
        DES_ws.send( `CG#$42,${gr},${name},1` );
		  	DES_ws.send( `CG#$42,${gr},${impossibleClicker},-2` );
	  	}
			else if (test2) {
      			  DES_ws.send( `CK#$42,${gr},${name},10` );
      }
    }
    else if (j === 1) {
      DES_ws.send(`CQ#$42,${gr},${name},str3,${str}`);
      DES_ws.send(`CE#$42,${gr},${name},${ar[0]},,,`)
      if (result === 20 && test && test2 && !interrupt) {
          clock = `One point for ${name}`;
          DES_ws.send( `CR#$42,${gr},${name},${name}` );
          DES_ws.send( `CG#$42,${gr},${name},1` );
      }
      else if (result === 20 && test && test2 && interrupt) {
        clock = `One point for ${name}.
        Two points deducted from ${impossibleClicker}`;
          DES_ws.send( `CR#$42,${gr},${name},${name}` );
          DES_ws.send( `CG#$42,${gr},${name},1` );
		      DES_ws.send( `CG#$42,${gr},${impossibleClicker},-2` );
        }
      else if (result !== 20 && test && test2 && !interrupt) {
          clock = `The result is not 20. ${name} lost one point.`;
          DES_ws.send( `CR#$42,${gr},${name},${name}` );
          DES_ws.send( `CG#$42,${gr},${name},-1` );
        }
      else if (result !== 20 && test && test2 && interrupt) {
          clock = `The result is not 20. One point taken from ${name}.
          One point awarded to ${impossibleClicker}.`;
          DES_ws.send( `CR#$42,${gr},${name},${name}` );
          DES_ws.send( `CG#$42,${gr},${name},-1` );
		  		DES_ws.send( `CG#$42,${gr},${impossibleClicker},1` );
        }
      }
	  	if ( j === 1 || (result === 20 && j !== 3) ) {
        DES_ws.send( `CK#$42,${gr},${name},${clock}` );
				this.setState({
          DS_T: clock
        });
      }
			DES_ws.send( `CF#$42,${gr},${name},${name}` );
    }


  newPlayer (x) {
    this.setState({name: x});
    DES_ws.send("CC#42$"+x)
  }

  changeItem (x) {
    this.setState(x)
  }

  logMessage () {
    console.log("*************************************************************************** Message from logMessage");
  }

  buttonHandler () {
    let name = this.state.name;
    let group = this.state.group;
    let x = `Click SCORE to begin.`
    DES_ws.send( `IA#$42,${group},${name},${x}` );
    this.rollDice();
  }

  handleB40 () {
    let name = this.state.name;
    let group = this.state.group;
    let num = this.state.message1;
    let num0 = this.state.mes0;
    let op = this.state.mes1;
    let num2 = this.state.mes2;
    this.moreUsed(num);
    this.setState({message1: '' });
    if (this.state.mes0 === 'Number') {
      DES_ws.send(`CQ#$42,${group},${name},mes0,${num}`);
    }
    else if (this.state.mes2 === 'Number') {
      DES_ws.send(`CQ#$42,${group},${name},mes2,${num}`);
      if (this.state.mes1 !== 'Operator') {
        this.calc(num0, op, num);
      }
    }
  }

  handleB41 () {
    let name = this.state.name;
    let group = this.state.group;
    let num = this.state.message2;
    let num0 = this.state.mes0;
    let op = this.state.mes1;
    let num2 = this.state.mes2;
    this.moreUsed(num);
    this.setState({message2: '' });
    if (this.state.mes0 === 'Number') {
      DES_ws.send(`CQ#$42,${group},${name},mes0,${num}`);
      console.log('_________________________________________________________in handleB40');
    }
    else if (this.state.mes2 === 'Number') {
      DES_ws.send(`CQ#$42,${group},${name},mes2,${num}`);
      if (this.state.mes1 !== 'Operator') {
        this.calc(num0, op, num);
      }
    }
  }

  handleB42 () {
    let name = this.state.name;
    let group = this.state.group;
    let num = this.state.message3;
    let num0 = this.state.mes0;
    let op = this.state.mes1;
    let num2 = this.state.mes2;
    this.moreUsed(num);
    this.setState({message3: '' });
    if (this.state.mes0 === 'Number') {
      DES_ws.send(`CQ#$42,${group},${name},mes0,${num}`);
      console.log('_________________________________________________________in handleB40');
    }
    else if (this.state.mes2 === 'Number') {
      DES_ws.send(`CQ#$42,${group},${name},mes2,${num}`);
      if (this.state.mes1 !== 'Operator') {
        this.calc(num0, op, num);
      }
    }
  }

  handleB43 () {
    let name = this.state.name;
    let group = this.state.group;
    let num = this.state.message4;
    let num0 = this.state.mes0;
    let op = this.state.mes1;
    let num2 = this.state.mes2;
    this.moreUsed(num);
    this.setState({message4: '' });
    if (this.state.mes0 === 'Number') {
      DES_ws.send(`CQ#$42,${group},${name},mes0,${num}`);
      console.log('_________________________________________________________in handleB40');
    }
    else if (this.state.mes2 === 'Number') {
      DES_ws.send(`CQ#$42,${group},${name},mes2,${num}`);
      if (this.state.mes1 !== 'Operator') {
        this.calc(num0, op, num);
      }
    }
  }

  handleOp0 () {
    let name = this.state.name;
    let group = this.state.group;
    DES_ws.send(`CQ#$42,${group},${name},mes1,+`);
    let test = this.state.mes0 !== 'Number' && this.state.mes2 !== 'Number';
    if (test) {
        this.calc(this.state.mes0, '+',this.state.mes2);
    }
  }

  handleOp1 () {
    let name = this.state.name;
    let group = this.state.group;
    DES_ws.send(`CQ#$42,${group},${name},mes1,-`);
    let test = this.state.mes0 !== 'Number' && this.state.mes2 !== 'Number';
    if (test) {
        this.calc(this.state.mes0, '-',this.state.mes2);
    }
  }

  handleOp2 () {
    let name = this.state.name;
    let group = this.state.group;
    DES_ws.send(`CQ#$42,${group},${name},mes1,*`);
    let test = this.state.mes0 !== 'Number' && this.state.mes2 !== 'Number';
    if (test) {
        this.calc(this.state.mes0, '*',this.state.mes2);
    }
  }

  handleOp3 () {
    let name = this.state.name;
    let group = this.state.group;
    DES_ws.send(`CQ#$42,${group},${name},mes1,/`);
    let test = this.state.mes0 !== 'Number' && this.state.mes2 !== 'Number';
    if (test) {
        this.calc(this.state.mes0, '/',this.state.mes2);
    }
  }

  handleOp4 () {
    let name = this.state.name;
    let group = this.state.group;
    DES_ws.send(`CQ#$42,${group},${name},mes1,Concat`);
    let test = this.state.mes0 !== 'Number' && this.state.mes2 !== 'Number';
    if (test) {
        this.calc(this.state.mes0, 'Concat',this.state.mes2);
    }
  }

  handleScore () {
    let name = this.state.name;
    let group = this.state.group;
    if (this.state.DS_T === "SCORE!") {   // Click works only at the start of each round
      DES_ws.send( `CY#$42,${group},${name},${name}` );
    }
  }

    handleScore2 () {
    let name = this.state.name;
    let group = this.state.group;
    DES_ws.send( `XY#$42,${group},${name},${name}` );
  }

    handleImpossible () {
    let name = this.state.name;
    let group = this.state.group;
    DES_ws.send( `DY#$42,${group},${name},${name}` );
  }

  render () {
    let buttonCol = this.state.buttonColor;
    let buttonCol0 = this.state.buttonColor0;
    let buttonCol1 = this.state.buttonColor1;
    let buttonCol2 = this.state.buttonColor2;
    let buttonCol3 = this.state.buttonColor3;
    let buttonCol4 = this.state.buttonColor4;
    let buttonCol5 = this.state.buttonColor5;
    let buttonCol6 = this.state.buttonColor6;
    let buttonCol7 = this.state.buttonColor7;
    let buttonCol8 = this.state.buttonColor8;
    let buttonCol9 = this.state.buttonColor9;
    let buttonCol10 = this.state.buttonColor10;
    let buttonCol11 = this.state.buttonColor11;
    let buttonCol12 = this.state.buttonColor12;
    let buttonCol13 = this.state.buttonColor13;
    let buttonCol14 = this.state.buttonColor14;
    let dynB = this.state.dynamicBg;
    let dynC = this.state.dynamicColor;
    let dynF = this.state.dynamicFont;
    let buttonDisplay = this.state.buttonDisplay;
    let buttonDisplay2 = this.state.buttonDisplay2;
    let buttonDisplay3 = this.state.buttonDisplay3;
    let buttonDisplay4 = this.state.buttonDisplay4;
    let buttonDisplay5 = this.state.buttonDisplay5;
    let buttonDisplay15 = this.state.buttonDisplay15;
    let m1 = this.state.message1;

    console.log(this);
    return (
      <div style={{backgroundColor: dynB, color: dynC, fontSize: dynF, display: 'inlineBlock'}} >
          <div style={{width: 600, float: 'right'}} >
            <ChangeColor key='ChangeColor' changeC={this.changeColor.bind(this)}
              style={{width: 8}} />
            <ChangeBackground key='ChangeBackground' changeB={this.changeBackground.bind(this)}
              style={{width: 8}} />
            <button key='$#19' onClick={this.increaseFont.bind(this)}

              style={{backgroundColor: '#d8d17d', color: '#f00'}} >
               Increase Font Size</button>
            <span style={{backgroundColor: dynB, color: dynB}}>e</span>
            <button key='$#20' onClick={this.decreaseFont.bind(this)}
              style={{backgroundColor: '#d8d17d', color: '#f00'}} >
              Decrease Font Size</button>
            <ScoreBoard key='ScoreBoard' scoreB={this.state.scoreB} />
          </div>

          <div style={{display: buttonDisplay }} >
            Current roll: <button style={{backgroundColor: '#000', display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, fontSize: 20, marginLeft: 5, color: '#f00'}} > {this.state.d1} </button>
             <button style={{backgroundColor: '#000', display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, fontSize: 20, marginLeft: 5, color: '#f00'}} > {this.state.d2} </button>
               <button style={{backgroundColor: '#000', display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, fontSize: 20, marginLeft: 5, color: '#f00'}} > {this.state.d3} </button>
               <button style={{backgroundColor: '#000', display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, fontSize: 20, marginLeft: 5, color: '#f00'}} > {this.state.d4} </button>
           </div>

          <div> {this.state.info} </div>

          <button onMouseEnter={this.hoverHandler10.bind(this)} onClick={this.handleGroupA.bind(this)}
            onMouseLeave={this.leaveHandler10.bind(this)}
            style={{backgroundColor: buttonCol10, display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, fontSize: 14, marginLeft: 10}} >
            GroupA
          </button>

          <button onMouseEnter={this.hoverHandler11.bind(this)} onClick={this.handleGroupB.bind(this)}
            onMouseLeave={this.leaveHandler11.bind(this)}
            style={{backgroundColor: buttonCol11, display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, fontSize: 14, marginLeft: 10}} >
            GroupB
          </button>

          <button onMouseEnter={this.hoverHandler12.bind(this)} onClick={this.handleGroupC.bind(this)}
            onMouseLeave={this.leaveHandler12.bind(this)}
            style={{backgroundColor: buttonCol12, display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, fontSize: 14, marginLeft: 10}} >
            GroupC
          </button>

          <GroupNew key='GroupNew' setGroup={this.setGroup.bind(this)} hidden2={this.state.hidden2}
            name={this.state.name} />

          <br />

          <Login key='Login' newPlayer={this.newPlayer.bind(this)} name={this.state.name}
            setGroup={this.setGroup.bind(this)} change={this.changeItem.bind(this)}
            group={this.state.group} hidden={this.state.hidden} info={this.state.info}
             setInfo={this.setInfo.bind(this)} />

          <div style={{backgroundColor: '#000', color: '#0f0', display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, fontSize: 20}} >
             {this.state.str1} <br /> {this.state.str2} <br /> {this.state.str3} <br /> {this.state.str4}
          </div>

          <div style={{width: 1200, backgroundColor: dynB,  padding: 10}} > </div>

          <button onMouseEnter={this.hoverHandler9.bind(this)} onClick={this.handleScore.bind(this)}
            onMouseLeave={this.leaveHandler9.bind(this)}
            style={{backgroundColor: buttonCol9, display: buttonDisplay5, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, marginLeft: 10}} >
            {this.state.DS_T}
          </button>

          <button onMouseEnter={this.hoverHandler9.bind(this)} onClick={this.handleScore2.bind(this)}
            onMouseLeave={this.leaveHandler9.bind(this)}
            style={{backgroundColor: buttonCol9, display: buttonDisplay4, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, marginLeft: 10}} >
            SCORE!
          </button>

          <button onMouseEnter={this.hoverHandler14.bind(this)} onClick={this.handleImpossible.bind(this)}
            onMouseLeave={this.leaveHandler14.bind(this)}
            style={{backgroundColor: buttonCol14, display: buttonDisplay3, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, marginLeft: 10}} >
            IMPOSSIBLE
          </button>

      <div style={{display: buttonDisplay2}} >

          <div style={{width: 1200, backgroundColor: dynB,  padding: 10}} > </div>

          <div> {this.state.message } </div>

          <button onMouseEnter={this.hoverHandler0.bind(this)} onClick={this.handleB40.bind(this)}
            onMouseLeave={this.leaveHandler0.bind(this)}
            style={{backgroundColor: buttonCol0, display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, marginLeft: 10, fontSize: 20}} >
            {this.state.message1}
          </button>

          <button onMouseEnter={this.hoverHandler1.bind(this)} onClick={this.handleB41.bind(this)}
            onMouseLeave={this.leaveHandler1.bind(this)}
            style={{backgroundColor: buttonCol1, display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, fontSize: 20}} >
            {this.state.message2}
          </button>

          <button onMouseEnter={this.hoverHandler2.bind(this)} onClick={this.handleB42.bind(this)}
            onMouseLeave={this.leaveHandler2.bind(this)}
            style={{backgroundColor: buttonCol2, display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, fontSize: 20}} >
            {this.state.message3}
          </button>

          <button onMouseEnter={this.hoverHandler3.bind(this)} onClick={this.handleB43.bind(this)}
            onMouseLeave={this.leaveHandler3.bind(this)}
            style={{backgroundColor: buttonCol3, display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, fontSize: 20}} >
            {this.state.message4}
          </button>

          <div style={{width: 1200,  padding: 10}} > </div>

          <button onMouseEnter={this.hoverHandler4.bind(this)} onClick={this.handleOp0.bind(this)}
            onMouseLeave={this.leaveHandler4.bind(this)}
            style={{backgroundColor: buttonCol4, display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, marginLeft: 10, fontSize: 20}} >
            +
          </button>

          <button onMouseEnter={this.hoverHandler5.bind(this)} onClick={this.handleOp1.bind(this)}
            onMouseLeave={this.leaveHandler5.bind(this)}
            style={{backgroundColor: buttonCol5, display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, fontSize: 20}} >
            -
          </button>

          <button onMouseEnter={this.hoverHandler6.bind(this)} onClick={this.handleOp2.bind(this)}
            onMouseLeave={this.leaveHandler6.bind(this)}
            style={{backgroundColor: buttonCol6, display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, fontSize: 20}} >
            *
          </button>

          <button onMouseEnter={this.hoverHandler7.bind(this)} onClick={this.handleOp3.bind(this)}
            onMouseLeave={this.leaveHandler7.bind(this)}
            style={{backgroundColor: buttonCol7, display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, fontSize: 20}} >
            /
          </button>

          <button onMouseEnter={this.hoverHandler8.bind(this)} onClick={this.handleOp4.bind(this)}
            onMouseLeave={this.leaveHandler8.bind(this)}
            style={{backgroundColor: buttonCol8, display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, fontSize: 20}} >
            Concat
          </button>

      </div>

          <div style={{width: 1200,  padding: 10}} />


          <span style={{backgroundColor: '000', color: '#0f0', display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, marginLeft: 10, fontSize: 16}} >
            {this.state.mes0}
          </span>

          <span style={{backgroundColor: '000', color: '#0f0', display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, fontSize: 16}} >
            {this.state.mes1}
          </span>

          <span style={{backgroundColor: '000', color: '#0f0', display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, fontSize: 16}} >
            {this.state.mes2}
          </span>

          <span style={{backgroundColor: '000', color: '#0f0', display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, fontSize: 16}} >
            =
          </span>

          <span style={{backgroundColor: '000', color: '#0f0', display: buttonDisplay, paddingTop: 1.1,
              paddingBottom: 0.9, marginRight: 3, fontSize: 16}} >
            {this.state.res}
          </span>

          <div style={{width: 1200,  padding: 10}} >  </div>

      <div style={{display: buttonDisplay2}} >
          <button onMouseEnter={this.hoverHandler.bind(this)}
            onMouseLeave={this.leaveHandler.bind(this)} style={{backgroundColor: buttonCol, marginLeft: 10, display: buttonDisplay}}
              onClick={this.buttonHandler.bind(this)} >
             Roll
          </button>
      </div>
      <br /><br />

      <button  onClick={this.getSolutions.bind(this)} style={{backgroundColor: '#acf9a2', textAlign: 'left',
          display: buttonDisplay15, paddingTop: 1.1, paddingBottom: 0.9, marginRight: 3, fontSize: 20}} >
          Solutions <br />
        <div style={{backgroundColor: '#acf9a2'}}>
              {
                    this.state.sol.map(function(line) {
                      return (<p>{line}</p>)
                    })
              }
          </div>
      </button>
    </div>
    )}
  };

  React.render(<B4 />, document.getElementById('divSix'));
