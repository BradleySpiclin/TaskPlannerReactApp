import Calendar from './components/Calendar';
import NavBar from './components/NavBar';
import CreateTaskPage from './pages/CreateTaskPage';
import TasksPage from './pages/TasksPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/app.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<TasksPage />} /> 
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/create" element={<CreateTaskPage />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;