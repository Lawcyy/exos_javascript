
const button = document.getElementById('form-button');
let pseudoUsed = [0];
let id = 0;
const tab = document.getElementById("tableau");

const enoughCharacters = (length) => length <= 1 || length >= 20 ? false : true;
const isItNumbers = (value) => {

    if (isNaN(value) === true) {
        return false;
    }
}
const samePassword = (value,value2) => value === value2 ? true : false; 

function alreadyUsed(pseudo) {
    return pseudoUsed.includes(pseudo);
}
function emptyCase(value) {
    return (value === null || value === "");
}

let verification = (pseudo,age,mdp,mdp2) => {
    
    if (enoughCharacters(pseudo.length) === false) {
        alert("Le pseudo doit faire 1-20 caractères");
    } else if (isItNumbers(age) === false ) {
        alert("L'âge doit être un nombre");
    } else if (samePassword(mdp,mdp2) === false) {
        alert("Les mots de passe ne correspondent pas");
    } else if (alreadyUsed(pseudo) === true) {
        alert("Ce pseudo est déja utilisé");
    } else if (emptyCase(pseudo)||emptyCase(mdp)) {
        alert("Une ou plusieurs cases ne sont pas complètes");
    } else {
        return true;
    }
};

function createTab(entry,where) {
    
    const newCell = where.insertCell(-1);
    newCell.innerText = entry;
};

function createButton(entry,where) {
    
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

    if (verification(pseudo.value,age.value,mdp.value,mdp2.value)) {
        
        id++;
        const newRow = tab.insertRow(-1);
        newRow.setAttribute('id',id);
        
        const del_button = "<button id='"+id+"' onClick='deleteRow(this.id)'>Supprimer</button>";
        createTab(id,newRow);
        createTab(pseudo.value,newRow);
        createTab(age.value,newRow);
        createTab(date_hours,newRow);
        createTab(hashed_mdp,newRow);
        createButton(del_button,newRow);

        pseudoUsed.push(pseudo.value);
        document.getElementById('form').reset();
    }
}

function deleteRow(id) {
    let row = document.getElementById(id);
    row.remove();
    pseudoUsed[id] = null;
}

