
import { uiModules } from 'ui/modules';
import _ from 'lodash';

uiModules.get('kibana')
.service('globalNavState', (localStorage, $rootScope, $location) => {
  return {
    isOpen: () => {
      const isOpen = localStorage.get('kibana.isGlobalNavOpen');
      if (isOpen === null) {
        // The global nav should default to being open for the initial experience.
        return true;
      }
      return isOpen;
    },

    setOpen: isOpen => {
      localStorage.set('kibana.isGlobalNavOpen', isOpen);
      $rootScope.$broadcast('globalNavState:change');
      return isOpen;
    },
    isHidden: () => {
      const nomenu = $location.search().nomenu;
      const path = $location.path();
      let isNomenu = false;
      if (nomenu) {
        if (typeof nomenu === 'string') {
          isNomenu = nomenu.toLowerCase() === 'true';
        }
      }
      return isNomenu && _.startsWith(path, '/dashboard');
    }
  };
});
