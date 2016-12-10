/* global fetch */
module.exports = {
  isAuth: () => (
    fetch('/api/auth/is-authorized', { credentials: 'same-origin' })
      .then(res => res.json())
  ),
};
