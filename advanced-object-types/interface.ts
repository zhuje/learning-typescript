/**
 * Concept 1) Interface vs types
 * Interface can only be used to define objects.
 * While types can define objects and primitives.
 * Differences: https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript
 * ^ this contains a matrix of capabilties of objects vs primitives
 *
 * When to use an interface vs. type: https://stackoverflow.com/questions/41682572/when-to-use-types-vs-interface-in-ts
 * Interface are best used when a behavior is shared among many different types (extend a inteface).
 * Interfaces extend behaviors horizontally.
 * Types should be used for vertical definitions - when an object can be composed with a variety of types.
 * Types provide more flexibility in they ways they can be combined (e.g. Unions).
 *
 * There is a high overlap of the capabilities of an interface vs type.
 * Key difference of the interface vs type.
 * Types
 * - Unions (useful when a function can handle multiple types)
 * Interfaces
 * - Declarative merging (useful when you use a 3rd party library and want to add more functionality)
 * https://blog.logrocket.com/types-vs-interfaces-typescript/
 */

/**
 * Concept 2) Intro to implementing Interfaces and Classes
 */
interface Behaviors {
  speak: (sound: string) => void;
  dance: (dance: boolean, danceMove?: string) => void;
}

class Human implements Behaviors {
  speak(sound: string) {
    console.log(`Human says : ${sound}`);
  }

  dance(dance: boolean, danceMove?: string) {
    if (dance && danceMove) {
      console.log(`I'm busting a move: ${danceMove}`);
    }
    console.log(`I don't dance`);
  }
}
console.log("\n****** Implementing Interfaces and Classes ****** ")
const Bob = new Human();
Bob.speak(`Hello, I'm Bob!`);
Bob.dance(false);

/**
 * Concept 3) Deep Types - nested methods and properies of interfaces
 */

interface Directory {
  // function
  addFile: (name: string) => void;

  // property
  config: {
    default: {
      encoding: string;
      permissions: string;
    };
  };
}

class DesktopDirectory implements Directory {
  config = {
    default: {
      encoding: "utf-8",
      permissions: "123-abc",
    },
  };

  addFile(name: string) {
    console.log(`Create file named ${name}`)
  }

  showPreview(name:string){
    console.log(`Showing preview for file : ${name}`)
  }

}

console.log("\n****** Deep Types: creating nested properites in an interface  ****** ")
const Desktop = new DesktopDirectory();
console.log(`Desktop config: ${JSON.stringify(Desktop.config, null, 2)}`)
Desktop.addFile('fileABC.txt')
Desktop.showPreview('abc-abc-abc-abc-abc-abc')

/**
 * Concept 5) Composed Types 
 * Nested properties in an interface can become hard to read. 
 * We want to break this up into multiple interfaces. 
 * This section refactors the code from Concept 4. 
 * 
 * interface Directory {
 * // function
 * addFile: (name: string) => void;

 * // property
 * config: {
 *   default: {
 *     encoding: string;
 *     permissions: string;
 *   };
 * };
 *}
 * 
 * We want to break down the `config` property so it is composed of many properies instead 
 * of one hard to read nested object. 
 */

interface DefaultConfig {
    encoding: string;
    permissions: string;
}

interface Config {
    default: DefaultConfig;
}

interface Directory {
    addFile: (name: string) => void; 
    config: Config;
}

/**
 * Concept 6) Extending Interfaces 
 * extends : class extends class, interface extends interface
 * implements : class implements interface 
 */

interface Ingredient {
    ingredients: string[];
}

// interface extends interface 
interface PieFilling extends Ingredient {
    sweet: boolean;
} 

// interface extends interface 
interface PieCrust extends Ingredient {
    flaky: boolean;
}

// class implements interface(s)
class Pie implements PieFilling, PieCrust { 
    sweet = true; 
    flaky = true; 
    ingredients = ['strawberry', 'rhurbarb'];
    
    bake(dessertType: string) {
        console.log(`\n Baking a ${dessertType} with the fillings: ${this.ingredients}. 
            \nIs it sweet? ${this.sweet}. 
            \nIs it flaky? ${this.flaky}`)
    }
}

// class extends class (can overwrite inherited properties/functions )
class Cake extends Pie {
    flaky = false;
    ingredients = ['chocolate']
    frosting: string; 

    frostCake(flavor:string) {
        this.frosting = flavor
    }

    checkFrosting() {
        if (this.frosting === undefined) {
            console.log("We haven't frosted the cake yet");
        } else {
            console.log(`We've frosted the cake. This frosting flavor, ${this.frosting}, will be delicious!`)
        }
    }
}



console.log("\n******* Extending Interfaces *****")
const myPie = new Pie();
myPie.bake('pie')

const myCake = new Cake();
myCake.bake('cake')

console.log('\nHave we frosted the cake yet?')
myCake.checkFrosting()


console.log('\nLet frost the cake.')
myCake.frostCake('vanilla')
myCake.checkFrosting()

