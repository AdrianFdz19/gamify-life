import React, { useEffect } from 'react'

export default function Home() {

    useEffect(() => {
        const apiTest = async() => {
            try {
                const response = await fetch(`http://localhost:3000/test`);
                const data = await response.json();
                console.log(data.message);
            } catch(err) {
                console.error(err);
                alert('Hubo un error al intentar conectarse al servidor.');
            }
        };
        apiTest();
    }, []);

  return (
    <div className="home">
        <h1>Home</h1>
    </div>
  )
}
