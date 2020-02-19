export const valleMixinButton = (superClass) => class extends superClass {
  
  connectedCallback() {

    if (super.connectedCallback) {
      super.connectedCallback();
    }

    // Basic Role
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }

    // Toggle powers
    if (this.toggle) {
      this.setAttribute('aria-pressed', 'false');
      this.addEventListener('click', this._handleToggle);
    }

    // Keyboard controls
    this.addEventListener('keydown', this._handleKeyDown);

  };

  // Keydown handler
  _handleKeyDown(e) {
    const pressSpace = e.which === 32 || e.keyCode === 32;
    const pressEnter = e.which === 13 || e.keyCode === 13;

    if (pressSpace || pressEnter) {
      e.preventDefault();
      this.click();
    }
  };

  // Disabled observer
  _toggleDisable(newBooleanValue) {
    if (newBooleanValue) {

      // Disabled button
      this.removeAttribute('tabindex');
      this.setAttribute('aria-disabled', true);
      this.style.pointerEvents = 'none';

    } else {

      // Default button
      this.setAttribute('tabindex', '0');
      this.removeAttribute('aria-disabled');
      this.style.pointerEvents = 'auto';

    }
  };

  // Toggle handler
  _handleToggle() {
    this.hasAttribute('pressed')
      ? this.removeAttribute('pressed')
      : this.setAttribute('pressed', '');
  };

  // Pressed observer
  _togglePress(newBooleanValue) {
    if (this.toggle) {
      newBooleanValue
        ? this.setAttribute('aria-pressed', 'true')
        : this.setAttribute('aria-pressed', 'false');
    }
  };

  static get properties() {
    return {
      disabled: {
        type: Boolean,
        value: false,
        observer: '_toggleDisable',
        reflectToAttribute: true
      },
      toggle: {
        type: Boolean,
        value: false
      },
      pressed: {
        type: Boolean,
        value: false,
        observer: '_togglePress',
        reflectToAttribute: true
      }
    };
  }
};
