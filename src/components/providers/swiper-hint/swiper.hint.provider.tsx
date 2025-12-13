import React, { useState, useEffect, useCallback } from "react";

interface IProps {
  children: React.ReactNode;
  displayTime?: number;
  delay?: number;
  showOnlyOnce?: boolean;
  mobileBreakpoint?: number;
}

export const SwipeHintProvider: React.FC<IProps> = (props) => {
  const {
    children,
    displayTime = 5000,
    delay = 1000,
    showOnlyOnce = true,
    mobileBreakpoint = 768,
  } = props;

  const [showHint, setShowHint] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobileScreen(width <= mobileBreakpoint);
      setIsChecking(false);
    };

    checkScreenSize();

    const handleResize = () => {
      checkScreenSize();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint]);

  useEffect(() => {
    if (showOnlyOnce) {
      const alreadyShown = localStorage.getItem("swipeHintShown");
      if (alreadyShown === "true") {
        setHasShown(true);
      }
    }
  }, [showOnlyOnce]);

  const handleClose = useCallback(() => {
    setShowHint(false);
    if (showOnlyOnce) {
      localStorage.setItem("swipeHintShown", "true");
      setHasShown(true);
    }
  }, [showOnlyOnce]);

  useEffect(() => {
    if (!isMobileScreen || hasShown || isChecking) return;

    const timer = setTimeout(() => {
      setShowHint(true);

      const hideTimer = setTimeout(() => {
        handleClose();
      }, displayTime);

      return () => clearTimeout(hideTimer);
    }, delay);

    return () => clearTimeout(timer);
  }, [isMobileScreen, delay, displayTime, hasShown, handleClose, isChecking]);

  if (!showHint) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {children}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="absolute inset-0 backdrop-blur-sm" />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center border border-white/30 backdrop-blur-md">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
              Можно свайпать
            </h3>
            <p className="text-white/80 text-lg drop-shadow">
              Проведите пальцем влево или вправо
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-full py-4 bg-white/20 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/40 active:scale-95 shadow-lg"
          >
            Понятно
          </button>

          <p className="text-center mt-4 text-sm text-white/60">
            Подсказка исчезнет через {displayTime / 1000} сек
          </p>
        </div>
      </div>
    </div>
  );
};
