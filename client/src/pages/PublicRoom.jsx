import { useParams } from 'react-router-dom';
import { Loader } from '../components';
import { useEffect, useState } from 'react';


function PublicRoom() {
    let { id } = useParams();
    const [loading, setLoading] = useState(true); // Set the initial loading state to true

    useEffect(() => {
        const loaderTimer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(loaderTimer);
    }, []);

    return (
        <div>
            {loading ? <Loader /> :
                (
                    <div>
                        <div className='flex flex-col'>
                            Fetching User with lobbyID, {id}
                        </div>
                    </div>
                )}
        </div>
    );
}

export default PublicRoom