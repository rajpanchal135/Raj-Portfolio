export default function WhatsAppFab() {
  const handleClick = () => {
    // Number is base64 encoded to prevent scraping/inspecting
    const decodedNumber = atob('OTE5MzI4NjIwMzk1')
    window.open(`https://wa.me/${decodedNumber}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-6 md:bottom-28 md:right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition z-[90] flex items-center justify-center cursor-pointer border-none outline-none"
      aria-label="Contact on WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9L21 3z"></path>
      </svg>
    </button>
  )
}
