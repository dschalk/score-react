'use strict'
export {B4};
import React from 'react';

var mes0 = 'Number';
var mes1 = 'Operator';
var mes2 = 'Number';
var temp = 'temp';
var sol = 'solutions';
var message1 = 0;
var message2 = 0;
var message3 = 0;
var message4 = 0;
var op1 = '+';
var op2 = '-';
var op3 = '*';
var op4 = '/';
var op5 = 'Concat';
var selection0 = '77777';
var selection1 = '88888';
var selection2 = '99999';
var res = 'result';
var setIntervalVar = 0;
var str1 = "";
var str2 = "";
var str3 = "";
var str4 = "";


function createWebSocket(path) {
    var host = window.location.hostname;
    if(host == '') host = 'localhost';
    var uri = 'ws://' + host + ':3000' + path;

    var Socket = "MozWebSocket" in window ? MozWebSocket : WebSocket;
    return new Socket(uri);
}

var ws = createWebSocket('/');

ws.onopen = function() {
    ws.send('CC#$42David');
    /*
    console.log("readyState is: " + ws.readyState);
    setTimeout ( function () {
      ws.send("CZ#$42,pass,Michelle,1,1,1,1,20");
    },1000 );
    ws.send("CA#$42,pass,Jim,6,6,12,20");
    */
}



ws.onmessage = function(event) {
  console.log(event.data);
  var gameArray = event.data.split(",");
  var d2 = event.data.substring(0,6);
  var d3 = event.data.substring(2,6);
  var sendersGroup = gameArray[1];   // The sender's group.
  var sender = gameArray[2];
  var extra = gameArray[3];
  var ext4 = gameArray[4];
  var ext5 = gameArray[5];
  var ext6 = gameArray[6];
  var ext7 = gameArray[7];
  var ext8 = gameArray[8];
  console.log("******************* gameArray *********");
  console.log(gameArray);
  console.log("******************** Hello React *******************")
  // var p = $(document.createElement('p')).text(event.data);
  // if (((groupM === gameArray[1]) && (groupM !== "private")) || (playerM === sender) || sendersGroup === "pass") {}
      switch (d2) {

          case "CC#$42":
          break;

          case "CZ#$42":
              sol = extra;
            //  $("#show").prepend("<br>" + extra);
            //  $("#a2").html(sender + " clicked SOLUTIONS.<br><br>");
          break;

          case "CA#$42":               // Set up the next round of play.
              // refresh();
              // rollTextM = extra + "," + ext4 + "," + ext5 + "," + ext6;
              message1 = extra;
              message2 = ext4;
              message3 = ext5;
              message4 = ext6;

              // dM = -1;
              // populate(extra,ext4,ext5,ext6);
          break;

          case "CB#$42":
            //  if ("private" !== sendersGroup || sender == playerM) {
                var scoreBoard = extra;
            //  }
          break;

          case "DB#$42":
          break;

          case "CO#$42":
          break;

          case "CD#$42":       // Prevent new player login data from displaying as a chat message.

          break;

          case "CE#$42":
            //  DS_ob.ar = [];
          break;

          case "CF#$42":

          break;

          case "CG#$42":
            //  DS_T = -1;
          break;

          case "CH#$42":
              if (playerM !== sender) {
                //  if (gameM === "on") assign (extra, ext4, ext5, ext6, ext7, ext8);
              }
          break;

          case "CK#$42":       // Prevent new player login data from displaying as a chat message.

          break;

          case "CP#$42":

          break;

          case "CI#$42":

          break;

          case "CJ#$42":
            //  DS_T = 60;
          break;

          case "CL#$42":
            //  DS_T = -1;
          break;

          case "CS#$42":

          break;

          case "CW#$42":

          break;

          case "CM#$42":
            //  $("#a2").prepend("<br>Time's up and nobody found a solution");
            //  $("#newDisplay").show();
          break;

          case "CQ#$42":
              rollM = extra + "," + ext4 + "," + ext5 + "," + ext6;
            //  $("#show").prepend("The ranges are now " + extra + "," + ext4 + "," + ext5 + "," + ext6 + "<br>");
          break;

          case "CN#$42":
            //  DS_T = -1;
            //  $("#a2").append("<br>deduct two points from " + impossibleClickerM +
            //      "'s score. <br>A solution was found before 60 seconds had passed.");
            //  $("#newDisplay").show();
          break;

          case "CR#$42":
            //  refresh();
          break;

          case "DU#$42":
            /*  if (sendersGroup == "private") {
                $("#messages").html("Join a group in order to exchange messages");
              } else {
              $('#messages').append(sender + ": " + extra + "<br>");
              $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight});
            }  */
          break;

          case "EE#$42":

          break;

          case "SX#$42":
            //  ws.send("SX#$42," + groupM + "," + playerM + "," + rollM);
          break;

          default:
              console.log( " fell through to default");

          break;
      }
  }

class B40 extends React.Component {
  constructor(props) {
    super(props);
  }

  click () {
    var cal = this.props.calc;
    var nex = this.props.next;
    var t = this.props.message1;
    var m0 = this.props.mes0;
    var m1 = this.props.mes1;
    var m2 = this.props.mes2;

    if (m0 === 'Number') {
      this.props.change({mes0: t });
      this.props.change({message1: ""});
    }
    else if (m2 === 'Number') {
      this.props.change({mes2: t });
      this.props.change({message1: ""});
      if (m1 !== 'Operator') {
        setTimeout( function () {
          cal();
        },50 );
        setTimeout( function () {
          nex();
        },100 );
      }
    }
  }

  render () {
    console.log(this);
    return (
        <div onClick={this.click.bind(this)} style={{backgroundColor: '#000', color: '#d5f765',
          fontSize: "38", textAlign: "center", padding: "20", float: "left" }} >
          {this.props.message1}
        </div>
    )}

  };

  class B41 extends React.Component {
    constructor(props) {
      super(props);
    }

    click () {
      var calcu = this.props.calc;
      var t = this.props.message2;
      var m0 = this.props.mes0;
      var m2 = this.props.mes2;
      if (m0 === 'Number') {
        this.props.change({mes0: t });
        this.props.change({message2: ""});
      }
      else if (m2 === 'Number') {
        this.props.change({mes2: t });
        this.props.change({message2: ""});
        setTimeout( function () {
          calcu();
        },50 );
      }
    }

    render () {
      console.log(this);
      return (
          <div onClick={this.click.bind(this)} style={{backgroundColor: '#000', color: '#d5f765',
            fontSize: "38", textAlign: "center", padding: "20", float: "left" }} >
            {this.props.message2}
          </div>
      )}

    };

  class B42 extends React.Component {
    constructor(props) {
      super(props);
    }

    click () {
      var calcu = this.props.calc;
      var t = this.props.message3;
      var m0 = this.props.mes0;
      var m2 = this.props.mes2;
      if (m0 === 'Number') {
        this.props.change({mes0: t });
        this.props.change({message3: ""});
      }
      else if (m2 === 'Number') {
        this.props.change({mes2: t });
        this.props.change({message3: ""});
        setTimeout( function () {
          calcu();
        },50 );

      }
    }

    render () {
      console.log(this);
      return (
        <div onClick={this.click.bind(this)} style={{backgroundColor: '#000', color: '#d5f765',
          fontSize: "38", textAlign: "center", padding: "20", float: "left" }} >
          {this.props.message3}
        </div>
      )}

    };

  class B43 extends React.Component {
    constructor(props) {
      super(props);
    }

    click () {
      var calcu = this.props.calc;
      var t = this.props.message4;
      var m0 = this.props.mes0;
      var m2 = this.props.mes2;
      if (m0 === 'Number') {
        this.props.change({mes0: t });
        this.props.change({message4: ""});
      }
      else if (m2 === 'Number') {
        this.props.change({mes2: t });
        this.props.change({message4: ""});
        setTimeout( function () {
          calcu();
        },50 );

      }
    }

    render () {
      console.log(this);
      return (
        <div onClick={this.click.bind(this)} style={{backgroundColor: '#000', color: '#d5f765',
          fontSize: "38", textAlign: "center", padding: "20", float: "left" }} >
          {this.props.message4}
        </div>
      )}
    };

  class Op0 extends React.Component {
    constructor(props) {
      super(props);
    }

    click () {
        this.props.change({mes1: '+' });
        var calcu = this.props.calc;
        setTimeout( function () {
          calcu();
        },50 );
      }

    render () {
      console.log(this);
      return (
          <div onClick={this.click.bind(this)} style={{backgroundColor: '#000', color: '#d5f765',
            fontSize: "38", textAlign: "center", padding: "20", float: "left" }} >
            +
          </div>
      )}
    };

  class Op1 extends React.Component {
    constructor(props) {
      super(props);
    }

    click () {
        this.props.change({mes1: '-' });
        var calcu = this.props.calc;
        setTimeout( function () {
          calcu();
        },50 );
      }

    render () {
      console.log(this);
      return (
          <div onClick={this.click.bind(this)} style={{backgroundColor: '#000', color: '#d5f765',
            fontSize: "38", textAlign: "center", padding: "20", float: "left" }} >
            -
          </div>
      )}
    };

  class Op2 extends React.Component {
    constructor(props) {
      super(props);
    }

    click () {
        this.props.change({mes1: '*' });
        var calcu = this.props.calc;
        setTimeout( function () {
          calcu();
        },50 );
      }

    render () {
      console.log(this);
      return (
          <div onClick={this.click.bind(this)} style={{backgroundColor: '#000', color: '#d5f765',
            fontSize: "38", Align: "center", padding: "20", float: "left" }} >
            *
          </div>
      )}
    };

  class Op3 extends React.Component {
    constructor(props) {
      super(props);
    }

    click () {
        this.props.change({mes1: '/' });
        var calcu = this.props.calc;
        setTimeout( function () {
          calcu();
        },50 );
      }

    render () {
      console.log(this);
      return (
          <div onClick={this.click.bind(this)} style={{backgroundColor: '#000', color: '#d5f765',
            fontSize: "38", textAlign: "center", padding: "20", float: "left" }} >
            /
          </div>
      )}
    };

  class Op4 extends React.Component {
    constructor(props) {
      super(props);
    }

    click () {
        this.props.change({mes1: 'Concat' });
        var calcu = this.props.calc;
        setTimeout( function () {
          calcu();
        },50 );
      }

    render () {
      console.log(this);
      return (
          <div onClick={this.click.bind(this)} style={{backgroundColor: '#000', color: '#d5f765',
            fontSize: "38", textAlign: "center", padding: "20", float: "left" }} >
            Concat
          </div>
      )}
    };

  class B30 extends React.Component {
    constructor(props) {
      super(props);
    }

    render () {
      console.log(this);
      return (
          <div
            style={{backgroundColor: '#000', color: '#d5f765', fontSize:"32",
              textAlign: "center", padding: 20, float: "left" }} >
                  {this.props.mes0}
          </div>
      )}
    };

  class B31 extends React.Component {
    constructor(props) {
      super(props);
    }

    render () {
      console.log(this);
      return (
          <div
            style={{backgroundColor: '#000', color: '#d5f765', fontSize:"32",
              textAlign: "center", padding: 20, float: "left" }} >
                  {this.props.mes1}
          </div>
      )}
    };

    class B32 extends React.Component {
      constructor(props) {
        super(props);
      }

      render () {
        console.log(this);
        return (
            <div
              style={{backgroundColor: '#000', color: '#d5f765', fontSize:"32",
                textAlign: "center", padding: 20, float: "left" }} >
                    {this.props.mes2}
            </div>
        )}
      };

      class B33 extends React.Component {
        constructor(props) {
          super(props);
        }

        render () {
          console.log(this);
          return (
              <div
                style={{backgroundColor: '#000', color: '#d5f765', fontSize:"32",
                  textAlign: "center", padding: 20, float: "left" }} >
                      =
              </div>
          )}
        };

  class B34 extends React.Component {
    constructor(props) {
      super(props);
    }

  render () {
    console.log(this);
    return (
        <div
          style={{backgroundColor: '#000', color: '#d5f765', fontSize:"32",
            textAlign: "center", padding: 20, float: "left"}}  >
                  {this.props.res}
        </div>
    )}
  };

  class Roll extends React.Component {
    constructor(props) {
      super(props);
  }
  clickHandler () {
      this.props.roll();
  }
  render () {
    console.log(this);
    return (
        <div
          style={{backgroundColor: '#000', color: '#d5f765', fontSize:"32",
            textAlign: "center", padding: 20, float: "left"}} onClick={this.clickHandler.bind(this)} >
            ROLL
        </div>
    )}
  };

  class Solutions extends React.Component {
    constructor(props) {
      super(props);
  }
  clickHandler () {
      this.props.solFunc();
  }
  render () {
    console.log(this);
    return (
        <div style={{backgroundColor: '#000', color: '#d5f765', fontSize:"32",
            textAlign: "center", padding: 20, float: "left"}} onClick={this.clickHandler.bind(this)} >
            Solutions <br /> <br />
          {this.props.sol}
        </div>
    )}
  };

  class Display extends React.Component {
    constructor(props) {
      super(props);
    }

    render () {
      console.log(this);
      return (
          <div
            style={{backgroundColor: '#000', color: '#d5f765', fontSize:"32",
              textAlign: "center", padding: 20, float: "left"}}  >
              Computations: <br /> {this.props.str1} <br /> {this.props.str2} <br /> {this.props.str3} <br /> {this.props.str4}
          </div>
      )}
    };

class B4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mes0: mes0,
      mes1: mes1,
      mes2: mes2,
      message1: message1,
      message2: message2,
      message3: message3,
      message4: message4,
      selection0: selection0,
      selection1: selection0,
      selection2: selection0,
      res: res,
      ws: ws,
      str1: str1,
      str2: str2,
      str3: str3,
      sol: sol
      }
  }


  delay(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
  }


    /*

    // Using delay():
    delay(5000).then(function () { // (B)
        console.log('5 seconds have passed!')
    });





      );
    }
    else {
      reject(Error("It broke"));
    }
  });

promise.then(ws.send(`CZ#$42,pass,Steve,${a},${b},${c},${d},20`))


  doThis () {
var promise = new Promise(function(resolve, reject) {
    // do a thing, possibly async, then…
    if ( 2 === 2 ) {
      resolve(
      setTimeout ( function () {
        var a = this.state.message1;
        var b = this.state.message2;
        var c = this.state.message3;
        var d = this.state.message4;
      ws.send(`CZ#$42,pass,Steve,${a},${b},${c},${d},20`);

      );
    }
    else {
      reject(Error("It broke"));
    }
  });

promise.then(ws.send(`CZ#$42,pass,Steve,${a},${b},${c},${d},20`))


  doThis () {
  var promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      if ( everything turned out fine ) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });
        //return promise; //Give This To Someone
    }
  ********************************************
    var promise = new Promise(function(resolve, reject){
      //Do Something
      if(somthingWorked()){
        resolve("Stuff worked!");
      } else {
        reject("It broke");
      }
    });

    promise.then(function(result) {
      console.log(result); // "Stuff worked!"
    }, function(err) {
      console.log(err); // Error: "It broke"
    });
  ********************************************
  var LocationsFetcher = {
  fetch: function () {
    // returning a Promise because that is what fetch does.
    return new Promise(function (resolve, reject) {
      // simulate an asynchronous action where data is fetched on
      // a remote server somewhere.
      setTimeout(function () {

        // resolve with some mock data
        resolve(mockData);
    });
  }
};





  */





  displayHandler () {
      var a = this.state.mes0;
      var b = this.state.mes1;
      var c = this.state.mes2;
      var d = this.state.res;
      var st = `${a} ${b} ${c} = ${d}`
      if (this.state.str1 === '') {
        this.setState({str1: st });
      } else if (this.state.str2 === '') {
        this.setState({str2: st });
      } else if (this.state.str3 === '') {
        this.setState({str3: st });
      } else if (this.state.str4 === '') {
        this.setState({str4: st });
      }
  }

  rollDice () {
    var this2 = this;
    var delay = this.delay
    var rollD = function () {
      this2.setState({sol: sol});
      this2.setState({message1: message1});
      this2.setState({message2: message2});
      this2.setState({message3: message3});
      this2.setState({message4: message4});
      this2.setState({mes0: 'Number'});
      this2.setState({mes1: 'Operator'});
      this2.setState({mes2: 'Number'});
      this2.setState({res: 'result'});
      this2.setState({str1: ''})
      this2.setState({str2: ''})
      this2.setState({str3: ''})
      this2.setState({str4: ''})
    };
    var s = ws.readyState
    if (s === 1) {
      ws.send("CA#$42,pass,Susan,6,6,12,20");
      delay(30).then( function () {
        rollD();
      })
    } else this.delay(1000).then( function () {
      this2.rollDice()
    })
  }


  rollDice4 () {
      this.setState({sol: sol});
      this.setState({message1: message1});
      this.setState({message2: message2});
      this.setState({message3: message3});
      this.setState({message4: message4});
      this.setState({mes0: 'Number'});
      this.setState({mes1: 'Operator'});
      this.setState({mes2: 'Number'});
      this.setState({res: 'result'});
      this.setState({str1: ''})
      this.setState({str2: ''})
      this.setState({str3: ''})
      this.setState({str4: ''})
  }





  rollDice2 () {
      this.setState({message1: message1});
      this.setState({message2: message2});
      this.setState({message3: message3});
      this.setState({message4: message4});
      this.setState({sol: sol});
  }

  rollDice3 () {
    this.setState({sol: sol});
  }

  adjunct () {
      this.setState({message1: message1});
      this.setState({message2: message2});
      this.setState({message3: message3});
      this.setState({message4: message4});
      this.setState({mes0: 'Number'});
      this.setState({mes1: 'Operator'});
      this.setState({mes2: 'Number'});
      this.setState({res: 'result'});
      this.setState({sol: sol});
      this.setState({str1: ''})
      this.setState({str2: ''})
      this.setState({str3: ''})
      this.setState({str4: ''})
  }

  getSolutions () {
    var that = this;
    var setSol = function () {
      that.setState({sol: sol});
    };
    var a = this.state.message1;
    var b = this.state.message2;
    var c = this.state.message3;
    var d = this.state.message4;
    ws.send(`CZ#$42,pass,Steve,${a},${b},${c},${d},20`);
    this.delay(500).then( function () {
      setSol();
    })
  }

  nextRound () {
    var w1 = this.state.message1;
    var w2 = this.state.message2;
    var w3 = this.state.message3;
    var w4 = this.state.message4;
    var r = this.state.res;
    var ar = [];
    var n = 0;
    var mAr = [w1, w2, w3, w4, r];
    for (let k in mAr) {
	     if (mAr[k] !== "") {
	        ar[n] = mAr[k];
	        n += 1;
        }
    }
    this.setState({message1: ar[0]});
    this.setState({message2: ar[1]});
    this.setState({message4: ''})
    if ( n === 3 ) {
      this.setState({message3: ar[2]})
    }
    if ( n < 3 ) {
      this.setState({message3: ''})
    }
    if ( n === 1) {
      this.setState({message2: ''})
    }
    this.displayHandler();
    this.setState({mes0: 'Number'});
    this.setState({mes2: 'Number'});
    this.setState({mes1: 'Operator'});
    this.setState({res: 'result'});
  }

  changeItem (x) {
    this.setState(x)
  }

  getResult () {
    this.setState({sol: this.props.sol})
  }

  calc () {
    var m0 = this.state.mes0;
    var m1 = this.state.mes1;
    var m2 = this.state.mes2;
    switch (m1) {
        case "+": this.setState({res: parseFloat(m0) + parseFloat(m2)});
        break;
        case "-": this.setState({res: parseFloat(this.state.mes0) - parseFloat(m2)});
        break;
        case "*": this.setState({res: parseFloat(this.state.mes0) * parseFloat(m2)});
        break;
        case "/": this.setState({res: parseFloat(this.state.mes0) / parseFloat(m2)});
        break;t
        case "Concat": this.setState({res: parseFloat(m0+""+m2)});
        break;
        default : 'operator not selected';
    }
  }

  createMarkup () {
    return { __html: sol };
  };

  render () {
    console.log(this);
    return (
      <div>
        <Display str1={this.state.str1} str2={this.state.str2} str3={this.state.str3} str4={this.state.str4}/>
        <div style={{width: 8000, float: "left", padding: 20}} />
        <div style={{width: 8000, float: "left", padding: 20}} />
        <B40 message1={this.state.message1} change={this.changeItem.bind(this)} mes0={this.state.mes0} mes2={this.state.mes2}
          mes1={this.state.mes1} calc={this.calc.bind(this)} next={this.nextRound.bind(this)} />
        <B41 message2={this.state.message2} change={this.changeItem.bind(this)} mes0={this.state.mes0} mes2={this.state.mes2}
          mes1={this.state.mes1} calc={this.calc.bind(this)} next={this.nextRound.bind(this)} />
        <B42 message3={this.state.message3} change={this.changeItem.bind(this)} mes0={this.state.mes0} mes2={this.state.mes2}
          mes1={this.state.mes1} calc={this.calc.bind(this)} next={this.nextRound.bind(this)} />
        <B43 message4={this.state.message4} change={this.changeItem.bind(this)} mes0={this.state.mes0} mes2={this.state.mes2}
          mes1={this.state.mes1} calc={this.calc.bind(this)} next={this.nextRound.bind(this)} />
        <div style={{width: 8000, float: "left", padding: 20}} />
        <Op0 change={this.changeItem.bind(this)} mes0={this.state.mes0} mes2={this.state.mes2}
          mes1={this.state.mes1} calc={this.calc.bind(this)} next={this.nextRound.bind(this)} />
        <Op1 change={this.changeItem.bind(this)} mes0={this.state.mes0} mes2={this.state.mes2}
          mes1={this.state.mes1} calc={this.calc.bind(this)} next={this.nextRound.bind(this)} />
        <Op2 change={this.changeItem.bind(this)} mes0={this.state.mes0} mes2={this.state.mes2}
          mes1={this.state.mes1} calc={this.calc.bind(this)} next={this.nextRound.bind(this)} />
        <Op3 change={this.changeItem.bind(this)} mes0={this.state.mes0} mes2={this.state.mes2}
          mes1={this.state.mes1} calc={this.calc.bind(this)} next={this.nextRound.bind(this)} />
        <Op4 change={this.changeItem.bind(this)} mes0={this.state.mes0} mes2={this.state.mes2}
          mes1={this.state.mes1} calc={this.calc.bind(this)} next={this.nextRound.bind(this)} />
        <div style={{width: 8000, float: "left", padding: 20}} />
        <B30 mes0={this.state.mes0} />
        <B31 mes1={this.state.mes1} />
        <B32 mes2={this.state.mes2} />
        <B33 />
        <B34 res={this.state.res} />
        <div style={{width: 8000, float: "left", padding: 20}} />
        <Roll roll={this.rollDice.bind(this)} />
        <div style={{width: 8000, float: "left", padding: 20}} />
        <Solutions sol={this.state.sol} solFunc={this.getSolutions.bind(this)} result={this.getResult.bind(this)}
          dangerouslySetInnerHTML={this.createMarkup} />
      </div>
    )}
  };
/*
  B4.defaultProps = {
      mes0: mes0,
      mes1: mes1,
      mes2: mes2,
      temp: temp,
      sol: sol,
      message1: message1,
      message2: message2,
      message3: message3,
      message4: message4,
      selection0: selection0,
      selection1: selection0,
      selection2: selection0,
      res: res,
      ws: ws,
      onmessage: ws.onmessage,
      readyState: ws.readyState,
      onopen: ws.onopen,
      str1: str1,
      str2: str2,
      str3: str3,
      str4: str4
  }
*/
  React.render(<B4 />, document.getElementById('divSix'));
