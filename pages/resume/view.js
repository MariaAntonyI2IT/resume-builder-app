import Meta from './../../src/client/components/layout/meta';
import Header from './../../src/client/components/layout/header';
import ResumeViewer from './../../src/client/components/resumeViewer';

export default function View() {
  return (
    <>
      <div className='rb-container'>
          <Meta />
          <Header />
          <div className='rb-content-container'>
            <ResumeViewer></ResumeViewer>
          </div>
      </div>
    </>
  )
}
