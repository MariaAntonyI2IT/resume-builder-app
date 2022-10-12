import Meta from './../../src/client/components/layout/meta';
import Header from './../../src/client/components/layout/header';
import ResumeList from './../../src/client/components/resumeList';

export default function Index() {
  return (
    <>
      <div className='rb-container'>
        <Meta />
        <Header />
        <div className='rb-content-container'>
          <ResumeList />
        </div>
      </div>
    </>
  )
}
