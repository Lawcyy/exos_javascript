
const button = document.getElementById('form-button');
const rapport = document.getElementsByTagName('small'); 
let id = 0;

const enoughCharacters = (length) => length <= 1 || length >= 20 ? false : true;
const isItNumbers = (value) => {

    if (isNaN(value) === true) {
        return false;
    }
}
const samePassword = (value,value2) => value === value2 ? true : false; 

let verification = (pseudo,age,mdp,mdp2) => {
    
    if (enoughCharacters(pseudo.length) === false) {
        alert("Le pseudo doit faire 1-20 caractères");
    } else if (isItNumbers(age) === false ) {
        alert("L'âge doit être un nombre");
    } else if (samePassword(mdp,mdp2) === false) {
        alert("Les mots de passe ne correspondent pas");
    } else {
        return true;
    }
};

function createTab(entry,where) {
    
    const newCell = where.insertCell(-1);
    newCell.innerHTML = entry;
};

async function hash(mdp) {
    const msgBuffer = new TextEncoder().encode(mdp);     
    const hashBuffer = await crypto.subtle.digest("SHA-512", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));                
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
}

button.onclick = async function() {
    const pseudo = document.getElementById('pseudo');
    const age = document.getElementById('age');
    const mdp = document.getElementById('mdp');
    const mdp2 = document.getElementById('mdp2');
    const date = new Date();
    const day = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const hours = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const date_hours = day + ' ' + hours;

    let hashed_mdp = await hash(mdp.value);

    const validite = verification(pseudo.value,age.value,mdp.value,mdp2.value);
    // const validite = true;
    if (validite === true) {
        
        const tab = document.getElementById("tableau");
        const newRow = tab.insertRow(-1);
        id++;
        const del_button = "<button id="+id+">Supprimer</button>";
        createTab(id,newRow);
        createTab(pseudo.value,newRow);
        createTab(age.value,newRow);
        createTab(date_hours,newRow);
        createTab(hashed_mdp,newRow);
        createTab(del_button,newRow);
        const del = document.getElementsByTagName('tbody > button');
        del.setAttribute('id','del-button');
        
    }
}

const del_row = document.getElementById("del-button");

del_row.onclick = function() {
    document.getElementById("tableau").deleteRow(0);
}

