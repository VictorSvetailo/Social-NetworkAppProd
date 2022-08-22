import React from 'react';
import './index.css';
import {subscribe} from './component/redux/state';
import {renderTree} from './render';


subscribe(renderTree);
