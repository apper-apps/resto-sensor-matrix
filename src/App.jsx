import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Dashboard from "@/components/pages/Dashboard";
import MenuManagement from "@/components/pages/MenuManagement";
import Orders from "@/components/pages/Orders";
import Tables from "@/components/pages/Tables";
import Inventory from "@/components/pages/Inventory";
import Staff from "@/components/pages/Staff";
import Analytics from "@/components/pages/Analytics";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<MenuManagement />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Layout>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="z-[9999]"
        />
      </div>
    </Router>
  );
}

export default App;