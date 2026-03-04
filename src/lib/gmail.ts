/**
 * Smart Gmail link handler:
 * - Mobile → opens native email client via mailto:
 * - Desktop → opens Gmail compose in a new tab
 */
export const handleGmailClick = (e: React.MouseEvent | MouseEvent) => {
  e.preventDefault();
  const mailtoLink = 'mailto:hananhereat@gmail.com';
  const gmailWebLink =
    'https://mail.google.com/mail/?view=cm&to=hananhereat@gmail.com&su=Let%27s%20Work%20Together&body=Hi%20Hanan%2C%0A%0AI%20found%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20project.';

  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = mailtoLink;
  } else {
    window.open(gmailWebLink, '_blank');
  }
};
