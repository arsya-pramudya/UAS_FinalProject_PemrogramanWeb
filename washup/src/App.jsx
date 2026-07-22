import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Layanan from './components/Layanan';
import TentangKami from './components/TentangKami';
import HubungiKami from './components/HubungiKami';
<<<<<<< HEAD
import RoleSelect from './components/RoleSelect';
import Login from './components/Login';
import Register from './components/Register';
import PesanLayanan from './components/PesanLayanan';
import PesananSaya from './components/PesananSaya';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import DashboardKasir from './components/DashboardKasir';

// Cek localStorage sebelum komponen pertama kali render,
// supaya nggak ada "kedipan" ke halaman lain sebelum status login diketahui
function getInitialAuthState() {
  const savedToken = localStorage.getItem('accessToken');
  const savedUser = localStorage.getItem('userData');

  if (savedToken && savedUser) {
    const parsedUser = JSON.parse(savedUser);
    return {
      isLoggedIn: true,
      userRole: parsedUser.role,
      userData: parsedUser,
      initialTab: parsedUser.role === 'admin' ? 'admin-dashboard' : 'home',
    };
  }

  return {
    isLoggedIn: false,
    userRole: null,
    userData: null,
    initialTab: 'pilih-role', // Belum login → tampilkan halaman pilih role dulu
  };
}

function App() {
  const initialAuth = getInitialAuthState();

  const [currentTab, setCurrentTab] = useState(initialAuth.initialTab);
  const [isLoggedIn, setIsLoggedIn] = useState(initialAuth.isLoggedIn);
  const [userRole, setUserRole] = useState(initialAuth.userRole);
  const [userData, setUserData] = useState(initialAuth.userData);
  const [intendedRole, setIntendedRole] = useState(null); // role yang dipilih sebelum login
  const [presetJenisLayanan, setPresetJenisLayanan] = useState(null); // kunci jenis layanan saat order dari kartu Layanan

  // Dipanggil dari tombol "Order" di kartu Layanan: kunci jenis layanan lalu pindah ke form Pesan
  const goToPesanWithJenis = (jenis) => {
    setPresetJenisLayanan(jenis);
    setCurrentTab('pesan');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserRole(null);
    setUserData(null);
    setIntendedRole(null);
    setCurrentTab('pilih-role');
  };

  const renderMainContent = () => {
    if (currentTab.startsWith('layanan')) {
      return <Layanan jenisLayanan={currentTab} onOrderClick={goToPesanWithJenis} />;
=======
import Login from './components/Login';
import Footer from './components/Footer';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fungsi Logika Menampilkan Halaman Secara Dinamis
  const renderMainContent = () => {
    // Jika nama tab diawali kata 'layanan', arahkan ke komponen Layanan bawaan sub-nya
    if (currentTab.startsWith('layanan')) {
      return <Layanan jenisLayanan={currentTab} />;
>>>>>>> 2bfd4e106a5d987f0729993ffd0d4586c0d2bde1
    }

    switch (currentTab) {
      case 'home':
        return <Home setCurrentTab={setCurrentTab} />;
      case 'tentang':
        return <TentangKami />;
      case 'kontak':
        return <HubungiKami />;
<<<<<<< HEAD

      case 'pilih-role':
        return <RoleSelect setCurrentTab={setCurrentTab} setIntendedRole={setIntendedRole} />;

      case 'login':
        return (
          <Login
            setIsLoggedIn={setIsLoggedIn}
            setCurrentTab={setCurrentTab}
            setUserRole={setUserRole}
            setUserData={setUserData}
            intendedRole={intendedRole}
          />
        );

      case 'register':
        return (
          <Register
            setIsLoggedIn={setIsLoggedIn}
            setCurrentTab={setCurrentTab}
            setUserRole={setUserRole}
            setUserData={setUserData}
          />
        );

      case 'pesan':
        return (
          <PesanLayanan
            setCurrentTab={setCurrentTab}
            presetJenis={presetJenisLayanan}
            onClearPreset={() => setPresetJenisLayanan(null)}
          />
        );

      case 'pesanan-saya':
        return <PesananSaya setCurrentTab={setCurrentTab} />;

      case 'admin-dashboard':
        return <AdminDashboard />;

      case 'dashboard-kasir':
        return <DashboardKasir />;

=======
      case 'login':
        return <Login setIsLoggedIn={setIsLoggedIn} setCurrentTab={setCurrentTab} />;
>>>>>>> 2bfd4e106a5d987f0729993ffd0d4586c0d2bde1
      default:
        return <Home setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light text-dark">
<<<<<<< HEAD
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={handleLogout}
        userRole={userRole}
        userData={userData}
        resetJenisPreset={() => setPresetJenisLayanan(null)}
=======
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
>>>>>>> 2bfd4e106a5d987f0729993ffd0d4586c0d2bde1
      />

      <main className="flex-grow-1">
        {renderMainContent()}
      </main>

      <Footer />
    </div>
  );
}

export default App;