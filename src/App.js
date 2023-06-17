import Calendar from './components/Calendar';
import CreateTaskPage from './pages/CreateTaskPage';
import TasksPage from './pages/TasksPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/app.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} /> 
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/create" element={<CreateTaskPage />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;