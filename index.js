document.addEventListener("DOMContentLoaded", async() => {
    try {
        let data = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        let deckId = data.data.deck_id
        let cardsArr = []
        let oppCardsArr = []
        let playDiv = document.createElement("div")
        playDiv.id = "playAgain"
        
        let audio = document.createElement("audio")
        audio.src = "http://23.237.126.42/ost/skullgirls-encore-expanded-soundtrack/pumjgmjs/35%20In%20a%20Moment%27s%20Time.mp3"
        document.body.appendChild(audio)
        

        const play = () => {
            let audio = document.querySelector("audio")
            audio.play()
        }


        let audioButton = document.createElement("button")
        audioButton.id = "music"
        audioButton.innerText = "Smooth Jazz here.. click me."
        audioButton.addEventListener("click", () => {
            play()
        })
        document.body.appendChild(audioButton)

        let playerCardValue = 0
        let computerCardValue = 0


        const stayGameOver = () => {
            if (playerCardValue > computerCardValue && playerCardValue <= 21) {
                let h1 = document.createElement("h1")
                let div = document.querySelector("#winnerInfo")
                div.innerHTML = ""
                h1.innerHTML = "YOU WIN"
               
                div.appendChild(h1)   
            } else if (computerCardValue > playerCardValue && computerCardValue <=21) {
                let h1 = document.createElement("h1")
                let div = document.querySelector("#winnerInfo")
                div.innerHTML = ""
                h1.innerHTML = "YOU LOSE"
                div.appendChild(h1)            
            } 
        }

        const gameOver = () => {
            if (playerCardValue > 21 || computerCardValue === 21) {
               let h1 = document.createElement("h1")
               let div = document.querySelector("#winnerInfo")
               div.innerHTML = ""
               h1.innerText = "YOU LOSE"
               div.appendChild(h1)
           }  else if (computerCardValue > 21 || playerCardValue === 21) {
               let h1 = document.createElement("h1")
               let div = document.querySelector("#winnerInfo")
               div.innerHTML = ""
               h1.innerText = "YOU WIN"
               div.appendChild(h1) 
           } else if (playerCardValue === 21) {
            let h1 = document.createElement("h1")
            let div = document.querySelector("#winnerInfo")
            div.innerHTML = ""
            h1.innerText = "YOU WIN"   
           } else if (computerCardValue === 21) {
            let h1 = document.createElement("h1")
            let div = document.querySelector("#winnerInfo")
            div.innerHTML = ""
            h1.innerText = "YOU LOSE"
           }        
        }


        let hit = document.querySelector("#hit")
        hit.addEventListener("click", async() => {
            let div = document.querySelector("#playerHand")
            div.innerHTML = ""
            playerCardValue = 0
            drawCard()
        })

        const drawCard = async () => {
             let data = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
             let card = data.data.cards
             cardsArr.push(...card)
             cardsArr.forEach((card) => {
                //   debugger
                 if (card.value === "KING" || card.value === "JACK" || card.value === "QUEEN") {
                     card.value = 10
                    } else if (card.value === "ACE") {
                        let mess = window.prompt("You got an ACE! Choose a value: 1 or 11?", 11)
                        card.value = mess
                    }
                 let div = document.querySelector("#playerHand")
                 let img = document.createElement("img")
                 img.src = card.image
                 div.appendChild(img)
                 playerCardValue += Number(card.value)
                 gameOver()
 
                })

                let h2 = document.createElement("h2")
                h2.innerText = `Current Card Value: ${playerCardValue}`
                let div2 = document.querySelector("#playerHand")
                div2.appendChild(h2)
        }


        let stay = document.querySelector("#stay")
        stay.addEventListener("click", () => {
            let div = document.querySelector("#computerHand")
            div.innerHTML = ""
            computerCardValue = 0
            stayCard()
            stayGameOver()
        })

        const stayCard = async () => {
            let data = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`)
             let card = data.data.cards
             oppCardsArr.push(...card)
             oppCardsArr.forEach((card) => {
                if (card.value === "KING" || card.value === "JACK" || card.value === "QUEEN") {
                    card.value = 10
                   } else if (card.value === "ACE") {
                       card.value = 11
                   }
                 let div = document.querySelector("#computerHand")
                 let img = document.createElement("img")
                 img.src = card.image
                 div.appendChild(img)
                 computerCardValue += Number(card.value)
                 gameOver()
             })

             let h2 = document.createElement("h2")
                h2.innerText = `Current Computer Card Value: ${computerCardValue}`
                let div2 = document.querySelector("#computerHand")
                div2.appendChild(h2)
        }

        let startGame = document.querySelector("#startGame")
        startGame.addEventListener("click", async() => {
            let data = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
            // debugger
            let cards = data.data.cards
            cardsArr.push(...cards)
            cardsArr.forEach((card) => {
                if (card.value === "KING" || card.value === "JACK" || card.value === "QUEEN") {
                    card.value = 10
                } else if (card.value === "ACE") {
                    card.value = 11
                }           
                let img = document.createElement("img")
                img.src = card.image
                let div = document.querySelector("#playerHand")
                
                div.appendChild(img)
                playerCardValue += Number(card.value)
                gameOver()

            })
            let h2 = document.createElement("h2")
            h2.innerText = `Current Card Value: ${playerCardValue}`
            let div1 = document.querySelector("#playerHand")
            div1.appendChild(h2)   
        })
        
        const drawCards = async () => {
            let data = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
            let card = data.data.cards
            cardsArr.push(...card)
            cardsArr.forEach((card) => {
               //   debugger
                if (card.value === "KING" || card.value === "JACK" || card.value === "QUEEN") {
                    card.value = 10
                   } else if (card.value === "ACE") {
                    let mess = window.prompt("You got an ACE! Choose a value: 1 or 11?", 11)
                    card.value = mess
                   }
                let div = document.querySelector("#playerHand")
                let img = document.createElement("img")
                img.src = card.image
                div.appendChild(img)
                playerCardValue += Number(card.value)
                gameOver()
               })
            let h2 = document.createElement("h2")
            h2.innerText = `Current Card Value: ${playerCardValue}`
            let div1 = document.querySelector("#playerHand")
            div1.appendChild(h2)
            }
            

        let playAgain = document.createElement("button")
        playAgain.innerText = "One more round?"
        playAgain.id = "playTwice"
        playAgain.addEventListener("click", () => {
            let div1 = document.querySelector("#playerHand")
            let div2 = document.querySelector("#computerHand")
            let div3 = document.querySelector("#winnerInfo")
            div1.innerHTML = ""
            div2.innerHTML = ""
            div3.innerHTML = ""
            cardsArr = []
            oppCardsArr = []
            playerCardValue = 0
            computerCardValue = 0
            drawCards()
        })
        playDiv.appendChild(playAgain)
        document.body.appendChild(playDiv)


    } catch (error) {
        debugger        
    }
})
