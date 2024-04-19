import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SplashScreen } from './components/loading-screen';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Suspense fallback={<SplashScreen />}>
      <App />
    </Suspense>
  </BrowserRouter>
);
