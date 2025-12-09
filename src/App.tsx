import '@contentstack/live-preview-utils/dist/main.css';
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { Route, Routes } from 'react-router-dom';
import ConferencePage from './pages/conference';
import Error from './pages/error';
import ProgramPage from './pages/program';
import SessionDetailPage from './pages/session-detail';
import SpeakerDetailPage from './pages/speaker-detail';
import SpeakersPage from './pages/speakers';
import './styles/modal.css';
import './styles/style.css';
import './styles/third-party.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        {/* Conference - Landing page */}
        <Route path="/" element={<ConferencePage />} />
        <Route path="/program" element={<ProgramPage />} />
        <Route path="/session/:sessionId" element={<SessionDetailPage />} />
        <Route path="/speakers" element={<SpeakersPage />} />
        <Route path="/speakers/:url" element={<SpeakerDetailPage />} />
        <Route path="/404" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
