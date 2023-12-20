import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useParams,
} from 'react-router-dom';

import PagePrincipale from './components/pagePrincipale.component';

import './App.css';
import PageCours from './components/pageCours.component';
import PageCohortes from './components/pageCohortes.component';
import PageVulkins from './components/pageVulkins.component';
import InfoEtudiant from './components/infoEtudiant.component';
import { FormattedMessage, IntlProvider } from 'react-intl';
import Francais from './lang/fr.json';
import English from './lang/en.json';
import { useEffect, useState } from 'react';
import Login from './routes/login.route';
import { AjoutEtudiantRoute } from './routes/ajoutEtudiant.route';
import { AjoutNoteRoute } from './routes/ajoutNote.route';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface IModeleProps {
  changerLangue(): void,
  langueActive: number
}

function Modele(props: IModeleProps) {
  const langues = ["Français", "English"]
  const [user, loading] = useAuthState(auth);

  const deconnexion = () => {
    auth.signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  return (
    <>
      <div className='onglets'>
        <a className='onglet' href="/">
          <FormattedMessage id="onglet.pageprincipale" defaultMessage="Tous les etudiants"/>
        </a>
        <a className='onglet' href="/cours">
          <FormattedMessage id="onglet.cours" defaultMessage="Cours"/>
        </a>
        <a className='onglet' href="/cohortes">
          <FormattedMessage id="onglet.cohortes" defaultMessage="Cohortes"/>
        </a>
        <a className='onglet' href="/vulkins">
          <FormattedMessage id="onglet.vulkins" defaultMessage="Vulkins"/>
        </a>
        {user ? (
          <a className='onglet' href="/" onClick={deconnexion}>
            <FormattedMessage id="onglet.deconnexion" defaultMessage="Deconnexion"/>
          </a>
        ): (
          <a className='onglet' href="/authentification">
            <FormattedMessage id="onglet.authentification" defaultMessage="Authentification"/>
          </a>
        )}
        <select className='changer-langue'
        onChange={props.changerLangue}
        value={langues[props.langueActive]}>
          {langues.map(( nom, index ) => (
            <option key={index}>{nom}</option>
          ))}
        </select>
      </div>
      <br />
      <Outlet />
    </>
  );
}




function App() {
  const locale = ['fr', 'en'];
  const messages = [Francais, English];
  const [indexLangue, setIndexLangue] = useState<number>(langueInitiale())
  
  function changementLangue() {
    const nouvelIndex = (indexLangue + 1) % 2
    setIndexLangue(nouvelIndex)
    localStorage.setItem("langue", nouvelIndex.toString());
  }

  function langueInitiale() {
    const indexLangue = localStorage.getItem("langue");
    return Number(indexLangue) || 0;
  }

  return (
    <IntlProvider locale={locale[indexLangue]} messages={messages[indexLangue]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Modele changerLangue={changementLangue} langueActive={indexLangue} />}>
            <Route index element={<PagePrincipale />} />
            <Route path="cours" element={<PageCours />} />
            <Route path="cohortes" element={<PageCohortes />} />
            <Route path="vulkins" element={<PageVulkins />} />
            {/* {user ? ( */}
              <Route path="authentification" element={<Login />} />
             {/* ): (
               <Route path="deconnexion" element={<Deconnexion />} />
             )} */}
            <Route path="etudiant/:id" element={<InfoEtudiant />} />
            <Route path="ajoutEtudiant" element={<AjoutEtudiantRoute />}/>
            <Route path="ajoutNote/:cours/:id" element={<AjoutNoteRoute />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
