export const checkIfNumber = (string) => {
    if(!isNaN(string) && !isNaN(parseFloat(string))){
        console.log("It's a number", string)
    }else{
        console.log("It's not a number", string)
    }
}

checkIfNumber("44")
checkIfNumber(44)
checkIfNumber("66.2")
checkIfNumber("")
checkIfNumber(" -66.2 ")
checkIfNumber(" -2")
checkIfNumber("10PX")