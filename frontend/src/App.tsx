import { Layout } from './components/Layout'
import { Route, Routes } from "react-router-dom";
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { TransactionPage } from './pages/Transaction';
import { DashboardPage } from './pages/Dashboard';
import { useAuthStore } from './stores/auth';
import { ProfilePage } from './pages/Profile';
import { CategoryPage } from './pages/Category';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Layout>
      <Routes>
        <Route path='/' element={isAuthenticated ? <DashboardPage/> : <Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/categories' element={<CategoryPage/>}/>
        <Route path='/transactions' element={<TransactionPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </Layout>
  )
}

export default App
