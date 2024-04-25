import {Tab, Tabs} from '@mui/material';
import logo from '../assets/petMatchFinderLogo.png';
import React from 'react';
import RegisterationForm from '../components/RegisterationForm';

const RegisterationPage = () => {
  const [value, setValue] = React.useState<'admin' | 'adopter' |'lister'>('adopter');

  const handleChange = (_event: React.SyntheticEvent, newValue: 'admin' | 'adopter' |'lister') => {
    setValue(newValue);
  };
  return (
    <div className="w-screen h-screen grid grid-rows-8">
      <img
        src={logo}
        className="row-start-1 row-span-2 self-center justify-self-center pt-16"
      />
      <div className={`w-3/5 h-4/5 ${value === "adopter" ? "bg-blue-800" : "bg-green-800" } border shadow-lg rounded-lg row-start-3 row-span-6 justify-self-center  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100`}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        centered
      >
        <Tab
          value="adopter"
          label="Register as adopter"
          wrapped
        />
        <Tab value="lister" label="Register as animal shelter" />
      </Tabs>
      <RegisterationForm role={value} />
      </div>
    </div>
  );
};

export default RegisterationPage;
