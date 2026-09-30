document.addEventListener('DOMContentLoaded', () => {
  const pupils = document.querySelectorAll('.pupil');
  const characters = document.querySelectorAll('.character');
  const pwdInputs = document.querySelectorAll('.pwd-input');
  const toggleIcons = document.querySelectorAll('.toggle-pwd');

  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  // Mouse tracking for character pupils
  window.addEventListener('mousemove', (e) => {
    // Check if user is focused on a password field
    const activeEl = document.activeElement;
    if (activeEl && activeEl.classList.contains('pwd-input')) return;

    pupils.forEach((pupil) => {
      const eye = pupil.parentElement;
      const eyeRect = eye.getBoundingClientRect();
      const eyeX = eyeRect.left + eyeRect.width / 2;
      const eyeY = eyeRect.top + eyeRect.height / 2;
      const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
      const maxDistance = 4;

      const distance = Math.min(
        maxDistance,
        Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 20
      );

      const pupilX = Math.cos(angle) * distance;
      const pupilY = Math.sin(angle) * distance;

      pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    });
  });

  // Handle Focus & Blur on Password Inputs
  pwdInputs.forEach((pwdInput) => {
    pwdInput.addEventListener('focus', () => {
      // Check current visibility type of this password input
      if (pwdInput.type === 'password') {
        // Password hidden -> Characters close eyes
        characters.forEach((char) => char.classList.add('eyes-closed'));
      } else {
        // Password visible -> Characters open eyes and look up
        characters.forEach((char) => char.classList.remove('eyes-closed'));
        pupils.forEach((p) => p.style.transform = 'translate(0px, -4px)');
      }
    });

    pwdInput.addEventListener('blur', () => {
      characters.forEach((char) => char.classList.remove('eyes-closed'));
      pupils.forEach((p) => p.style.transform = 'translate(0px, 0px)');
    });
  });

  // Password Toggle Eye Icon Click Handler
  toggleIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      const targetId = icon.getAttribute('data-target');
      const pwdInput = document.getElementById(targetId);

      if (pwdInput.type === 'password') {
        // Show Password
        pwdInput.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');

        // Open eyes when password becomes visible
        characters.forEach((char) => char.classList.remove('eyes-closed'));
        pupils.forEach((p) => p.style.transform = 'translate(0px, -4px)');
      } else {
        // Hide Password
        pwdInput.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');

        // Close eyes when password becomes hidden
        characters.forEach((char) => char.classList.add('eyes-closed'));
      }
    });
  });

  // Tab Switch Handler (Login / Sign Up)
  loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
  });

  signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
  });
});