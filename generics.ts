// Executed with Typescript Playground

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

const getChildren = (family: Family<Person|Dog>) => {
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

// Call 
getChildren(FidoDogFamily)
getChildren(JohnsonPersonFamily)
