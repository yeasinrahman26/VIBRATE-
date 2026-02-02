
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 p-12 relative">
      {/* Floating decorative elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-primary/20 rounded-full animate-bounce"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-secondary/20 rounded-lg rotate-45 animate-pulse"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-accent/20 rounded-full animate-ping"></div>

      <div className="max-w-md text-center">
        {/* Logo with modern frame */}
        <div className="mb-10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50"></div>
          <div className="relative bg-base-300 p-10 rounded-full shadow-xl">
            <img
              src="/VIBRATE Logo.png"
              alt="Vibrate Logo"
              className="w-42 mx-auto rounded-xl"
            />
          </div>
        </div>

        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60 text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
