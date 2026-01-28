import { Layout } from './components/Layout'
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { DashboardPage } from './pages/Dashboard';
import { useAuthStore } from './stores/auth';
import { ProfilePage } from './pages/Profile';
import { CategoryPage } from './pages/Category';
import { TransactionPage } from './pages/Transaction';

function ProtectedRoute({ children } : { children: React.ReactNode }){    
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace/>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
} 

function App() {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <Layout>
      <Routes>
        <Route path='/' element={
          isAuthenticated ?
            <DashboardPage/>
          :
            <Login/>
          }/>
        <Route path='/signup' element={
          <PublicRoute>
            <Signup/>
          </PublicRoute>
          }/>
        <Route path='/categories' element={
          <ProtectedRoute>
            <CategoryPage/>
          </ProtectedRoute>
          }/>
        <Route path='/transactions' element={
          <ProtectedRoute>
            <TransactionPage/>
          </ProtectedRoute>
          }/>
        <Route path='/profile' element={
          <ProtectedRoute>
            <ProfilePage/>  
          </ProtectedRoute>
          }/>
      </Routes>
    </Layout>
  )
}

export default App
