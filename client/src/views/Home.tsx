import React, { useEffect } from 'react'
import './Home.scss';

export default function Home() {

    let userInfo = false;

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
        <div className="home__content">
            <h1>GamifyLife</h1>

            <div className="home__profile">
                {userInfo ? (
                    <img src={userInfo.photo} alt="profile-pic" />
                ) : (
                    <p>No profile pic</p>
                )}
            </div>
        </div>
    </div>
  )
}
