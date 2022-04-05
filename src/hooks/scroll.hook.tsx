import * as React from "react";

const useScroll = (): boolean => {
  const [isAtBottom, setIsAtBottom] = React.useState<boolean>(false);

  const handleScroll = React.useCallback(() => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    setIsAtBottom(scrollHeight <= scrollTop + clientHeight);
  }, []);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return isAtBottom;
};

export default useScroll;
