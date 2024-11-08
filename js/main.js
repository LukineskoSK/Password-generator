/* DEFINICIA ZNAKOV */
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// ZISKANIE ELEMENTOV
const form = document.querySelector('form');
const finalPassword = form.querySelector('#result');
const lengthLabel = form.querySelector('#lengthLabel');
const lengthInput = form.querySelector('#lengthInput');
const includeLowercase = form.querySelector('#includeLowercase');
const includeUppercase = form.querySelector('#includeUppercase');
const includeNumber = form.querySelector('#includeNumber');
const includeSymbol = form.querySelector('#includeSymbol');

// NASTAVENIE POCIATOCNYCH HODNOT
lengthLabel.textContent = `Length: ${lengthInput.value}`;
includeLowercase.checked = true;
includeUppercase.checked = true;
includeNumber.checked = true;
includeSymbol.checked = true;

// Aktualizuje text v label podľa aktuálnej hodnoty posuvníka
lengthInput.addEventListener('input', (e)=> {
    lengthLabel.textContent = `Length: ${e.target.value}`;
});

// Funkcia na kontrolu či je aspoň jedno kriterium checknute
function isAnyOptionSelected(){
  return includeLowercase.checked || includeUppercase.checked || includeNumber.checked || includeSymbol.checked;
}

// Funkcie na Kontrolu či heslo obsahuje dane znaky
function hasLowerCase(password){
  return /[a-z]/.test(password);
};

function hasUppercase(password){
  return /[A-Z]/.test(password);
};

function hasNumber(password){
  return /[0-9]/.test(password);
};

function hasSymbol(password){
  return /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);
}

// Overenie či heslo obsahuje dane znaky
function isPasswordValid(password){
  if (includeLowercase.checked && !hasLowerCase(password) ) return false;
  if (includeUppercase.checked && !hasUppercase(password) ) return false;
  if (includeNumber.checked && !hasNumber(password) ) return false;
  if (includeSymbol.checked && !hasSymbol(password) ) return false;
  return true;
}

// Funkcia na generovanie hesla
function generatePassword() {
  // Ako prvé vytvoríme sadu znakov pre generovanie hesla
  let chars = "";
  if (includeLowercase.checked) chars += lowercase;
  if (includeUppercase.checked) chars += uppercase;
  if (includeNumber.checked) chars += numbers;
  if (includeSymbol.checked) chars += symbols;
  
  // Vytvorime si premennu password a lenghtPassword(ten precastujeme na number)
  let password = '';
  const lenghtPassword = Number(lengthInput.value);

  // Spusti sa cyklus ktorý sa zopakujem lenghtPassword-krat, každý cyklus vytvorí náhodne číslo 0-1 a vynasobí lenghtPasword a zaokruhli smerom nadol
  for (let i = 0; i < lenghtPassword; i++){
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  // Vráti vygenerované heslo 
  return password;
}

// Pridanie listener na formular na event submit 
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  // Overenie či aspoň jedno kriterium je zadané
  if(!isAnyOptionSelected()){
    alert('Zvoľ aspon jedno kriterium');
    return;
  } 

  // Vytvorenie dočasnej premennej tmp a cyklus ktorý sa bude opakovať až kým vygenerované heslo bude splnat vsetky kriteria
  let tmp = "";
  while(!isPasswordValid(tmp)){
    tmp = generatePassword();
    console.log(tmp)
  }
  
  // Pridanie hesla do Inputu
  finalPassword.value = tmp;
})