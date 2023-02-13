import { encrypt } from "./encrypt.js";
import { decrypt } from "./decrypt.js";

window.addEventListener("load", () => {

    const inputTextarea = document.querySelector(".encrypterInput");
    const outputTextarea = document.querySelector(".encrypterOutput");

    const outputContainer = document.querySelector(".encrypterOutput-container");

    const encryptBtn = document.querySelector(".encrypt-btn");
    const decryptBtn = document.querySelector(".decrypt-btn");
    const copyBtn = document.querySelector(".copy-btn");

    const searchImg = document.querySelector("#search-img");
    const h3 = document.getElementById("no-message-h3");
    const p = document.getElementById("no-message-p");
    const small = document.getElementById("warning");

    let inputText;
    let regEx = /([A-ZáéíóúÁÉÍÓÚÄÄËÏÖÜäëïöüàèìòùÀÈÌÒÙÇç\d$@$!%*?&<>¡¿#+~\=\[\]\{\}\\\/\^\`-])/;

    outputTextarea.style.display = "none";
    copyBtn.style.display = "none";

    /* Clear text area */

    inputTextarea.addEventListener("focus", ()=>{
        inputTextarea.value = "";
        validate()     
    },{once: true})

    /* Set input text */
    inputTextarea.addEventListener("input", ()=>{
        inputText = inputTextarea.value;
        validate();
    })

    /* Encrypt  */

    encryptBtn.addEventListener("click", ()=>{
        showOutput();
        outputTextarea.value = encrypt(inputText);
    })

    /* Copy to clipboard */

    copyBtn.addEventListener("click", ()=>{
        copyToClipboard(outputTextarea.value);
    })

    /* Decrypt */

    decryptBtn.addEventListener("click", ()=>{
        showOutput();
        outputTextarea.value = decrypt(inputText);
    })

    /* Show output function */

    const showOutput = function(){
        outputTextarea.style.display = "block";
        outputContainer.style.justifyContent = "space-between";
        copyBtn.style.display = "block";

        h3.style.display = "none";
        p.style.display = "none";
        searchImg.style.display = "none";

        outputTextarea.value = "";
    }

    /* Copy to clipboard function */

    const copyToClipboard = function(text) {
        navigator.clipboard.writeText(text);     
    }

    /* Validate function */

    const validate = function(){
        if ( regEx.test(inputTextarea.value)) {
            small.style.color = "red";
            encryptBtn.disabled = true;
            decryptBtn.disabled = true;
            small.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Solo letras minúsculas y sin acentos`
        } else if(inputTextarea.value === ""){
            small.style.color = "red";
            encryptBtn.disabled = true;
            decryptBtn.disabled = true;
            small.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> El campo está vacío`
        }
         else{
            small.style.color = "#495057";
            encryptBtn.disabled = false;
            decryptBtn.disabled = false;
            small.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Solo letras minúsculas y sin acentos`
        }
    }

})