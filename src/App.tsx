import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Plan from './pages/Plan';
import Expenses from './pages/Expenses';
import SmartFeatures from './pages/SmartFeatures';
import Support from './pages/Support';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddExpense from './pages/AddExpense';
import { TripProvider } from './context/TripContext';

export default function App() {
  return (
    <TripProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/smart-features" element={<SmartFeatures />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add-expense" element={<AddExpense />} />
          </Routes>
        </Layout>
      </Router>
    </TripProvider>
  );
}
