import Meta from '../../src/client/components/layout/meta';
import Header from '../../src/client/components/layout/header';
import ResumeForm from '../../src/client/components/resumeForm';

export default function Update() {
  return (
    <>
      <div className='rb-container'>
        <Meta />
        <Header />
        <div className='rb-content-container'>
          <ResumeForm mode='update' />
        </div>
      </div>
    </>
  )
}
