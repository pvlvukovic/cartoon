import * as React from "react";

const threshold: number = 100;

const useScroll = (): boolean => {
  const [isAtBottom, setIsAtBottom] = React.useState<boolean>(false);

  const handleScroll = React.useCallback(() => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    // Set isAtBottom to true if scroll is at bottom and it's not the same as before
    setIsAtBottom((prev: boolean) => {
      return scrollHeight - scrollTop - clientHeight < threshold && !prev;
    });
  }, []);

  console.log("useScroll", isAtBottom);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return isAtBottom;
};

export default useScroll;
