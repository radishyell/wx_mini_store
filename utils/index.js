import store from './store';

import god from './tools/god';
import request from './tools/request';
import share from './tools/share';
import toast from './tools/toast';
import updateManager from './tools/updateManager';
import watch from './tools/watch';
import addFun from './tools/addFun';

import defaultConfig from './config/default';
import developConfig from './config/develop';
import trialConfig from './config/trial';
import prodConfig from './config/prod';

export default { 
  addFun,
  store,
  god, 
  request, 
  share, 
  toast, 
  updateManager, 
  watch,
  config: {
    defaultConfig,
    developConfig,
    trialConfig,
    prodConfig
  }
};