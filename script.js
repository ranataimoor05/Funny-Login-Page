document.addEventListener('DOMContentLoaded', () => {
  const pupils = document.querySelectorAll('.pupil');
  const passwordInput = document.getElementById('password');
  const characters = document.querySelectorAll('.character');
  const togglePassword = document.getElementById('togglePassword');

  window.addEventListener('mousemove', (e) => {
    if (document.activeElement === passwordInput) return;

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

  passwordInput.addEventListener('focus', () => {
    characters.forEach((char) => {
      char.classList.add('peeking');
    });

    pupils.forEach((pupil) => {
      pupil.style.transform = 'translate(0px, -4px)';
    });
  });

  passwordInput.addEventListener('blur', () => {
    characters.forEach((char) => {
      char.classList.remove('peeking');
    });

    pupils.forEach((pupil) => {
      pupil.style.transform = 'translate(0px, 0px)';
    });
  });

  togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
  });
});