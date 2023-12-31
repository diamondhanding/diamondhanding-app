import * as React from 'react';

import { motion } from 'framer-motion';

export const TetherLogo = () => (
  <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={false}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="-100 100 2600 2500"
      className="glow-logo-5"
    >
      <path d="M0 0h2500v2500H0z" fill="none" />
      <path
        d="M540.6 213.7h1444.7c36.2 0 67.3 20.7 82.8 46.6l419.4 730.1c20.7 36.2 15.5 88-15.5 119.1L1317.3 2259.1c-36.2 36.2-98.4 36.2-134.6 0L28 1114.7c-31.1-31.1-36.2-82.8-15.5-119.1L463 260.3c15.5-31 46.5-46.6 77.6-46.6zM1798.9 540v207.1h-409.1v139.8c290 15.5 507.4 77.7 507.4 150.2v155.3c0 72.5-217.5 139.8-507.4 150.2v352.1h-274.4v-341.8c-290-15.5-507.5-77.7-507.5-150.2v-155.3c0-72.5 217.5-139.8 507.5-150.2v-145H706.3V545.1h1092.6V540zm-543.7 704.2c310.7 0 564.4-51.8 631.7-124.3-51.8-62.1-248.6-108.7-491.9-119.1V1151c-46.6 0-88 5.2-134.6 5.2s-93.2 0-134.6-5.2v-150.2c-243.4 10.4-440.1 62.1-491.9 119.1 51.7 72.5 310.6 124.3 621.3 124.3z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  </motion.div>
);
