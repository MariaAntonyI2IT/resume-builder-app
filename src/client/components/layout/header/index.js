import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { config } from './../../../utils/config';
import Loader from './../../widget/spinner';
import { updateUserID, updateUserName } from './../../../store/userProfile';
import Select from 'react-select';
import { sendPostRequest } from './../../../utils/http';
import { toast } from 'react-toastify';

export default function Header() {
    const userProfileDetails = useSelector(state => state.userProfile);
    const dispatch = useDispatch();
    const [userList, setUserList] = useState([]);
    const [user, setUser] = useState({ label: userProfileDetails.name, value: userProfileDetails.userId });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            setLoading(true);
            fetchList();
            setTimeout(() => {
                setLoading(false);
            }, 150);
        } catch (err) {
            console.log(err);
            const errorMsg = err.message ? err.message : err.toString();
            toast.error(errorMsg);
            setTimeout(() => {
                setLoading(false);
            }, 150);
            reject(err);
        }
    }, [])

    const fetchList = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const url = config.api.users.list;
                const response = await sendPostRequest(url);
                const userList = response.map((res) => { return { label: res.userName, value: res.userId } });
                setUserList(userList);
                resolve(true);
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }

    const handleDdlChange = (selectedOption) => {
        setUser(selectedOption);
        dispatch(updateUserID(selectedOption.value));
        dispatch(updateUserName(selectedOption.label));
    };

    return (
        <div id='rb-header-container' className={styles['rb-header-container']}>
            <Loader loading={loading} />
            <div className={styles['rb-header-left-wrapper']}>
                <Link href={config.path.resume.list}>
                    <div className={styles['rb-header-image']}>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAuCAMAAADUbS0KAAAAAXNSR0IB2cksfwAAAYNQTFRFAAAAACScACWcACucACScACScACScACOcACSdACqVACCfACOcACSbACScACSdACSeACedACKfACScACScACScACSbAEB/ACOcACScACScACScACOdAACqACaZACSdACScACScACScACedACKdACScACScACScACWcACKZACqqACSdACScACOdACWbAAB/ACCfACSbACScACScACWcACOcACOaACScACScACWcACSdAByqACSbACSdACScACOdAAD/ACGcACSdACScACOcACScACSbACSbACScACSbACOcABqZACScACSdACWcACSbACScACScACWbACOeACSdACWcACWcACSdACSbACScACScACacACScACScACSdACScACihACSdACWeACScACWcACWdACmZACSbACScACWaADOZACScACWcACSeACifAC6iACSbACScACOcACScACOcACScACSbACSeACebACSbACSaACObACScACOdACScACScACSbACObh9dtcQAAAIF0Uk5TAM9vEv+w9a1ODBBszeiMKg0tjurLawRQsfSqSQMUctPliCc0le7HZw8GVremRQIYeNnihCQ6m/HDYwlcvaJBAR9/3t+BQKHzwF8KYp4+hePcfR1Gp7xbacmaNvBk6Z0TcDfQ0WAZpO8wBfKgFSALgK+fv5Dgjz8hHEeXcYKl1U9zmRsV/wAAA/lJREFUeJzFl/l/2zQUwF/Mc6Ea92UK42YwrnXAxsY4OmPEXI5xjHPmMEZggSec2Eq4jz+d92Q7/bQ0TdpPiN8PtqxI+uqdUmDgXQe9CPpr19/QC3hdHLvxpptvWT34Vnrcdvsdd94legAD3B3cs3HvfcdXDya5/4EHH3r4kR7AJI8+duLxJ072AAZ48qmnN5559tTqwSSbp597/oUzPYBJzr547vxL6z2AAS68/MrGq69trR5McjF8PXrj4v8HPsCiW/LNS/H2W6sHk6y/ff7SO+/2ACY5c/m99z/4sAcwwKkrH619/MmF1YNJTn762bnPz/YAJrmaJFd6AG998eVXXy+R24JTb86wb7Jvry4T24IVYtB8SkT530HffZ8fW/bB4cAaUc8G/3D6x+LakrGdqY2B2eDDiQgXBP9EjxKR4MMch8qBywjzEd3BTFjlWLH/1QCj4XRL2L7jPZvkT5McEmxybESKgXsPBNRNTwmpe9t5YNcfHxJcEECqhMAlJkpTqwCdahA+5hBjTfrM1Fh41diArrCqtFZkn+HQm3dpnYIZ5OJbWqaQtjk95WQSIJoY8/FkZ6k9YGGVDjItJErJg+pC69LAwTIFNxnFwYWdgI5a68uEX+MZ4DrlmfG0f68H5oFLapF6BLGxE7aCNinHm1C+RVT7g+NRSILT/sCOvHkK74DJlRoMxZX0MaJpghZ1VuC9CF4nc1vbD5xKlp1+kKkNFgVPLSwN2bWiPApI4ygcU7TLAitudIvtAacjegjybptJ7OegXhQMHNFJwXbVMW+gFqAtJxN1Ket6ppM6sLOxhKIKw4h2VQzDoO2O5vnZgU2TKZp82cSlaV7cJcC1qWfHbR1YlSw0V6fK/Rqkbpos1WI+Pqzg/CHz12gukVQCOOdNGJoybGUV4KZeRmJ3Gq8ATNFUU2H2GUxes2jpOR9cq9ljFgKbDFOKSczbUzHGgyv9NKoP2Nw+squidT4WXJ3xCGBljLfNMWyU2A6b+4TxPGoo96EDMNvhBPiwHVHqQTsKp/9QdI7FEcBxkZVlQukrs6wuY64lihxFDcWnDhSBpE+/IrAtKPW0bUYh3dN/lr84bmKOAuahMuPzhRWxmpbmZI4VJGQIY10hg0y2pk54lP8raXzttxO/HweVI805Cjhte6SbUyhowjLwXcPFn55Mhi1YDiYk3h+Al9f+3AS+YmQCjgSWu8AEa8D0KRIhSHtNLijjDmxdtSON/+L/glSiB3/TTpYCbnxbFqy+ohE+1++6BZvu/vSP211bMuxSwCLzWDPnYD5gi5SMbWmYz2Yv6BYpxpvNAh04XhDc/bo/GAQZ0He5FLPyosjigjXWNio4uKk8wb/JAg5+1E6ADQAAAABJRU5ErkJggg=="></img>
                    </div>
                </Link>
                <div className={styles['rb-header-seperator']}></div>
                <div className={styles['rb-header-name']}>Resume Builder</div>
            </div>
            <div className={styles['rb-header-right-wrapper']}>
                <Select
                    instanceId={'rb-header-dd'}
                    className={styles['rb-header-dd-name']}
                    value={user}
                    onChange={(selectedOption) => handleDdlChange(selectedOption)}
                    options={userList}
                />
                <div className={styles['rb-header-welcome']}>Howdy {userProfileDetails.name} !</div>
            </div>
        </div >
    )
}