// Unions allow multiple types -- instead of any. 
// Concept 1) What is a Union type 
// Concept 2) What is type narrowing, what is a type guard, why do you need a type guard
// Concept 3) Unions with Arrays - How do you declare an array that supports multiple types?
// Concept 4) Unions with Custom Types - Can we only use commmon properities and methods custom types in unions?
// Concept 5) Unions with Literal Types 

/**
 * Concept 1) What is a Union Type 
 * @param x is a number of string instead of any 
 * (x: number | string) allow the parameter to be 
 * of type string or number 
 */
const getNumAndString = (x: number | string) => {
    console.log(x)
}
const printConcept1 = () => {
    getNumAndString('HELLO WORLD')
    getNumAndString(5)    
}


/**
 * Concept 2) What is type narrowing, what is a type guard, why do you need a type guard
 * 2a) Type guard - is a conditional statement that allows use to 
 * determine the type of the variable 
 * 2b) Type narrowing - is when typescript can figure out what type a variable is 
 * this allow us to preform type specific actions without errors being thrown by the compiler. 
 * Type narrowing is a result of type guarding. 
 * 2c) Why do we neeed type guards? Because it allow type narrowing -- without it typescript 
 * would throw errors because we can't preform type specific actions like 
 * .toFixed() on variables that aren't numbers 
 * or .toLowerCase() on variables that aren't strings 
 */
function formatValue(value: number | string){
    if (typeof value === 'number'){
        console.log(value.toFixed(2));
    }
    if (typeof value === 'string'){
        console.log(value.toLowerCase());
    }
}
const printConcept2 = () => {
    formatValue('HELLO WORLD') // output 'hello world' 
    formatValue(5) // output '5.00'
    
}

/**
 * Concept 3) How do you declare an array that supports multiple types? 
 * (string|number)[] 
 * The parentensis are important! If you wrote string | number[], 
 * this will mean a string or an array of numbers. 
 * (string|number)[] - this means a an array of consisting of strings or numbers 
 */

const formatListing = (listings: (string|number)[]) => {
    listings.forEach((listing) => {
        if (typeof listing === 'string'){
            console.log(listing.toUpperCase());
        }
        if (typeof listing === 'number'){
            console.log(`$${listing.toLocaleString()}`)
        }
    })
}
const listings = [
    '123 Main Street', 
    100000,
    '456 Spring Lane', 
    200000
]

const printConcept3 = () => {
    formatListing(listings)
}


/**
 * Concept 4) Can we use commmon properities and methods custom types in unions?
 * Yes, when creating a union type we can only call on properties or methods that 
 * are common to both types in the union. 
 * For example, if we have a social media application where we want to get 
 * the username of display name from a Like or Share:  
 */

type Like = {
    username: string; 
}
type Share = {
    username: string; 
    displayName: string; 
}

const onClick = (event: Like | Share) => {
    // console.log(event.displayName);
    //   This will cause a Typescript error because .displayName is not a shared property of Like and Share
    //   Property 'displayName' does not exist on type 'Like | Share'.
    //   Property 'displayName' does not exist on type 'Like'.

    console.log(event.username);
    // This will work because .username is a shared property of Share and Like 
}

const newEvent = {
    username: 'jezhu',
    displayName: 'Jenny Zhu'
}

const printConcept4 = () => {
    onClick(newEvent)
}

/**
 * Concept 5) Union type with literals 
 */

type Status = 'idle' | 'downloading' | 'complete' // Union type with literals 

const downloadStatus = (status: Status) => {
  if ( status === 'idle') {
    console.log('Download');
  }
  if ( status === 'downloading'){
    console.log('Downloading...')
  } 
  if ( status === 'complete'){
    console.log('Your download is complete!');
  }
}

const printConcept5 = () => {
    downloadStatus('complete')
}


const printResults = () => {
    printConcept1(); 
    printConcept2();
    printConcept3(); 
    printConcept4();
    printConcept5();
}