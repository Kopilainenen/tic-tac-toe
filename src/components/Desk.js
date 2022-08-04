import React from "react";
import Square from "./Square";
import './Desk.css'


const Desk = () => {

    const  [desk, setDesk] = React.useState(Array(9).fill(''))
    const  [turn, setTurn] = React.useState('X')
    const  [winner, setWinner] = React.useState('')

    React.useEffect(() => {
        console.log('useEffect')
        const winningPosition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
            
        let winningPositionIndex = 0
        let newWinner = ''

        while(winningPositionIndex < winningPosition.length && !newWinner) {
            
            const deskPositionToCheck = winningPosition[winningPositionIndex]
            
            const deskValuesToCheck = deskPositionToCheck.map( index => desk [index])
            
            const checkingValue = deskValuesToCheck[0]
            
            const isFinished = deskValuesToCheck.every((value) => value === checkingValue && checkingValue)
           
            newWinner = isFinished ? checkingValue : null
           
            winningPositionIndex++
        }
         if (newWinner) {
             setWinner (newWinner === 'X' ? 'Player 1' : 'Player 2')
         }




    }, [desk])

    const handleClick = (index) => {
       console.log({index})
       if(index < 0 || index > 9 || desk[index] || winner ) return
       const newDesk = [...desk]
       newDesk.splice(index, 1, turn)
       setDesk(newDesk)
       const newTurn = turn === 'X' ? '0' : 'X'
       setTurn(newTurn)
    }


   const hadleRestart = () => {
    setDesk(Array(9).fill(''))
    setWinner ('')
   }

    return (
    <div>
            <h1> Крестики Нолики</h1>
            {winner && <h1>Winner: { winner} ({ turn === 'X' ? '0' : 'X'})</h1>}
        <div className="desk">
            {desk.map((elem, index) => (
                <Square key ={index} value={elem} index={index} handleClick ={handleClick}/>
            ))}
        </div>
        <button className="go" onClick={hadleRestart}>Let's go</button>
    </div>
       
       

    )

}

export default Desk;