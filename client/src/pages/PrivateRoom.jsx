import { useParams } from 'react-router-dom';
import { Loader } from '../components';
import { useEffect, useState } from 'react';
import PlayGround from './PlayGround';

function PrivateRoom() {
    let { id } = useParams();
    const [loading, setLoading] = useState(true); // Set the initial loading state to true

    useEffect(() => {
        const loaderTimer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(loaderTimer);
    }, []);

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            {loading ? (
                <div className="relative z-50 mt-96">
                    Fetching Users with lobbyID, {id}
                    <Loader />
                </div>
            ) : (
                <div>
                    <PlayGround/>
                </div>
            )}
        </div>
    );
}

export default PrivateRoom;
