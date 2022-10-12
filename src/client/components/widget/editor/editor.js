import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { memo, useState } from "react";
import Loader from './../spinner';

const Editor = memo(({
    onChange,
    index = -1,
    data
}) => {
    const [loading, setLoading] = useState(true);
    return (
        <div style={{position: 'relative'}}>
            <Loader loading={loading} position={'absolute'} />
            <CKEditor
                editor={ClassicEditor}
                data={data}
                config={{
                    toolbar: ['bold', 'italic']
                }}
                onReady={() => {
                    setTimeout(()=>{
                        setLoading(false);
                    }, 150);
                    console.log('Editor is ready to use!');
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data, index);
                }}
            />
        </div>
    );
});

export default Editor;