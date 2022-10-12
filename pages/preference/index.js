import Meta from './../../src/client/components/layout/meta';
import Header from './../../src/client/components/layout/header';
import Preference from './../../src/client/components/preference';

export default function Index() {
    return (
        <>
            <div className='rb-container'>
                <Meta />
                <Header />
                <div className='rb-content-container'>
                    <Preference />
                </div>
            </div>
        </>
    )
}
