import './App.css';
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <ToastContainer autoClose={1000} position="bottom-right" />
    </div>
  );
}

export default App;
