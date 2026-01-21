import React from "react";
import { Tabs  } from "antd";
import {panel} from '../../../types/index.tsx'

export const Dashboard: React.FC = () => {
 
 

  return (
    <>
      <Tabs centered items={panel} />
    </>
  );
};