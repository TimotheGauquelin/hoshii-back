import "./commands";

import { mount } from "cypress/vue";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      login(): Chainable<HTMLElement>;
    }
  }
}

Cypress.Commands.add("mount", mount);
