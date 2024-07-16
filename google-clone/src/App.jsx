import { Route, Routes } from 'react-router-dom';
import Home from './componets/Home/Home.jsx';
import EditContact from './componets/Edit/EditContact.jsx';
import Header from './componets/Header/Header.jsx';
import CreateContact from './componets/CreateContact/CreateContact.jsx';



function App() {

  return (
    <>

    <Header/>

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateContact />} />
        <Route path='/edit/:id' element={<EditContact />} />

      </Routes>
    </>
  )
}

export default App;
