import React, { Suspense } from 'react';
import dynamic from "next/dynamic";
import Loader from './../spinner';

export const Editor = React.memo(({ onChange, data, index }) => {
    const CKEditor = dynamic(() => import("./editor"), { ssr: false, suspense: false });
    return (
        <div style={{ minHeight: '80px' }}>
            <Suspense fallback={'...Loading'} >
                <CKEditor
                    onChange={onChange} data={data} index={index}
                />
            </Suspense>
        </div>
    )
});