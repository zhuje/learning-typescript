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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Human = /** @class */ (function () {
    function Human() {
    }
    Human.prototype.speak = function (sound) {
        console.log("Human says : ".concat(sound));
    };
    Human.prototype.dance = function (dance, danceMove) {
        if (dance && danceMove) {
            console.log("I'm busting a move: ".concat(danceMove));
        }
        console.log("I don't dance");
    };
    return Human;
}());
console.log("\n****** Implementing Interfaces and Classes ****** ");
var Bob = new Human();
Bob.speak("Hello, I'm Bob!");
Bob.dance(false);
var DesktopDirectory = /** @class */ (function () {
    function DesktopDirectory() {
        this.config = {
            default: {
                encoding: "utf-8",
                permissions: "123-abc",
            },
        };
    }
    DesktopDirectory.prototype.addFile = function (name) {
        console.log("Create file named ".concat(name));
    };
    DesktopDirectory.prototype.showPreview = function (name) {
        console.log("Showing preview for file : ".concat(name));
    };
    return DesktopDirectory;
}());
console.log("\n****** Deep Types: creating nested properites in an interface  ****** ");
var Desktop = new DesktopDirectory();
console.log("Desktop config: ".concat(JSON.stringify(Desktop.config, null, 2)));
Desktop.addFile('fileABC.txt');
Desktop.showPreview('abc-abc-abc-abc-abc-abc');
// class implements interface(s)
var Pie = /** @class */ (function () {
    function Pie() {
        this.sweet = true;
        this.flaky = true;
        this.ingredients = ['strawberry', 'rhurbarb'];
    }
    Pie.prototype.bake = function (dessertType) {
        console.log("\n Baking a ".concat(dessertType, " with the fillings: ").concat(this.ingredients, ". \n            \nIs it sweet? ").concat(this.sweet, ". \n            \nIs it flaky? ").concat(this.flaky));
    };
    return Pie;
}());
// class extends class (can overwrite inherited properties/functions )
var Cake = /** @class */ (function (_super) {
    __extends(Cake, _super);
    function Cake() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.flaky = false;
        _this.ingredients = ['chocolate'];
        return _this;
    }
    Cake.prototype.frostCake = function (flavor) {
        this.frosting = flavor;
    };
    Cake.prototype.checkFrosting = function () {
        if (this.frosting === undefined) {
            console.log("We haven't frosted the cake yet");
        }
        else {
            console.log("We've frosted the cake. This frosting flavor, ".concat(this.frosting, ", will be delicious!"));
        }
    };
    return Cake;
}(Pie));
console.log("\n******* Extending Interfaces *****");
var myPie = new Pie();
myPie.bake('pie');
var myCake = new Cake();
myCake.bake('cake');
console.log('\nHave we frosted the cake yet?');
myCake.checkFrosting();
console.log('\nLet frost the cake.');
myCake.frostCake('vanilla');
myCake.checkFrosting();
