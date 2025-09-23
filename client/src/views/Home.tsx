import { useEffect } from 'react';
import { useAppContext } from '../context/AppProvider';
import './Home.scss';

export default function Home() {
    const { user, isLoading, logout } = useAppContext();
    /* https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250 */

    useEffect(() => {
        if (user?.name) {
            console.log(user.picture);

        }
    }, [user]);

    if (isLoading) {
        return <p>Cargando usuario…</p>;
    }

    return (
        <div className="home">
            <div className="home__content">

                {/* <button onClick={() => logout()}  >Logout</button> */}
                <div className="home__profile">
                    {user?.picture ? (
                        <>
                        {/* <img src={user?.picture} alt="profile-pic" /> */}
                        <img src={`https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250`} alt="profile-pic" />
                        </>
                    ) : (
                        <p>No profile pic</p>
                    )}
                    <h2>{user?.name}</h2>
                </div>

                <div className="home__progress">
                    <h1>progress</h1>
                </div>

            </div>
        </div>
    );
}

