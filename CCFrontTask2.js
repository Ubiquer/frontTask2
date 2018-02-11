
const  runicTable = [ 
    { rune:"El", power:28, antiRune:"Ort" },
    { rune:"Eld", power:33, antiRune:"Sur" },
    { rune:"Tir", power:9, antiRune:"Eth" },
    { rune:"Nef", power:7, antiRune:"Ist" },
    { rune:"Eth", power:31, antiRune:"Tir" },
    { rune:"Ith", power:22, antiRune:"Pul" },
    { rune:"Tal", power:8, antiRune:"Lo" },
    { rune:"Ral", power:25, antiRune:"Um" },
    { rune:"Ort", power:18, antiRune:"El" },
    { rune:"Thul", power:13, antiRune:"Sol" },
    { rune:"Amn", power:6, antiRune:"Fal" },
    { rune:"Sol", power:10, antiRune:"Thul" },
    { rune:"Shael", power:17, antiRune:"Lem" },
    { rune:"Dol", power:11, antiRune:"Hel" },
    { rune:"Hel", power:12, antiRune:"Dol" },
    { rune:"Io", power:20, antiRune:"Tal" },
    { rune:"Lum", power:32, antiRune:"Gul" },
    { rune:"Ko", power:27, antiRune:"Mal" },
    { rune:"Fal", power:14, antiRune:"Amn" },
    { rune:"Lem", power:26, antiRune:"Shall" },
    { rune:"Pul", power:15, antiRune:"Ith" },
    { rune:"Um", power:16, antiRune:"Ral" },
    { rune:"Mal", power:21, antiRune:"Ko" },
    { rune:"Ist", power:4, antiRune:"Nef" },
    { rune:"Gul", power:23, antiRune:"Lum" },
    { rune:"Vex", power:24, antiRune:"Ohm" },
    { rune:"Ohm", power:1, antiRune:"Vex" },
    { rune:"Lo", power:2, antiRune:"Cham" },
    { rune:"Sur", power:30, antiRune:"Eld" },
    { rune:"Ber", power:3, antiRune:"" },
    { rune:"Jah", power:5, antiRune:"Zod" },
    { rune:"Cham", power:29, antiRune:"Lo" },
    { rune:"Zod", power:19, antiRune:"Jah" },
]

const sortedRunicTable = runicTable.sort(function(a, b){
    return parseFloat(b.power) - parseFloat(a.power)
});

    let runicWordsArray = [];
    const unusedRuneArray = [];
    let runicWord = [];
    let currentRunicWord = [];
    const finalRunicWords = [];

function strcmp(a, b) {
      return (a < b ? -1 : (a > b ? 1 : 0));
}

function checkForNullOrEmpty(runicWord){
    if(typeof runicWord === "undefined" || runicWord === null || !runicWord.value){
     console.log("Input is undefined, null or empty")
     return false;
    }
    else return true;
 }

    exports.generateRunicWords = spellLength =>{
        
        if(checkForNullOrEmpty(spellLength) && spellLengthIsNumber(spellLength)){

            for(let i=0; i< sortedRunicTable.length; i++ ){
                currentRunicWord = sortedRunicTable[i];
            
                if(runicWordsArray.length<10){
                    checkForUnusedRune(runicWord);
                    if(runicWordIsFull(runicWord, spellLength) == true){
                        runicWordsArray.push(runicWord);
                        runicWord = [];
                        checkForUnusedRune(runicWord);
                    }
                    addObjectToRunicWord(runicWord, currentRunicWord);
                }
            }
            createMostPowerfullWords(runicWordsArray, spellLength);
            console.log(finalRunicWords);
            return finalRunicWords;
        }else console.log("Input is not a number");
    }

    function spellLengthIsNumber(spellLength){
        return typeof(spellLength) === 'number' &&
        isFinite(spellLength) &&
        Math.round(spellLength) === spellLength;
    }

    function checkForUnusedRune(myRunicWordArray){
        let numberOfDeletedObjects = 0;
        for(let i=0; i<unusedRuneArray.length; i++){
            if(!checkForAntiRune(myRunicWordArray, unusedRuneArray[i])){
               runicWord.push(unusedRuneArray[i]);
               unusedRuneArray.splice(i-numberOfDeletedObjects, 1);
               numberOfDeletedObjects++;
            } 
        }
    }

    function checkIfRunicWordIsFull(myRunicWordArray, spellLength){
        if(myRunicWordArray.length == spellLength && unusedRuneArray.length > 0){
            myRunicWordArray.push(unusedRuneArray[0]);
        } 
    }

    function runicWordIsFull(runicWord, spellLength){
        if(runicWord.length === spellLength){
            return true;
        }
        else return false;
    }

    function checkForAntiRune(myRunicWordArray, myRune){
        let isValid = false;
        for(let i=0; i<myRunicWordArray.length; i++){
            if(strcmp(myRunicWordArray[i].antiRune, myRune.rune) == 0){
                isValid = true;
            }
        }
        return isValid;       
    }

    function addObjectToRunicWord(myRunnicWordArray, currentWord){
        if(!checkForAntiRune(myRunnicWordArray, currentWord)){
            runicWord.push(currentWord);
        }else{
            unusedRuneArray.push(currentWord);
        }
    }

    function createWord(myRunicWord, spellLength){
        let power = 0;
        let word = "";
        let runeWord={word:"",power:""};

        myRunicWord.forEach(element =>{    
            if(element.power!=null && element.rune!=""){
                power += element.power-1;
                word = word + element.rune + "-";
              }else{
                power = element.power;
                word = element.rune;
              }     
              runeWord.word = word;
              runeWord.power = power;
        })
        runeWord.word = runeWord.word.slice(0, -1);
        finalRunicWords.push(runeWord);
    }

    function createMostPowerfullWords(runicWordsArray, spellLength){
        runicWordsArray.forEach(element => {
            createWord(element, spellLength);
        });
    }

// ----------------------------------------------------------------------------

    const re = /[0-9A-Fa-f]{6}/g;
    let words = [];
    let runicObjects = [];
    let finalWord = [];
    let power = 0;
    let incorrectWord = "";
    let antiRuneSet = new Set();

    exports.checkRunicWord=runicWord=>{

        let spellIsCorrect = true;

        words = runicWord.split("-");

        if(onStartVerifiction(runicWord, words)){

        findAndVerifyRunicObjects(sortedRunicTable, words);
        if(runicObjects.length < words.length){
            spellIsCorrect = false;
            console.log("Part of your spell is not correct");
        }else if(spellIsInOrder(runicObjects, words)){
            spellIsCorrect = true;
            console.log(power);
        }else{
            spellIsCorrect = false;
            console.log("Spell is in wrong order! Probably fault of " + incorrectWord +
            ". Power of next parts of the word should be in descending order."); 
        } 
    } 
        // 
        if(spellIsCorrect) return power;
        
    }

    function onStartVerifiction(runicWord, words){
        if(re.test(runicWord, words)){
            console.log("Hex is not a spell. Go learn some magic..");
            return spellIsCorrect = false;
        }else if(/^-?[\d.]+(?:e-?\d+)?$/.test(runicWord)){
            console.log("Numbers are not allowed!");
            return spellIsCorrect = false;
        }else if(checkForNullOrEmpty(runicWord)){
            return spellIsCorrect = false;
        }else return spellIsCorrect = true;
    }

    function findAndVerifyRunicObjects(sortedRunicTable, words){
        for(let i=0; i<sortedRunicTable.length; i++){   
            findAndVerify(sortedRunicTable[i], words);
         }
    }

    function findAndVerify(runicObject, spells){
        for(let j= 0; j<spells.length; j++){              
            if(runicObject.rune == spells[j] && !antiRuneSet.has(runicObject.rune)){
                antiRuneSet.add(runicObject.antiRune);
                runicObjects.push(runicObject);
            } 
        }
    }

    function spellIsInOrder(myRunicObject, myWords){

        let isInOrder = false;
        for(i=0; i<myWords.length; i++){
          if(myRunicObject[i].rune == myWords[i]){  
              power += myRunicObject[i].power-1;
              isInOrder = true;
          }else{
              incorrectWord = myWords[i];
              isInOrder = false;
              return isInOrder;
          }
        }
        return isInOrder;
    }