import { useLocation } from 'react-router-dom';
import NavBar from '../home/NavBar';
import Footer from '../home/Footer';
import Form from '../home/Form';
import SearchPopUp from './SearchPopUp';

const Search = () => {
  const location = useLocation();
  return (
    <div>
      <NavBar />
      <SearchPopUp search={location.state} />
      <Form />
      <Footer />
    </div>
  );
};

export default Search;
