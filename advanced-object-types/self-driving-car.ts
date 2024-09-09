import { getObstacleEvents } from './computer-vision';

// Self Driving Car Exercise 

interface Steering extends Control {
  turn: (direction:string) => void;
}

interface Control {
  execute: (comand:string) => void;
}

interface Events {
  [event:string]: boolean
}

interface AutonomousCarProps {
  isRunning?: boolean
  steeringControl: Steering;
}

interface AutonomousCar {
  isRunning?: boolean
  respond: (events: Events)=>void
}

class Car implements AutonomousCar {
   isRunning; 
   steeringControl;

   constructor(props: AutonomousCarProps) {
    this.isRunning = props.isRunning;
    this.steeringControl = props.steeringControl;
   }

    respond(events: Events) {
      if (!this.isRunning) {
        console.log('The car is off')
        return;
      }
      Object.keys(events).forEach((eventKey)=>{
        if (!eventKey) {
          return; 
        }
        console.log(events)
        if (eventKey === 'ObstacleLeft') {
          this.steeringControl.turn('right')
        } 
        if (eventKey === 'ObstacleRight'){
          this.steeringControl.turn('left')
        }
      })
    }
}

class SteeringControl implements Steering {
  execute(command: string) {
    console.log(`Executing: turn ${command}`)
  }
  turn(direction: string) {
    this.execute(direction)
  }
}

const steering = new SteeringControl()
// steering.turn('right')

const autonomousCar = new Car(
  {
    isRunning: true,
    steeringControl: steering
  }
)
autonomousCar.respond(getObstacleEvents())

// tsc self-driving-car.ts 
// node self-driving-car.js 
//  EXPECTED OUTPUT 
// { ObstacleLeft: false, ObstacleRight: true }
// Executing: turn right
// { ObstacleLeft: false, ObstacleRight: true }
// Executing: turn left