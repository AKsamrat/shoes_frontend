import { useScrollReveal } from "../../hooks/useScrollReveal";

interface RevealDivProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right" | "scale";
  delay?: string;
  className?: string;
}

const RevealDiv = ({
  children,
  direction = "up",
  delay = "",
  className = "",
}: RevealDivProps) => {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`reveal-${direction} ${visible ? "is-visible" : ""} ${delay} ${className}`}
    >
      {children}
    </div>
  );
};

export default RevealDiv;
