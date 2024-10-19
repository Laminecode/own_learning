import React, { useState } from 'react';
import Login from "./Login";
import Signup from "./Signup";

function Form({ login, signup, onclick1, onclick2, onclick3 }) {
  const [activeTab, setActiveTab] = useState(login ? 'login' : 'signup');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'login') {
      onclick1();
    } else {
      onclick3();
    }
  };

  return (
    <div className='test'>
      <div className='loginup'>
        <button
          onClick={() => handleTabClick('login')}
          className={activeTab === 'login' ? 'activee' : ''}
        >
          Log in
        </button>
        <button
          onClick={() => handleTabClick('signup')}
          className={activeTab === 'signup' ? 'activee' : ''}
        >
          Join
        </button>
      </div>
      <hr />
      <main>
        {activeTab === 'login' && <Login onclick={onclick2} />}
        {activeTab === 'signup' && <Signup onclick={onclick1} />}
      </main>
    </div>
  );
}

export default Form;
