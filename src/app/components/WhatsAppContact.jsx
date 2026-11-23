export default function WhatsAppContact() {
  return (
    <details className="whatsapp-contact">
      <summary aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.1 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35ZM12.04 21h-.01a9 9 0 0 1-4.59-1.25l-.33-.2-3.41.89.91-3.32-.22-.34a9 9 0 1 1 7.65 4.22Zm7.66-16.67A10.78 10.78 0 0 0 12.04 1 10.99 10.99 0 0 0 2.5 17.47L1 23l5.65-1.48A10.99 10.99 0 0 0 19.7 4.33Z" />
        </svg>
      </summary>
      <div className="whatsapp-options">
        <a
          href="https://chat.whatsapp.com/KSTK5mDHxHbJhEK4lmNTaB"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the community
        </a>
        <a
          href="https://wa.me/201220073575"
          target="_blank"
          rel="noopener noreferrer"
        >
          Start a private chat
        </a>
      </div>
    </details>
  );
}
