window.userWalletAddress = null
const loginButton = document.getElementById("buttonMeta")
const userWallet = document.getElementById('userWallet')




function search()
{
    var input = document.getElementById('search_input')
    var filter = input.value.toUpperCase()
    var card = document.getElementsByClassName("card-title")
    var card_body = document.getElementsByClassName("card p-2 bg-light")
    for (i = 0; i < card.length; i++)
    {
        card_text = card[i].innerHTML.toUpperCase()
        console.log(card_body[i])
        console.log(card_text)
        console.log(filter)
        if (card_text.indexOf(filter) > -1)
        {
            card_body[i].style.display = "";
        }
        else
        {
            card_body[i].style.display = "none"
        }
    }
    
}


function toggleButton() {
    if (!window.ethereum) {
        loginButton.innerText = 'MetaMask is not installed'
        loginButton.onclick = function () {
            window.open("https://metamask.io/download/");
        }
        //loginButton.classList.remove('btn-primary')
        //loginButton.classList.add('bg-gray-500', 'text-gray-100', 'cursor-not-allowed')
        return false
    }
    loginButton.addEventListener('click', loginWithMetaMask)
}

async function loginWithMetaMask() {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    .catch((e) => {
        console.error(e.message)
        return
    })
    if(!accounts) { return }

    window.userWalletAddress = accounts[0]
    userWallet.innerText = window.userWalletAddress
    loginButton.innerText = 'Sign out of MetaMask'

    loginButton.removeEventListener('click', loginWithMetaMask)
    setTimeout(() => {
        loginButton.addEventListener('click', signOutOfMetaMask)
    }, 200)
}

function signOutOfMetaMask() {
    window.userWalletAddress = null
    userWallet.innerText = ''
    loginButton.innerText = 'Sign in with MetaMask'

    loginButton.removeEventListener('click', signOutOfMetaMask)
    setTimeout(() => {
        loginButton.addEventListener('click', loginWithMetaMask)
    }, 200)
}

window.addEventListener('DOMContentLoaded', () => {
    toggleButton()
});

// Slideshow
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demodots");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
}