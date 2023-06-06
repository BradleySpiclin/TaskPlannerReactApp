import NavBar from './components/NavBar';
import CreateTaskPage from './pages/CreateTaskPage';
import TasksPage from './pages/TasksPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/create" element={<CreateTaskPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;