type Dog = {
    name: string, 
    tailWagSpeed: number
}

type Person = {
    name: string, 
    occupation: string
}

// Generic type allows Family to be of type Dog or Person
type Family<T> = {
    parents: [T, T], 
    children: T[]
}

// Person Family 
const anna: Person = {
    name: 'anna', 
    occupation: 'accupunturist'
}
const bob: Person = {
    name: 'bob', 
    occupation: 'builder'
}
const connor: Person = {
    name: 'connor', 
    occupation: 'cardiologist'
}
const greg: Person ={
    name: 'greg', 
    occupation: 'geographer'
}
const JohnsonPersonFamily : Family<Person> = {
    parents: [anna, bob], 
    children: [connor,greg]
}

// Dog Family 
const dan: Dog = {
    name: 'dan', 
    tailWagSpeed: 1
}
const elle: Dog = {
    name: 'elle', 
    tailWagSpeed:2
}
const fred: Dog = {
    name: 'fred', 
    tailWagSpeed: 3
}
const FidoDogFamily: Family<Dog> = {
    parents: [dan, elle], 
    children: [fred]
}

// TYPEGUARDS 
// We need to assign the child type as Person otherwise ${child?.occupation} throws a type error 
const isOfTypeHuman = (child: any): child is Person => {
    return child.name !== undefined && child.occupation !== undefined
}
const isOfTypeDog = (child: any): child is Dog  => {
    return child.name !== undefined && child.tailWagSpeed !== undefined
}

const printChildren = (family: Family<Person|Dog>) => {
    if (family.children.length >= 1 ){ 
        family.children.forEach((child) => {
            console.log(`Child's name is : ${child.name}`)
            if (isOfTypeHuman(child)){
                console.log(`Child's occupation: ${child?.occupation}`)
            } 
            if (isOfTypeDog(child)){
                console.log(`Child tailWagSpeed: ${child?.tailWagSpeed}`)
            }
            console.log("**********************")
        })
    }
}

// GENERIC FUNCTIONS
// Must use <T extends unknown> for arrow functions
const addChild = <T extends unknown>(newChild: T, family: Family<T>) => {
    family.children.push(newChild)
    console.log(`Added newChild: ${JSON.stringify(family.children, null, 2)}`)
}

const getChildren = <T extends unknown>(family: Family<T>) : T[] => {
    return family.children
}

const printObjects = (obj) => {
    console.log(JSON.stringify(obj, null, 2))
}

// EXECUTE
// Test TypeGuard
printChildren(FidoDogFamily)
printChildren(JohnsonPersonFamily)

// Test Generic functions
const newPersonChild: Person = {
    name: 'heidi', 
    occupation: 'healer'
}
const newDogChild: Dog = {
    name: 'ida', 
    tailWagSpeed: 4
}
addChild<Person>(newPersonChild, JohnsonPersonFamily)
// Adding a Person to a Family<Dog> causes a type error 
// addChild(newPersonChild, FidoDogFamily) 
addChild<Dog>(newDogChild, FidoDogFamily)

const personChildren = getChildren<Person>(JohnsonPersonFamily);
const dogChildren = getChildren<Dog>(FidoDogFamily)
printObjects(personChildren);
printObjects(dogChildren)
