import { useEffect } from 'react';
import { useAppContext } from '../context/AppProvider';
import './Home.scss';

export default function Home() {
    const { user, isLoading, logout } = useAppContext();

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
                <h1>GamifyLife</h1>
                <button onClick={() => logout()}  >Logout</button>
                <h2>{user?.name}</h2>
                    <div className="home__profile">
                        {user?.picture ? (
                            <img src={user?.picture} alt="profile-pic" />
                        ) : (
                            <p>No profile pic</p>
                        )}
                    </div>
            </div>
        </div>
    );
}

