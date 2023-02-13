import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css';
import PacketPay from '@packetpay/js'

function App () {
  const [a, setA] = useState(3)
  const [b, setB] = useState(2)
  const [sum, setSum] = useState(0)

  const handleClick = async () => {
    try {
      const result = await PacketPay(
        'http://localhost:4004/add',
        {
          method: 'post',
          body: JSON.stringify({
            a: Number(a),
            b: Number(b)
          })
        }
      )
      let parsedResult = JSON.parse(Buffer.from(
        result.body
      ).toString('utf8'))
      setSum(parsedResult.sum)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          type='number'
          value={a}
          onChange={e => setA(e.target.value)}
        />
        <input
          type='number'
          value={b}
          onChange={e => setB(e.target.value)}
        />
        <button onClick={handleClick}>Add</button>
        <p>SUM: {sum}</p>
      </header>
    </div>
  );
}

export default App;
