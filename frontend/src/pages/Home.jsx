import React from 'react';
import Hero from '../Components/sections/Hero';
import WhatWeBuild from '../Components/sections/WhatWeBuild';
import WhatMakesUsDifferent from '../Components/sections/WhatMakesUsDifferent';
import Services from '../Components/sections/Services';
import Portfolio from '../Components/sections/Portfolio';
import Pricing from '../Components/sections/Pricing';
import Enquiry from '../Components/sections/Enquiry';

const Home = () => {
    return (
        <main>
            <Hero />
            <WhatWeBuild />
            <WhatMakesUsDifferent />
            <Services />
            <Portfolio />
            <Pricing />
            <Enquiry />
        </main>
    );
};

export default Home;
